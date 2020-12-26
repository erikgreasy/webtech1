$( document ).ready(function() {

    var lastPages = [];
    var href = document.location.href;

    // if cookies not set -> set them ... else get and change
    if ( getCookie('breadcrumbs') == "" ) 
    {
      lastPages.push(href)
      setCookie("breadcrumbs", lastPages, 1)

    } else 
    {
      var lastPages = getCookie('breadcrumbs').split(',');

      // only 5 last visited pages
      if ( lastPages.length == 5 ) {
        lastPages.shift();
      }

      lastPages.push(href)
      setCookie("breadcrumbs", lastPages, 1)
    }
    
    var breadcrumbs = new Map([
        ["index.html", "Home"],
        ["", "Home"],
        ["bratislava.html", "Bratislava"]
    ]);

    // print breadcrumbs to page
    var breadcrumbEl = $('#breadcrumb')
    for ( let i = 0; i < lastPages.length; i++ ) {
      var splittedUrl = lastPages[i].split('/');
      console.log(splittedUrl)
      if ( i == lastPages.length - 1 ) {
        breadcrumbEl.append('<li class="current">' + breadcrumbs.get(splittedUrl[splittedUrl.length - 1].replace('#','')) + '</li>')
      } else {
        breadcrumbEl.append('<li><a href="' + lastPages[i] + '">' + breadcrumbs.get(splittedUrl[splittedUrl.length - 1].replace('#','')) + '</a> > </li>')
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