#!/bin/bash

# Variables
SLACK_CHANNEL="test"
SLACK_TOKEN="$SLACK_TOKEN"
REPORT_URL="$REPORT_URL"

# Prepare Slack message payload
slack_message=$(jq -n \
  --arg channel "$SLACK_CHANNEL" \
  --arg text "Test Report :rocket:" \
  --arg title "Test Report for Job" \
  --arg title_link "$REPORT_URL" \
  '{
    "channel": $channel,
    "text": $text,
    "attachments": [
      {
        "title": $title,
        "title_link": $title_link,
        "text": "The test report is available for download."
      }
    ]
  }')

# Send message to Slack
response=$(curl -s -X POST -H "Authorization: Bearer $SLACK_TOKEN" \
  -H "Content-type: application/json" \
  --data "$slack_message" \
  https://slack.com/api/chat.postMessage)

# Print response for debugging
echo "Slack API Response:"
echo "$response" | jq .

# Check if the message was sent successfully
ok=$(echo "$response" | jq -r '.ok')
if [ "$ok" != "true" ]; then
  echo "Message post failed: $response"
  exit 1
fi

echo "Message posted successfully."
