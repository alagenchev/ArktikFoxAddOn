//window.alert(document.URL + " forms: " + document.forms.length);
//self.port.emit("gotElement", elements[i].innerHTML);

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

var isUnsafePage = false;
var isUnsafePassword = false;

var url = JSON.stringify();
if(isUnsafeUrl(document.URL))
{
    isUnsafePage = true;
}

for(var i = 0; i < document.forms.length; i++)
{
    var isUnsafeForm = false;
    if(isUnsafeUrl(document.forms[i].action))
    {
        isUnsafeForm = true;
    }

if(!isUnsafeForm && !isUnsafePage)
{
    continue;
}
var elements = document.forms[i].getElementsByTagName("input");

for(var j = 0; j < elements.length; j++)
{
    if(elements[j].type == "password" && isUnsafePage)
    {
        console.log("unsafe password");
        isUnsafePassword = true;
    }
}
}


