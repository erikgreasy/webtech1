$( document ).ready(function() {

    var breadcrumbArr = [];
    var href = document.location.href;
    var splitHref = href.split("/");
    
    // if cookies not set -> set them ... else get and change
    if ( getCookie('breadcrumbs') == "" ) 
    {
      breadcrumbArr.push(splitHref[splitHref.length -1])
      setCookie("breadcrumbs", breadcrumbArr, 1)
      
    } else 
    {
      var breadcrumbArr = getCookie('breadcrumbs').split(',');

      // only 5 last visited pages
      if ( breadcrumbArr.length == 5 ) {
        breadcrumbArr.shift();
      }

      breadcrumbArr.push(splitHref[splitHref.length-1])
      setCookie("breadcrumbs", breadcrumbArr, 1)
    }
    
    
    // print breadcrumb to page
    var breadcrumbEl = $('#breadcrumb')
    for ( let i = 0; i < breadcrumbArr.length; i++ ) {
      if ( i == breadcrumbArr.length - 1 ) {
        breadcrumbEl.append('<li><a href="'+ breadcrumbArr[i] +'">'+breadcrumbArr[i]+'</a></li>')
      } else {
        breadcrumbEl.append('<li><a href="'+ breadcrumbArr[i] +'">'+breadcrumbArr[i]+'</a> > </li>')
      }
    }
  
  

    // Cookies
    // https://www.w3schools.com/js/js_cookies.asp
    function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }
  
    function getCookie(cname) {
      var name = cname + "=";
      var ca = document.cookie.split(';');
      for(var i = 0; i < ca.length; i++) {
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
  })