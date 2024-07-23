#!/bin/bash

# Set the recipient email address
TO="manichandana7989@gmail.com"

# Set the subject of the email
SUBJECT="Automated Test Report"

# Set the body of the email
BODY="Please find the attached emailable report for the recent test run."

# Path to the report file
ATTACHMENT="test-output/emailable-report.html"

# Send the email with the attachment using mutt
echo "$BODY" | mutt -s "$SUBJECT" -a "$ATTACHMENT" -- "$TO"

echo "Email sent successfully."
