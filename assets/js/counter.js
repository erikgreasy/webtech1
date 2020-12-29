window.onload = countAccesses;

function countAccesses(){
    var dateNow = new Date();
    var cookieJSON = getCookie("accesses");

    if ( cookieJSON !=="" ) {
        var cookie = JSON.parse(cookieJSON);
        var numOfAccesses = cookie[0];
        var lastTime = new Date (cookie[1]);
        var diffMinutes = Math.ceil ((dateNow - lastTime) / (1000*60)) ;
        if ( diffMinutes >= 30 ) {
            var increment = ++numOfAccesses;
            var arr = [increment,dateNow];
            var json_str = JSON.stringify(arr);
            setCookie("accesses",json_str,365);
        }
    } else {
        var arr = [1,dateNow];
        var json_str = JSON.stringify(arr);
        setCookie("accesses",json_str,365);
    }

}



function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
        c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
        }
    }
    return "";
}

