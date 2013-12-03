var Request = require("sdk/request").Request;
exports.trackInsecurePassword = trackInsecurePassword;

function trackInsecurePassword(decision)
{
    var request = Request({
            url: "http://localhost:8080/ArktikFoxWebServices/insecure_passwords",
            content: JSON.stringify(decision),
            contentType: "application/json",
            onComplete: function (response) {
                /*
                 var tweet = response.json[0];
                 console.log("User: " + tweet.user.screen_name);
                 console.log("Tweet: " + tweet.text);
                 */
            }
    });
    request.post();
    return;
}

