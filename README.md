# upcheck
Checks an array of sites to see if they are running.
If not, it sends a lovely email out to alert the webmaster.
Use cron or task scheduler to handle schedule and interval.

# Installation
## Sendgrid
1. Run ```echo "export SENDGRID_API_KEY='YOUR_SENDGRID_SECRET_API_KEY'" > sendgrid.env```
1. Create ```source ./sendgrid.env```

## Configuration
See ```config.example.js``` to adjust configuration settings