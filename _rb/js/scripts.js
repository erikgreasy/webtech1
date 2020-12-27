 var regiony = document.getElementById('regiony');
  var childs = regiony.childNodes;
  
  var timerRunning = 0;

  var timer = new Timer();

  timer.addEventListener('secondsUpdated', function (e) {
    $('#gettingValuesExample .hours').html(timer.getTimeValues().hours);
    $('#gettingValuesExample .minutes').html(timer.getTimeValues().minutes);
    $('#gettingValuesExample .seconds').html(timer.getTimeValues().seconds);

  } )


  function adjustContent(){

    if(screen.availWidth > screen.availHeight){
        setLeft();
        setHeight();
    } else {
        setHeight();
    }
   setRegions();
  }
  
  window.addEventListener('resize', adjustContent);

  function setRegions(){
    var dropZoneEl = document.getElementById('dropZone');
    var ratio = $('#dropZone').width() /1200 ;

    var a = document.getElementById('BA_kusok');
    var num = 140 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('TT_kusok');
    var num = 213 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';


    var a = document.getElementById('NT_kusok');
    var num = 286 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('TN_kusok');
    var num = 302 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('BB_kusok');
    var num = 400 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('ZA_kusok');
    var num = 352 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('KE_kusok');
    var num = 437 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

    var a = document.getElementById('PP_kusok');
    var num = 527 * ratio;
    a.style.width = num + 'px' ;
    a.style.height = 'auto';

  }

  function setLeft(){
    var a = document.getElementById('boxik');
    var left = screen.availWidth/2 - 0.441*screen.availHeight;
    a.style.left = left + 'px'  ;

    var b = document.getElementById('regiony');
    var leftb = screen.availWidth/2 - 0.441*screen.availHeight;
    b.style.left = leftb + 'px'  ;
  }

  function setHeight(){
    var ratio = $('#dropZone').width() / 1200  * 695 ;
    var dropZoneEl = document.getElementById('dropZone');
    dropZoneEl.style.height = ratio + 'px';
    var topOffset = ($('#boxik').height() - ratio)/2;
    dropZoneEl.style.top = topOffset + 'px';

  }


  var krajeNalepene = {
    'BA': 0, 'TT': 0, 'NT': 0,'TN': 0,
     'BB': 0, 'ZA': 0,  'PP': 0, 'KE': 0,};
  
    var draggable = document.getElementById('regiony').childNodes;
    for (let a = 0 ; a < 16; a++) {
      if(a % 2 !== 0 ){
        $(draggable[a]).draggable({
              snap: draggable[a], 
                  snapTolerance: 10, 
                  revert: 'invalid', 

          }) ;

          $(draggable[a]).on('dragstart',checktimer) ;
      }
            
    }

    function checktimer() {
      if (timerRunning === 0) {
                timerRunning = 1;
                timer.start();
            }
    }
     
    var dropable = document.getElementById('dropZone').childNodes;
    for (let a = 0 ; a < 16; a++) {
      if(a % 2 !== 0 ){
            let acceptable = String(dropable[a].id) ;
            $(dropable[a]).droppable({
            tolerance: "pointer", 
            accept:  function(d) { 
              var f = String(d[0].id);
              if(f.includes(acceptable) ){ 
                  return true;
              }
              },
                  drop: function(event, ui) {
               
                          var $this = $(this);
                          ui.draggable.position({
                            of: $this,
                            using: function(pos) {
                              $(this).animate(pos, 200, "linear");
                            }
                          });
                          
                        $( ui.draggable[0]).draggable( 'disable' );
                        krajeNalepene[acceptable] = 1;
                        set_Z_indexes();
                        isGameWon();
                
                
                  }
        })
      }
            
    }
    

  
    function set_Z_indexes() {
      let keys = Object.keys(krajeNalepene);
  
      if(krajeNalepene[keys[0]] === 1  ){
        var blava = document.getElementById('BA');
        blava.style.zIndex = 0;
        var trnava = document.getElementById('TT');
        trnava.style.zIndex = 1;
      }
  
      
    }
  
    function resetGame() {
         location.reload();
    }
  
    function isGameWon() {
      let keys = Object.keys(krajeNalepene);
      let correct =0;
      for (let c = 0; c < 8; c++) {
        if( krajeNalepene[keys[c]] === 1) {
            correct++;
        }
      }
      console.log(correct);
      if ( correct === 8 ) {
          timer.stop();
          timerRunning = 0;
          setTimeout(notificate, 1000);
      }
    }
  
    function notificate() {
      setTimeout(function(){ }, 1000);
      if (window.confirm('Vyhral si. Chceš hrať znova?'))
        {
           resetGame();
        }
        else
        {
            
        }
    }

   // $('body').css({"background-repeat":"no-repeat","background-size":"cover"});