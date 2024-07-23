#!/bin/bash

# Define variables
EMAIL_TO="manichandana7989@gmail.com"
EMAIL_SUBJECT="Automated Report"
EMAIL_BODY="Please find the attached report."
REPORT_FILE="test-output/emailable-report.html"

# Send the email
echo "$EMAIL_BODY" | mail -s "$EMAIL_SUBJECT" -a "$REPORT_FILE" "$EMAIL_TO"
