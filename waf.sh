#!/bin/bash

# Variables
WEB_ACL_NAME="MyWebACL"
WEB_ACL_DESCRIPTION="Web ACL for IP whitelisting"
WEB_ACL_SCOPE="CLOUDFRONT"
WEB_ACL_RULE_NAME="IPWhitelistRule"
WEB_ACL_RULE_PRIORITY=1
WEB_ACL_RULE_ACTION="Allow"
CLOUDFRONT_DISTRIBUTION_ID="E2AZCAA0LDY8MZ"  # Replace with your CloudFront Distribution ID
IP_SET_NAME="MyIPSet"
IP_SET_DESCRIPTION="IP Set for whitelisting"
IP_ADDRESSES_FILE="ip_addresses.txt"
REGION="us-east-1"
ACCOUNT_ID="973620134507"

# Function to update IP Set
update_ip_set() {
    echo "Updating IP Set: $IP_SET_NAME"

    # Read IP addresses from the file
    IP_ADDRESSES=()
    while IFS= read -r line; do
        IP_ADDRESSES+=("$line")
    done < "$IP_ADDRESSES_FILE"

    # Create or update the IP Set
    IP_SET_ID=$(aws wafv2 list-ip-sets --scope "$WEB_ACL_SCOPE" --query "IPSets[?Name=='$IP_SET_NAME'].Id" --output text)
    
    if [ -n "$IP_SET_ID" ]; then
        echo "IP Set already exists. Updating..."
        aws wafv2 update-ip-set \
            --name "$IP_SET_NAME" \
            --scope "$WEB_ACL_SCOPE" \
            --id "$IP_SET_ID" \
            --lock-token "$(aws wafv2 get-ip-set --scope "$WEB_ACL_SCOPE" --id "$IP_SET_ID" --query 'LockToken' --output text)" \
            --addresses "${IP_ADDRESSES[@]}"
    else
        echo "IP Set does not exist. Creating..."
        IP_SET_ID=$(aws wafv2 create-ip-set \
            --name "$IP_SET_NAME" \
            --description "$IP_SET_DESCRIPTION" \
            --scope "$WEB_ACL_SCOPE" \
            --ip-address-version IPV4 \
            --addresses "${IP_ADDRESSES[@]}" \
            --query 'Summary.Id' \
            --output text)
    fi

    IP_SET_ARN="arn:aws:wafv2:$REGION:$ACCOUNT_ID:global/ipset/$IP_SET_NAME/$IP_SET_ID"
    echo "IP Set updated with ARN: $IP_SET_ARN"
}