
var timer = new Timer();
var gameIsRunning = false;
var demoIsRunning = false;
var droppable_items_count;


$( document ).ready(function() {
  // set draggable items
  $draggable_items = $('#draggables').find('.draggable').toArray();
  $draggable_items.forEach(element => {
      $(element).draggable({
          revert: 'invalid', // slide to start if dropped to wrong place
          disabled: true,
      })    
  });
  
  // set droppable items
  $droppable_items = $('#droppables').find('.droppable').toArray(); 
  $droppable_count = $droppable_items.length
  droppable_items_count = $droppable_items.length;

  $droppable_items.forEach(element => {
      element = $(element); // DOM element -> jQuery objects (required) 
      element.droppable({
          tolerance: "intersect", // accuracy of drop

          drop: function(e, ui) {
              ui.draggable.position({
                  of: element,
                  using: function(pos) {
                      $(this).animate(pos, 250, "linear");
                      $(this).draggable( "option", "disabled", true ); 
                      $(this).css('z-index', '1')
                  }
              });

              --droppable_items_count;
              
              if(droppable_items_count == 0 ) { // end game if all were dropped
                  window.alert("Woho! Vyhrali ste s časom: " + timer.getTimeValues().toString());
                  timer.stop();
                  location.reload();
              }
          }
      })
      
      // add accept option to each item
      element.droppable( "option", "accept", element.attr('id').replace('droppable','#draggable') );
  });    

  $('#startLink').click(function(){ startGame(); });
  $('#demoLink').click(function(){ runDemo(); });
})

function startGame(){
  if (demoIsRunning)
    return;
  if (gameIsRunning){
    gameIsRunning = false;
    pauseGame();
    timer.pause();
    return;
  } 

  gameIsRunning = true;
  timer.start();
  resumeGame();

  timer.addEventListener('secondsUpdated', function (e) {
    $('#secondsPassed').html(timer.getTimeValues().toString());
  });
}

// disable draggables
function pauseGame(){
  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
  $draggable_items.forEach(element => {
    $(element).draggable({
        disabled: true 
    })
  });
}

// enable draggables
function resumeGame(){
  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
  $draggable_items.forEach(element => {
    $(element).draggable({
        disabled: false 
    })
  });
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/*
 * Simulate drag and drop for each draggable - demo
 */
async function trigger_drop() {
  resumeGame();
  demoIsRunning= true;
  
  droppable_items_count *=2;

  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
    for (let i = 1; i <13;i++){
      console.log("#draggable"+i + "..." + "#droppable" + i);
      let draggable = $("#draggable"+i).draggable(),
        droppable = $("#droppable"+i).droppable(),
        droppableOffset = droppable.offset(),
        draggableOffset = draggable.offset(),
        dx = droppableOffset.left - draggableOffset.left,
        dy = droppableOffset.top - draggableOffset.top;
        console.log(i+ ".. dx:" + dx + " ... dy:" + dy);

        // move the default coursor
        if (i == 5){
           dx -= 15; dy-=2;
        } else if (i == 6){
           dx -= 15; dy-=2;
        } else if (i == 7 && window.innerWidth > 1200){
            dx = 300;dy =-800;
        } else if (i == 8){
           dx = -210; dy = -710;
        }   else if (i == 10){
           dx = 380; dy = -850;
        } else if (i == 12){ 
           dy = -870;
        } 

      draggable.simulate("drag", {
          dx: dx,
          dy: dy
      });
      await sleep (1000);
    }

    await sleep (1000);
    window.alert("Pre spustenie hry, je po deme potrebné refresnúť stránku.");
    pauseGame();
}

function runDemo(){
  if( gameIsRunning ) {
    window.alert("Cannot run demo while playing.");
    return;
  }
  trigger_drop();
}

function letsPlay(){
  $("#beforeGame").css({
    "display": "none",
  });
}