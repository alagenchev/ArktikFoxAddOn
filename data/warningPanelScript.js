window.addEventListener('click', function(event) {
    var t = event.target;
    if (t.nodeName == 'BUTTON')
        self.port.emit('click-link');
}, false);

self.port.on("passwordDecisionMade", function(decision) {
    var warningArea = document.getElementById('warningDiv');
    /*
    console.log("warning panel: " + warningPanel.isShowing);
    console.log("decision in menu: " + JSON.stringify(decision, null, 4));
    */

    if(decision.type == "page")
    {
        warningArea.innerHTML = "Insecure passwords were found on a  page with URL: ";
    }
    else if(decision.type == "form")
    {
        warningArea.innerHTML = "Insecure passwords were found on a form with action: ";
    }
    else if(decision.type == "iframe")
    {
        warningArea.innerHTML = "Insecure passwords were found on an iframe with source: ";
    }
    warningArea.innerHTML = warningArea.innerHTML + decision.url + 
        "   <button style=\"margin-left: 20\">Learn More</button>"; 
});
