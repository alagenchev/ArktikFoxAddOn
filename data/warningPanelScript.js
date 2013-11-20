// the user clicked somewhere in the panel document
window.addEventListener('click', function(event) {
    var t = event.target;
    if (t.nodeName == 'BUTTON')
        // send notification to main.js that the user
        // clicked on the learn more button
        self.port.emit('clicked-learn-more-link');
}, false);

// we received a passward decision from the browser
self.port.on("passwordDecisionMade", function(decision) {
    var warningArea = document.getElementById('warningDiv');

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
