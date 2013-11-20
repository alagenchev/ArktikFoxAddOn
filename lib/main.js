var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var passwordTracker = require("InsecurePasswordTracker");
var events = require("sdk/system/events");
var { Ci } = require("chrome");

// mypanel is the same as panel from the sdk, but I've moved the source
// here so that I can modify some of the styling. Positioning didn't
// work here, so I've hard coded some in the mypanel code
var warningPanel = require("mypanel").Panel({
        width: 1000,
        height: 50,
        position: {
            bottom: 666
        },
        contentURL: data.url("warningPanel.html"),
        contentScriptFile: [data.url("warningPanelScript.js")]
});

// a user clicked on the learn more link, we want to open a tab
// and navigate to a location where they can learn more about
// the security implications associated with insecure passwords
warningPanel.port.on("clicked-learn-more-link", function() {
    warningPanel.hide();
    tabs.open("https://developer.mozilla.org/docs/Security/InsecurePasswords");
});


// if a tab became ready or active then we want to clear a previous warning
// since we are about to navigate to a new page
tabs.on('ready', function(tab) {
    warningPanel.hide();
});

tabs.on('activate', function(tab) {
    warningPanel.hide();
});


function DecisionResult(type, url)
{
    this.type = type;
    this.url = url;
}

var decision;
var shouldEmitNewWarning = false;

// redScript is a page mod script that changes the background of insecure passwords
pageMod.PageMod({
        include: "*",
        contentScriptFile: [data.url("redScript.js")],

        // we usually receive the decision from the browser before
        // the page mod script is attached, so by the time we attach
        // we should check whether we should emit a warning message
        // to the warning panel and then clear the flag to be ready
        // for the next warning
        onAttach: function(worker) {
            if(shouldEmitNewWarning)
            {
                worker.port.emit("insecure-password", decision);
                shouldEmitNewWarning = false;
            }
        }
});

function passwordDetectedListener(evnt) {
    // get the notification object from the browser
    var notification = evnt.subject.QueryInterface(Ci.nsIInsecurePasswordNotification);

    // change the notification object that we got from the browser
    // into our lighter object that we send around
    decision = new DecisionResult(notification.offenderType, notification.offenderURL);

    // send the decision object to the warning panel
    warningPanel.port.emit("passwordDecisionMade", decision);
    warningPanel.show();

    // if insecure password tracker is enabled, then send the decision to the web service
    passwordTracker.trackInsecurePassword(decision);
    shouldEmitNewWarning = true;
}

// attach a listener to listen on event from the browser when it detects
// insecure passwords
events.on("insecure-password-detected", passwordDetectedListener, false);
