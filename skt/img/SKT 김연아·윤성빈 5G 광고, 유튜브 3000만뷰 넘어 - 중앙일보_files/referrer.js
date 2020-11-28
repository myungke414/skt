var mobStorage = {
    load : function(key) {
        return window.localStorage.getItem(key);
    },
    save : function(key, value) {
        window.localStorage.setItem(key, value);
    },
    clear : function() {
        window.localStorage.clear();
    }
}

function isNotEmpty(value) {
    if (value == null || value == "" || value == "null"
        || typeof value == "undefined" || value == "undefined"
        || value == undefined)
        return false;
    else
        return true;
}

function checkUseFrom(zoneid) {
    var useFromZoneid = "28896,28892";
    if (useFromZoneid.indexOf(zoneid) > -1) {
        return true;
    }
    return false;
}

var ref_url = document.referrer;
if(window.localStorage){
    if(document.referrer.indexOf("mediacategory.com") == -1) mobStorage.save("ref_url", document.referrer);
    ref_url = mobStorage.load('ref_url');
}


