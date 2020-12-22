var allItems = 12;
var notPlaced = allItems;

// map of id's draggable to droppable
var mapObjects = {
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
  droppable_sea: "draggable_sea",
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
    // snap: draggable[a].repl, 
      snapTolerance: 10, 
      revert: "invalid"
        // start: function(ev, ui){ ui.helper.width($(this).width()); }
    });

  let dropList = document.getElementsByClassName("droppable");
  for (let i=0; i < dropList.length; ++i){
    $("#"+dropList[i].getAttribute("id")).droppable({
      accept : "#"+mapObjects[dropList[i].getAttribute("id")], //".draggable" 
      tolerance: "pointer",
      greedy : true,
      hoverClass: 'highlight',
        // drop: function(ev, ui) {
        //     $(ui.draggable).detach().css({position : 'relative', top: 'auto',left: 'auto'}).appendTo(this);
        // }
        drop: handleCardDrop
    });
  }
  
  resizePage();
});

function handleCardDrop(event, ui) {

  //Grab the slot number and card number
  var droppableItem = $(this).attr('id'); // $this -> droppable
  var draggableItem = ui.draggable.attr('id'); // ui -> draggable item
  

  if (mapObjects[droppableItem] == draggableItem ) {
    ui.draggable.addClass('correct');
    ui.draggable.draggable('disable');

    let myVar = "center center";
    let atVar = "center center";
    
    if (draggableItem == "draggable_gl"){
      console.log("draggable_gl");
      atVar = 'right center';
    } else if (draggableItem == "draggable_sea"){
      console.log("draggable_sea");
      myVar = "top center";
      atVar = "center center";
    }else if (draggableItem == "draggable_au"){
      console.log("draggable_au");
    }
    
    $(this).droppable('disable');
    ui.draggable.position({
      of: $(this), my: myVar, at: atVar
    });

    // ui.draggable.draggable('option', 'revert', false);
    notPlaced--;
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


//1377 - 697
  // After window is resized, change size for each element
var ratios = [15,33,10,12,13,14,15,13,16,17,18,19];

function resizePage(){
  var w = window.innerWidth / 1377;
  // var h = window.innerHeight / 1200;

  let dropList = document.getElementsByClassName("droppable");
  // let ratioheight = $("#main-frame").width() / 697;

  // for (let i =0; i < allItems; i++){
  //   if (dropList[i] == null)
  //     continue;
  //   let it = document.getElementById(dropList[i].getAttribute('id'));
  //   it.style.width = $("#map-img").width()*ratios[i]+"px";
  //   // it.style.height = ratioheight*ratios[i+1]+"px";
  //   // $("#"+dropList[i].getAttribute("id")).css('top', '50px').css('left', '50px');
  // }
  // droppable_na: "draggable_na",
  // droppable_sa: "draggable_sa",
  // droppable_cb: "draggable_cb",
  // droppable_eu: "draggable_eu",
  // droppable_af: "draggable_af",
  // droppable_me: "draggable_me",
  // droppable_ca: "draggable_ca",
  // droppable_as: "draggable_as",
  // droppable_au: "draggable_au",
  // droppable_gl: "draggable_gl",
  // droppable_ar: "draggable_ar",
  // droppable_sea: "draggable_sea",
}