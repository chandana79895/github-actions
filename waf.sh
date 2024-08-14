#!/bin/bash

# Variables
WEB_ACL_NAME="MyWebACL"
WEB_ACL_DESCRIPTION="Web ACL for IP whitelisting"
WEB_ACL_SCOPE="CLOUDFRONT"
WEB_ACL_RULE_NAME="IPWhitelistRule"
WEB_ACL_RULE_PRIORITY=1
WEB_ACL_RULE_ACTION="Allow"
CLOUDFRONT_DISTRIBUTION_ID="$CFD_ID"  # Replace with your CloudFront Distribution ID
IP_SET_NAME="MyIPSet"
IP_SET_DESCRIPTION="IP Set for whitelisting"
IP_SET_IP_ADDRESSES=("101.0.62.244/32")  # Replace with IP addresses you want to whitelist
REGION="us-east-1"  
ACCOUNT_ID="973620134507"  

# Create IP Set
echo "Creating IP Set: $IP_SET_NAME"
IP_SET_ID=$(aws wafv2 create-ip-set \
    --name "$IP_SET_NAME" \
    --description "$IP_SET_DESCRIPTION" \
    --scope "$WEB_ACL_SCOPE" \
    --ip-address-version IPV4 \
    --addresses "${IP_SET_IP_ADDRESSES[@]}" \
    --query 'Summary.Id' \
    --output text)

echo "IP Set created with ID: $IP_SET_ID"

# Create Web ACL if it doesn't exist
if ! aws wafv2 get-web-acl --name "$WEB_ACL_NAME" --scope "$WEB_ACL_SCOPE" > /dev/null 2>&1; then
    echo "Creating Web ACL: $WEB_ACL_NAME"
    aws wafv2 create-web-acl \
        --name "$WEB_ACL_NAME" \
        --scope "$WEB_ACL_SCOPE" \
        --default-action Allow={} \
        --rules "[
            {
                \"Name\": \"$WEB_ACL_RULE_NAME\",
                \"Priority\": $WEB_ACL_RULE_PRIORITY,
                \"Action\": {\"$WEB_ACL_RULE_ACTION\": {}},
                \"Statement\": {
                    \"IPSetReferenceStatement\": {
                        \"ARN\": \"arn:aws:wafv2:$REGION:$ACCOUNT_ID:ipset/$IP_SET_ID\"
                    }
                },
                \"VisibilityConfig\": {
                    \"SampledRequestsEnabled\": true,
                    \"CloudWatchMetricsEnabled\": true,
                    \"MetricName\": \"$WEB_ACL_NAME\"
                }
            }
        ]" \
        --visibility-config "SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=$WEB_ACL_NAME" \
        --description "$WEB_ACL_DESCRIPTION"
fi

# Get Web ACL ID
WEB_ACL_ID=$(aws wafv2 list-web-acls --scope "$WEB_ACL_SCOPE" --query "WebACLs[?Name=='$WEB_ACL_NAME'].Id" --output text)

# Get the current CloudFront distribution configuration
DIST_CONFIG=$(aws cloudfront get-distribution-config --id "$CLOUDFRONT_DISTRIBUTION_ID")
ETAG=$(echo "$DIST_CONFIG" | jq -r '.ETag')
DIST_CONFIG_JSON=$(echo "$DIST_CONFIG" | jq --arg aclId "arn:aws:wafv2:$REGION:$ACCOUNT_ID:webacl/$WEB_ACL_ID" '.DistributionConfig.WebACLId = $aclId')

# Update CloudFront distribution
echo "Associating Web ACL with CloudFront Distribution: $CLOUDFRONT_DISTRIBUTION_ID"
aws cloudfront update-distribution \
    --id "$CLOUDFRONT_DISTRIBUTION_ID" \
    --distribution-config "$DIST_CONFIG_JSON" \
    --if-match "$ETAG"

echo "Web ACL has been associated with CloudFront distribution."
