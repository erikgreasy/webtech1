$( document ).ready(function() {

    var lastPages = [];
    var href = document.location.href;
    var splitHref = href.split("/");

    // if cookies not set -> set them ... else get and change
    if ( getCookie('breadcrumbs') == "" ) 
    {
      lastPages.push(href)
      setCookie("breadcrumbs", lastPages, 1)

    } else 
    {
      var lastPages = getCookie('breadcrumbs').split(',');
      console.log(lastPages)

      // only 5 last visited pages
      if ( lastPages.length == 5 ) {
        lastPages.shift();
      }

      lastPages.push(href)
      setCookie("breadcrumbs", lastPages, 1)
    }
    
    var breadcrumbs = new Map([
        ["http://127.0.0.1:5500/gitVersion/index.html", "Bratislava"],
        ["http://127.0.0.1:5500/gitVersion/", "Bratislava"],
        ["http://127.0.0.1:5500/gitVersion/_ml/index.html", "Home"]
    ]);

    console.log(lastPages)
    // print breadcrumbs to page
    var breadcrumbEl = $('#breadcrumb')
    for ( let i = 0; i < lastPages.length; i++ ) {
      if ( i == lastPages.length - 1 ) {
        breadcrumbEl.append('<li><a href="' + lastPages[i] + '">' + breadcrumbs.get(lastPages[i]) + '</a> </li>')
      } else {
        breadcrumbEl.append('<li><a href="' + lastPages[i] + '">' + breadcrumbs.get(lastPages[i]) + '</a> > </li>')
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