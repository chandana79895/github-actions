#!/bin/bash

# Set the recipient email address
TO="manichandana7989@gmail.com"

# Set the subject of the email
SUBJECT="Automated Test Report"

# Set the body of the email
BODY="Please find the attached emailable report for the recent test run."

# Path to the report file
ATTACHMENT="test-output/emailable-report.html"

# Create mutt configuration file
cat <<EOT > ~/.muttrc
set from = "manichandana7989@gmail.com"
set realname = "Chandana"
set smtp_url = "smtp://manichandana7989@gmail.com@smtp.gmail.com:465/"
set smtp_pass = "Chandu@123"
set ssl_starttls = yes
set ssl_force_tls = yes
EOT

# Send the email with the attachment using mutt
echo "$BODY" | mutt -s "$SUBJECT" -a "$ATTACHMENT" -- "$TO"

echo "Email sent successfully."
