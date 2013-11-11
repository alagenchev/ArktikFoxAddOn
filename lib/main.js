var data = require("sdk/self").data;
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
 
// Create a widget, and attach the panel to it, so the panel is
// shown when the user clicks the widget.
var button = require("sdk/widget").Widget({
  label: "ArktikFox",
  id: "arktik-fox-button",
  contentURL: data.url("xfpm-brightness-lcd-invalid.png"),
  panel: menuPanel
});
 
var pageMod = require("sdk/page-mod");
 
function onInsecurePasswordDecision(decision)
{

    if(warningPanel.isShowing)
    {
        //we already detected something insecure - ignore everything else for now
        return;
    }
    //console.log("decision: " + JSON.stringify(decision, null, 4));
    if(decision)
    {
        warningPanel.show();
    }
    
    menuPanel.port.emit("passwordDecisionMade", decision);
}

pageMod.PageMod({
  include: "*",
  contentScriptFile: [data.url("myscript.js")],
  
  onAttach: function(worker) {
   // worker.port.emit("getElements", tag);
   worker.port.on("getInsecurePasswordDecision", onInsecurePasswordDecision); 
  }
});

// When the panel is displayed it generated an event called
// "show": we will listen for that event and when it happens,
// send our own "show" event to the panel's script, so the
// script can prepare the panel for display.
/*
text_entry.on("show", function() {
  text_entry.port.emit("show");
});*/
 
// Listen for messages called "text-entered" coming from
// the content script. The message payload is the text the user
// entered.
// In this implementation we'll just log the text to the console.
/*
text_entry.port.on("text-entered", function (text) {
  console.log(text);
  text_entry.hide();
});*/
