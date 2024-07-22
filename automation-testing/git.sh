#!/bin/bash

# Variables
OWNER="chandana79895"
REPO="github-actions"
RUN_ID="${{ github.run_id }}"
GITHUB_TOKEN="${{ secrets.GIT_TOKEN }}"
SLACK_CHANNEL="test"
SLACK_TOKEN="${{ secrets.SLACK_TOKEN }}" 

# List artifacts
response=$(curl -s -H "Authorization: token $GITHUB_TOKEN" \
  "https://api.github.com/repos/$OWNER/$REPO/actions/runs/$RUN_ID/artifacts")

# Print response for debugging
echo "API Response:"
echo "$response" | jq .

# Extract artifact ID for the artifact named 'TestReport'
artifact_id=$(echo "$response" | jq -r '.artifacts[] | select(.name=="TestReport") | .id')

# Check if artifact_id is empty
if [ -z "$artifact_id" ]; then
  echo "Artifact 'TestReport' not found."
  exit 1
fi

# Generate download URL
download_url="https://github.com/$OWNER/$REPO/actions/runs/$RUN_ID/artifacts/$artifact_id"

# Check for errors in URL generation
if [ -z "$download_url" ]; then
  echo "Failed to generate download URL."
  exit 1
fi

echo "Download URL: $download_url"

# Prepare Slack message payload
slack_message=$(jq -n \
  --arg channel "$SLACK_CHANNEL" \
  --arg text "Test Report :rocket:" \
  --arg title "Test Report for Job" \
  --arg title_link "$download_url" \
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
