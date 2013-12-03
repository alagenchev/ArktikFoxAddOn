var pageScriptWorker;
// the user clicked somewhere in the panel document
window.addEventListener('click', function(event) {
    var t = event.target;
    if (t.nodeName == 'BUTTON') {
        if (t.innerHTML == "Learn More") {
            // send notification to main.js that the user
            // clicked on the learn more button
            self.port.emit('clicked-learn-more-link');
        }
        else if (t.innerHTML == "Enable Form") {
            self.port.emit("re-enable-form");
        }
        else if (t.innerHTML == "Yes") {
        }
    }
}, false);

// we received a passward decision from the browser
self.port.on("passwordDecisionMade", function(decision, willSendOffender) {
    var warningArea = document.getElementById('warningDiv');

    warningArea.innerHTML = "<p style=\"padding: 0; margin: 0;\">This page may expose your password!" +
        "   <button style=\"margin-left: 20;\">Learn More</button></p>"+
        "<p style=\"padding: 0; margin: 0;\">The form has been disabled for your safety."+
        "Do you want to re-enable it [not recommended]?"+
        "   <button style=\"margin-left: 20;\">Enable Form</button>";
    if (!willSendOffender) {
        warningArea.innerHTML = warningArea.innerHTML +
            "<p style=\"padding: 0; margin: 0;\">Do you want to submit the page address, so we can notify the site administrator?"+
            "<button style=\"margin-left: 20;\">Yes</button></p>"+
            "<p style=\"padding: 0; margin: 0;\">You can also change your reporting preferences from the extension's preferences.</p>";
    }
});
