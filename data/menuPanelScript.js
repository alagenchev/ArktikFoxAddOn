var ResultEnum = 
    {
        "PAGE" : 0,
        "FORM" : 1,
        "IFRAME" : 2
    }


self.port.on("passwordDecisionMade", function(decision, warningPanel) {
    if(warningPanel.isShowing)
    {
        return;
    }
    var menuWarningArea = document.getElementById('warningDiv');
    /*
    console.log("decision in menu: " + JSON.stringify(decision, null, 4));
    */
    if(!decision)
    {
        menuWarningArea.innerHTML = "No insecure passwords were found on this page.";
        return;
    }

    if(decision.type == ResultEnum.PAGE)
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this page!";
    }
    else if(decision.type == ResultEnum.FORM)
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this form!";
    }
    else if(decision.type == ResultEnum.IFRAME)
    {
        menuWarningArea.innerHTML = "Insecure passwords were found on this iframe!";
    }
    menuWarningArea.innerHTML = menuWarningArea.innerHTML + " " + decision.url; 

    console.log("done");

});
