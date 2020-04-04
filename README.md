# Panacea Bot
Slack bot to help teams celebrate each day!

**Panacea Bot** app looks up for what celebration is happening in the world that day.
It then uses a dedicated webhook to ping the slack channel with a "Happy ... Day" message. Becase... 
There is something to celebrate each day!

**Usage** 
Pretty basic stuff... 
- Build using Node/npm ('npm init') 
- [Get yourself a slack webhook](https://api.slack.com/messaging/webhooks)
- Get youreslf API creds for for calendar calls (link)
- Update 'CREDS' module file with your webhook url / Calendar api creds
- Deploy to Heroku & use **Heroku Scheduler add-on** to set time for the message to go out each day!

![Image of Panacea-bot](https://github.com/valiauga/panacea-bot/blob/master/images/0-hello.png)
