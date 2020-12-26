
var timer = new Timer();
var gameIsRunning = false;

function resizePage(){
  console.log(window.innerWidth + "... H: " + window.innerHeight);
  return;
}

$( document ).ready(function() {
    
  // set draggable items
  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
  $draggable_items.forEach(element => {
      $(element).draggable({
          // snap: '.droppable', // magnet to droppable items
          // snapTolerance: 15, // distance of magnet
          revert: 'invalid', // slide to start if dropped to wrong place
          disabled: true, //------------ when page load disable all draggable items
      })    
  });
  
  // set droppable items
  $droppable_items = $('#droppables').find('.droppable').toArray(); 
  $droppable_count = $droppable_items.length
  $droppable_items.forEach(element => {
      element = $(element); // DOM element -> jQuery objects (required) 
      element.droppable({
          tolerance: "intersect", // accuracy of drop

          drop: function(e, ui) {
              ui.draggable.position({
                  of: element,
                  using: function(pos) {
                      $(this).animate(pos, 250, "linear");
                      // disable draggable item if dropped successfully
                      $(this).draggable( "option", "disabled", true ); 
                      $(this).css('z-index', '1')
                  }
              });

              // $droppable_count -= 1;

              // end game when all droppable items disabled
              // if( ! $droppable_count ) {
              //     timer.stop();
              //     $('.values').addClass('result_time');
              // }
          }
      })
      
      // add accept option to each item
      element.droppable( "option", "accept", element.attr('id').replace('droppable','#draggable') );
  });    

  $('#startLink').click(function(){ startGame(); });
  $('#demoLink').click(function(){ runDemo(); });

})

function startGame(){

  if (gameIsRunning){
    gameIsRunning = false;
    // $('#secondsPassed').html("00:00:00");
    pauseGame();
    timer.pause();
    // timer.reset();
    return;
  } 

  gameIsRunning = true;
  timer.start();
  resumeGame();

  timer.addEventListener('secondsUpdated', function (e) {
    $('#secondsPassed').html(timer.getTimeValues().toString());
  });
}

function pauseGame(){
  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
  $draggable_items.forEach(element => {
    $(element).draggable({
        disabled: true 
    })
  });
}

function resumeGame(){
  $draggable_items = $('#draggables').find('.draggable').toArray(); // object -> array
  $draggable_items.forEach(element => {
    $(element).draggable({
        disabled: false 
    })
  });
}

function runDemo(){

}