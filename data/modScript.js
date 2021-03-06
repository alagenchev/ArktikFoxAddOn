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
function logObject(obj)
{
    var text = JSON.stringify(obj, null, 4);
    console.log(text);
}

function isUnsafeUrl(url)
{
    var stringURL = JSON.stringify(url);
    if(url.indexOf("http://") > -1)
    {
        return true;
    }
    return false;
}

function DecisionResult(type, url)
{
    this.type = type;
    this.url = url;
}

function setPasswordStyle(pwd)
{
    pwd.setAttribute("style", "background-color: rgba(239, 48, 36, .3);");
    pwd.disabled = true;
}

var isUnsafePage = false;
var isUnsafeIframe = false;

if(isUnsafeUrl(document.URL))
{
    isUnsafePage = true;
}

var result;
var isUnsafePassword = false;

for(var i = 0; i < document.forms.length; i++)
{
    var isUnsafeForm = false;
    if(isUnsafeUrl(document.forms[i].action))
    {
        isUnsafeForm = true;
    }

    if(!isUnsafeForm && !isUnsafePage && !isUnsafeIframe)
    {
        continue;
    }
    var elements = document.forms[i].getElementsByTagName("input");

    for(var j = 0; j < elements.length; j++)
    {

        if(elements[j].type == "password" && isUnsafePage )
        {
            result = new DecisionResult("page", document.URL);
            self.port.emit("getInsecurePasswordDecision", result);
            isUnsafePassword = true;
            setPasswordStyle(elements[j]);
        }
        else if(elements[j].type == "password" &&  isUnsafeForm)
        {
            result = new DecisionResult("form", document.forms[i].action);
            self.port.emit("getInsecurePasswordDecision", result);
            isUnsafePassword = true;
            setPasswordStyle(elements[j]);
        }
        else if (elements[j].type == "submit" && isUnsafePassword)
        {
            elements[j].disabled = true;
        }
    }
}
