
var notPlaced = 12;
// map of id's draggable to droppable
var mapObjects = {
  droppable_na: "draggable_na",
  droppable_na: "draggable_na",
  droppable_sa: "draggable_sa",
  droppable_cb: "draggable_cb",
  droppable_eu: "draggable_eu",
  droppable_af: "draggable_af",
  droppable_me: "draggable_me",
  droppable_ca: "draggable_ca",
  droppable_as: "draggable_as",
  droppable_au: "draggable_au",
  droppable_gl: "draggable_gl",
  droppable_ar: "draggable_ar",
};

$( document ).ready(function() {

  console.log( "ready!" );

  // let dragList = document.getElementsByClassName("draggable");
  // for (const it in mapObjects){
  //   $( ""+mapObjects[it] ).draggable({
  //     revert: "invalid"
  //       // start: function(ev, ui){ ui.helper.width($(this).width()); }
  //   });
  // }
  $( ".draggable" ).draggable({
      revert: "invalid"
        // start: function(ev, ui){ ui.helper.width($(this).width()); }
    });

  let dropList = document.getElementsByClassName("droppable");
  for (let i=0; i < dropList.length; ++i){
    $("#"+dropList[i].getAttribute("id")).droppable({
      accept : "#"+mapObjects[dropList[i].getAttribute("id")], //".draggable" 
      tolerance: 'pointer',
      greedy : true,
      hoverClass: 'highlight',
        // drop: function(ev, ui) {
        //     $(ui.draggable).detach().css({position : 'relative', top: 'auto',left: 'auto'}).appendTo(this);
        // }
        drop: handleCardDrop
    });
  }
  

});

function handleCardDrop(event, ui) {
  
  //Grab the slot number and card number
  var droppableItem = $(this).attr('id'); // $this -> droppable
  var draggableItem = ui.draggable.attr('id'); // ui -> draggable item
  
  
  //If the cards was dropped to the correct slot,
  //change the card colour, position it directly
  //on top of the slot and prevent it being dragged again

  if (mapObjects[droppableItem] == draggableItem ) {
    // alert( droppableItem + "..." + draggableItem );
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');
    // $(this).droppable('disable');
    // ui.draggable.position({
    //   of: $(this), my: 'left top', at: 'left top'
    // });
    //This prevents the card from being
    //pulled back to its initial position
    //once it has been dropped
    ui.draggable.draggable('option', 'revert', false);
    notPlaced--; // decrement count of not places
  }
  
  //If all the cards have been placed correctly then
  //display a message and reset the cards for
  //another go

  // if (correctCards === 10) {
  //   $('#successMessage').show();
  //   $('#successMessage').animate({
  //     left: '380px',
  //     top: '200px',
  //     width: '400px',
  //     height: '100px',
  //     opacity: 1
  //   });
  }