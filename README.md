# Check if delivery available Aeon

```shell
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXXXXX" AEON_USER="MyId" AEON_PWD="MyPassword" node index.js
```

Add crontab every 5 minutes :
```shell
*/5 * * * *  SLACK_WEBHOOK_URL="https://hooks.slack.com/services/XXXXXX" AEON_USER="MyId" AEON_PWD="MyPassword" node /FULL_PATH/index.js
```
