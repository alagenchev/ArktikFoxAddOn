var data = require("sdk/self").data;
var pageMod = require("sdk/page-mod");
var tabs = require("sdk/tabs");
var resultEnum = new require("ResultEnum").MyObject();

var warningPanel = require("sdk/panel").Panel({
        width: 1000,
        height: 50,
        position: {
            bottom: 0
        },
        contentURL: data.url("warningPanel.html")

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
    warningPanel.hide();
    menuPanel.port.emit("clearWarning");
});

tabs.on('activate', function(tab) {
    warningPanel.hide();
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
    warningPanel.show();
    menuPanel.port.emit("passwordDecisionMade", decision, warningPanel);
}

pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("modScript.js")],
  
  onAttach: function(worker) {
   worker.port.on("getInsecurePasswordDecision", onInsecurePasswordDecision); 
  }
});
