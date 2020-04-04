var rp = require('request-promise');
const jsonfile = require('jsonfile');

// https://www.npmjs.com/package/@slack/webhook
const { IncomingWebhook } = require('@slack/webhook');
// https://api.slack.com/apps/A0116PWB3MW/incoming-webhooks?success=1

// we-can-projects webhook...
const slack_url = 'https://hooks.slack.com/services/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'
const calendar_url = 'http://www.webcal.fi/cal.php?id=50&format=json&start_year=current_year&end_year=current_year&tz=UTC'
const webhook = new IncomingWebhook(slack_url);

// const file = 'dummy_data.json';

let dateName, dateUrl;
let calendarData = {
  name: dateName,
  url: dateUrl
};


// https://usefulangle.com/post/187/nodejs-get-date-time
// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
const date = new Date();

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

let f_date = formatDate(date);
// console.log("date: " + f_date);


//--------------GET DATA FROM WEBCAL.FI
// http://www.webcal.fi/en/calendars.php
var options = {
    uri: calendar_url,
    json: true // Automatically parses the JSON string in the response
};

rp(options)
    .then(function (repos) {
        console.log("success in parsing...");

        for(var attributename in repos){
          if (repos[attributename].date == f_date){
            // console.log("Happy " + obj[attributename].name + "!");
            calendarData.name = repos[attributename].name;
            calendarData.url = repos[attributename].url;
          }

      }
      console.log(calendarData);
      //HACKED IN TO PARSE LOOP...
      webhook.send({
          // text: '*' + String(calendarData.name) + '*\n' //'I\'ve got news for you...',
      	   "blocks": [{
      			"type": "divider"
      		},

          {
      			"type": "section",
      			"text": {
      				"type": "mrkdwn",
      				"text": "Happy... *" + String(calendarData.name) + "* \n" + String(calendarData.url)
      			}
      		}
      	]


        });

    })
    .catch(function (err) {
        // API call failed...
        console.log(err);
    });

//--------------GET DATA FROM WEBCAL.FI



//--------------PROCESS DATA: CHECK WEBCAL DATA AGAINST TODAY'S DATE... PICK THE DAY... FORM JSON MESSAGE...
//... For debugging... > dummy
//https://www.npmjs.com/package/jsonfile

// jsonfile.readFile(file, function (err, obj) {
//   if (err) console.error(err)
//   // console.dir(obj)
//
//   for(var attributename in obj){
//
//     if (obj[attributename].date == f_date){
//       // console.log("Happy " + obj[attributename].name + "!");
//       calendarData.name = obj[attributename].name;
//       calendarData.url = obj[attributename].url;
//     }
//
// }
// console.log(calendarData);
// //HACKED IN TO PARSE LOOP
// webhook.send({
//     // text: '*' + String(calendarData.name) + '*\n' //'I\'ve got news for you...',
// 	   "blocks": [{
// 			"type": "divider"
// 		},
//
//     {
// 			"type": "section",
// 			"text": {
// 				"type": "mrkdwn",
// 				"text": "Happy... *" + String(calendarData.name) + "* \n" + String(calendarData.url)
// 			}
// 		}
// 	]
//
//
//   });
//
// })

//--------------PROCESS DATA: CHECK WEBCAL DATA AGAINST TODAY'S DATE... PICK THE DAY... FORM JSON MESSAGE...



//--------------SEND MESSAGE TO SLACK

// (async () => {
//   await webhook.send({
//     text: 'I\'ve got news for you...',
//   });
// })();


//--------------SEND TO SLACK
