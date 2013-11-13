var ResultEnum = 
    {
        "PAGE" : 0,
        "FORM" : 1,
        "IFRAME" : 2
    }


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

//console.log("document.URL: " + JSON.stringify(document.URL));
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

        /*
        if(elements[j].type == "password" && isUnsafeIframe)
        {
            result = new DecisionResult(ResultEnum.IFRAME, document.URL); 
            self.port.emit("getInsecurePasswordDecision", result);
            isUnsafePassword = true;
        }
    */
        if(elements[j].type == "password" && isUnsafePage )
        {
            result = new DecisionResult(ResultEnum.PAGE, document.URL); 
            self.port.emit("getInsecurePasswordDecision", result);
            isUnsafePassword = true;
        }
        else if(elements[j].type == "password" &&  isUnsafeForm)
        {
            result = new DecisionResult(ResultEnum.FORM, document.forms[i].action); 
            self.port.emit("getInsecurePasswordDecision", result);
            isUnsafePassword = true;
        }
    }
}
