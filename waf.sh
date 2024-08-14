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
IP_SET_IP_ADDRESSES=("101.62.244/32")  # Replace with IP addresses you want to whitelist
REGION="us-east-1"  
ACCOUNT_ID="973620134507"  

# Function to create IP Set
create_ip_set() {
    echo "Creating IP Set: $IP_SET_NAME"
    IP_SET_ID=$(aws wafv2 create-ip-set \
        --name "$IP_SET_NAME" \
        --description "$IP_SET_DESCRIPTION" \
        --scope "$WEB_ACL_SCOPE" \
        --ip-address-version IPV4 \
        --addresses "${IP_SET_IP_ADDRESSES[@]}" \
        --query 'Summary.Id' \
        --output text)

    IP_SET_ARN="arn:aws:wafv2:$REGION:$ACCOUNT_ID:global/ipset/$IP_SET_NAME/$IP_SET_ID"
    echo "IP Set created with ARN: $IP_SET_ARN"
}

# Function to create Web ACL
create_web_acl() {
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
                        \"ARN\": \"$IP_SET_ARN\"
                    }
                },
                \"VisibilityConfig\": {
                    \"SampledRequestsEnabled\": true,
                    \"CloudWatchMetricsEnabled\": true,
                    \"MetricName\": \"$WEB_ACL_RULE_NAME\"
                }
            }
        ]" \
        --visibility-config "SampledRequestsEnabled=true,CloudWatchMetricsEnabled=true,MetricName=$WEB_ACL_NAME" \
        --description "$WEB_ACL_DESCRIPTION"
}

# Check if IP Set exists
IP_SET_ID=$(aws wafv2 list-ip-sets --scope "$WEB_ACL_SCOPE" --query "IPSets[?Name=='$IP_SET_NAME'].Id" --output text)
if [ -n "$IP_SET_ID" ]; then
    echo "IP Set already exists: $IP_SET_NAME"
    IP_SET_ARN="arn:aws:wafv2:$REGION:$ACCOUNT_ID:global/ipset/$IP_SET_NAME/$IP_SET_ID"
else
    create_ip_set
fi

# Check if Web ACL exists and matches expected rules
WEB_ACL_ID=$(aws wafv2 list-web-acls --scope "$WEB_ACL_SCOPE" --query "WebACLs[?Name=='$WEB_ACL_NAME'].Id" --output text)

if [ -n "$WEB_ACL_ID" ]; then
    echo "Web ACL already exists: $WEB_ACL_NAME"
    # Optionally, you can add logic here to check if the Web ACL rules match your desired configuration
else
    create_web_acl
fi
