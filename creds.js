let creds = {
    webhook: 'https://hooks.slack.com/services/xxxxxxxxxxxxxx', //Replace with your slack webhook!!!
    api: 'http://www.webcal.fi/cal.php?id=50&format=json&start_year=current_year&end_year=current_year&tz=UTC' //Calendar call, its a big one (Don't use more than once a day!!!!
}

module.exports.endPoint = creds;
