
var timer = new Timer();
var gameIsRunning = false;
var droppable_items_count;

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
         // disabled: true,  TODO uncomment
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
                      // disable draggable item if dropped successfully
                      $(this).draggable( "option", "disabled", true ); 
                      $(this).css('z-index', '1')
                  }
              });

              --droppable_items_count;

              
              if(droppable_items_count == 0 ) { // end game if all were dropped
                  window.alert("Woho! Vyhral si s casom: " + timer.getTimeValues().toString());
                  timer.stop();
                  location.reload();
              }
          }
      })
      
      // add accept option to each item
      element.droppable( "option", "accept", element.attr('id').replace('droppable','#draggable') );
      // element.on('drop', function(event,ui){
      //   alert("dropped");
      // })
  });    

  $('#startLink').click(function(){ startGame(); });
  $('#demoLink').click(function(){ trigger_drop(); });

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

function trigger_drop() {
  var draggable = $("#draggable1").draggable();
  var droppable = $("#droppable1").droppable();
  var droppableOffset = droppable.offset();
  var draggableOffset = draggable.offset();
  var dx = droppableOffset.left - draggableOffset.left;
  var dy = droppableOffset.top - draggableOffset.top;

  draggable.simulate("drag-n-drop", {dx: 300, interpolation: {stepWidth: 10, stepDelay: 50}});
}

function runDemo(){
  if( gameIsRunning ) {
    window.alert("Cannot run demo while playing.");
    return;
  }
  // let positions = ['-10.1%','6.5%','190px', '0.1%','25.5%','190px'];
  let positions = [['10%', '20%'],['10%','40%'],['30%','40%'],['30%','40%'],['30%','40%']];
  // if (window.innerWidth > 1200){ // large screen
  //   // left - top -width
  //   positions = ['10.1%','6.5%','190px'];
  // } else if (window.innerWidth > 992){ // large screen

  // } else if (window.innerWidth > 768){ 

  // } else if (window.innerWidth > 700){

  // } else if (window.innerWidth > 556){ // small screen

  // }

  let droppable_count = $('#droppables').find('.droppable').toArray().length;
  // for (let i=0; i < 3; i++){

    $( "#droppable1" ).trigger('drop');
  //   $("#draggable"+i).css({
  //         position: 'absolute',
  //         width: "50%",
  //         height: "auto"
  //     }).animate({
  //       left: String(positions[i[0]]),
  //       top: String(positions[i[1]]),
  //   });
  // }
  
  // $("#draggable1").css({
  //   "position" : "absolute",
  // }).animate({
  //       "left": "620px",
  //       "top": "50px",
  //   });
  
  // uncomplete.forEach( item => {
  //     let finalItemPos = finalPositions[item];
  //     $( item ).css({
  //         position: 'absolute'
  //     })
  //     $( item ).animate({
  //         left: finalItemPos.left,
  //         top: finalItemPos.top
  //     }, 1000)
  // } )
}
