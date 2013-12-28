function enableForm()
{
    for(var i = 0; i < document.forms.length; i++)
    {

        var elements = document.forms[i].getElementsByTagName("input");

        for(var j = 0; j < elements.length; j++)
        {

            if(elements[j].disabled &&
                (elements[j].type == "password" || elements[j].type == "submit"))
            {
                elements[j].disabled = false;
                elements[j].setAttribute("style", "background-color: \"\";");
            }
        }
    }
}

self.port.on("re-enable-form", enableForm);

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
                elements[j].disabled = true;
            }
            else if (elements[j].type == "submit")
            {
                elements[j].disabled = true;
            }
        }
    }
});

