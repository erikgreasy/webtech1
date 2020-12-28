$( document ).ready(function() {

    // set draggable items
    var draggable_items = $('#draggable-items').find('.draggable').toArray(); // object -> array
    draggable_items.forEach(element => {
        $(element).draggable({
            // snap: '.droppable', // magnet to droppable items
            // snapTolerance: 15, // distance of magnet
            revert: 'invalid', // slide to start if dropped to wrong place
            disabled: true, // when page load disable all draggable items
        })    
    });
    
    // set droppable items
    var droppable_items = $('#droppable-items').find('.droppable').toArray(); 
    var droppable_count = droppable_items.length
    droppable_items.forEach(element => {
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

                droppable_count -= 1;

                // end game when all droppable items disabled
                if( ! droppable_count ) {
                    timer.stop();
                    $('.values').addClass('result_time');
                }
            }
        })
        
        // add accept option to each item
        element.droppable( "option", "accept", element.attr('id').replace('drop','#drag') );
    });    


    // TIMER
    var timer = new easytimer.Timer();    

    // start button pressed - start timer and enable all draggable items
    $('#start').click(function () {
        $('#demo').addClass('disabled'); // disable demo
        timer.start({precision: 'secondTenths'});
        draggable_items.forEach(element => {
            $(element).draggable({
                disabled: false 
            })
            
        });
    });

    // update time in html
    timer.addEventListener('secondTenthsUpdated', function (e) {
        $('#myTimer .values').html(timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths']));
    });
    
  
    // DEMO
     var demo = $('#demo');    
     var demoIsOn = true;
    demo.on('click', function(event) {
       
        // id Demo is ON do animation
        if ( demoIsOn ) {
            // switch demo
            demo.html("Stop Demo"); 
            // disable other buttons
            $('#start').addClass('disabled');
            $('#reset').addClass('disabled');

            for (let i = 0; i < droppable_items.length; i++) {
                    // setTimeout for delay in between iterations
                    setTimeout(function timer() {
                        //get drag drop item
                        var drag_item = $(draggable_items[i]),
                            drop_item = $(droppable_items[i]);

                            droppableOffset = drop_item.offset(),
                            draggableOffset = drag_item.offset(),

                            dx = droppableOffset.left - draggableOffset.left,
                            dy = droppableOffset.top - draggableOffset.top;

                        drag_item.animate({
                            "left": dx - (drag_item.width()-drop_item.width())/2,
                            "top": dy - (drag_item.height()-drop_item.height())/2
                        }, 1000)
                    }, i * 500);
            }
        // id Demo is OFF reset page
        } else {
            window.location.reload();
        }

        // switch demoIsOn bool
        demoIsOn = !demoIsOn;
        event.preventDefault();
    })

})

