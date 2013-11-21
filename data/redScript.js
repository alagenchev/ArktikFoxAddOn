self.port.on("insecure-password", function (decision)
{
    for(var i = 0; i < document.forms.length; i++)
    {
        if(decision.type=="form" && document.forms[i].action != decision.url)
        {
            continue;
        }
        var elements = document.forms[i].getElementsByTagName("input");

        for(var j = 0; j < elements.length; j++)
        {
            if(elements[j].type == "password")
            {
                elements[j].setAttribute("style", "background-color: rgba(239, 48, 36, .3);");
            }
        }
    }
});

