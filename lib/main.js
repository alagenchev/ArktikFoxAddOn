var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var resultEnum = new require("ResultEnum").MyObject();
var passwordTracker = require("InsecurePasswordTracker");
var events = require("sdk/system/events");
var { Ci } = require("chrome");

var warningPanel = require("mypanel").Panel({
        width: 1000,
        height: 50,
        position: {
            bottom: 666
        },
        contentURL: data.url("warningPanel.html"),
        contentScriptFile: [data.url("warningPanelScript.js")]

});

warningPanel.port.on("click-link", function() {
    warningPanel.hide();
    tabs.open("https://developer.mozilla.org/docs/Security/InsecurePasswords");
});

var menuPanel = require("sdk/panel").Panel({
        width: 200,
        height: 200,
        contentURL: data.url("menuPanel.html"),
        contentScriptFile: [data.url("menuPanelScript.js")]
});

// if a tab became ready or active then we want to clear a previous warning
// since we are about to navigate to a new page
tabs.on('ready', function(tab) {
    //warningPanel.hide();
    menuPanel.port.emit("clearWarning");
});

tabs.on('activate', function(tab) {
    //warningPanel.hide();
    menuPanel.port.emit("clearWarning");
});

// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
var button = require("sdk/widget").Widget({
  label: "ArktikFox",
  id: "arktik-fox-button",
  contentURL: data.url("xfpm-brightness-lcd-invalid.png"),
  panel: menuPanel
});

function DecisionResult(type, url)
{
    this.type = type;
    this.url = url;
}

var decision;
var shouldEmit = false;
pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("redScript.js")],
  
  onAttach: function(worker) {
      if(shouldEmit)
      {
          worker.port.emit("insecure-password", decision);
          shouldEmit = false;
      }
  }
  });
function listener(evnt) {
    var notification = evnt.subject.QueryInterface(Ci.nsIInsecurePasswordNotification);
    decision = new DecisionResult(notification.offenderType, notification.offenderURL);
    warningPanel.port.emit("passwordDecisionMade", decision);
    warningPanel.show();
    passwordTracker.trackInsecurePassword(decision);
    shouldEmit = true;

}
 
events.on("insecure-password-detected", listener, false);


/*
// received an insecure password decision from the mod script
function onInsecurePasswordDecision(decision)
{
    //console.log("decision: "+ decision + ", isShowing: " + warningPanel.isShowing);

    if(warningPanel.isShowing)
    {
        // we already detected something insecure - ignore everything else for now
        return;
    }
    //console.log("decision: " + JSON.stringify(decision, null, 4));
    //warningPanel.show();
    menuPanel.port.emit("passwordDecisionMade", decision, warningPanel);
    passwordTracker.trackInsecurePassword(decision);
}

pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("modScript.js")],
  
  onAttach: function(worker) {
   worker.port.on("getInsecurePasswordDecision", onInsecurePasswordDecision); 
  }
  });
  */
