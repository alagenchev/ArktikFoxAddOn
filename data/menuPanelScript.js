    self.port.on("clearWarning", function() {
        var menuWarningArea = document.getElementById('warningDiv');
        menuWarningArea.innerHTML = "No insecure passwords were found on this page.";
    });

self.port.on("passwordDecisionMade", function(decision, warningPanel) {
    var menuWarningArea = document.getElementById('warningDiv');
    /*
    console.log("warning panel: " + warningPanel.isShowing);
    console.log("decision in menu: " + JSON.stringify(decision, null, 4));
    */

    if(decision.type == "page")
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this page!";
    }
    else if(decision.type == "form")
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this form!";
    }
    else if(decision.type == "iframe")
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this iframe!";
    }
    menuWarningArea.innerHTML = menuWarningArea.innerHTML + " " + decision.url; 
});
