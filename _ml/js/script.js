$( document ).ready(function() {
    
    // shuffle draggable elements in html
    var ul = document.querySelector('#draggable-items');
    for (var i = ul.children.length; i >= 0; i--) {
        ul.appendChild(ul.children[Math.random() * i | 0]);
    }


    // set draggable items
    $draggable_items = $('#draggable-items').find('.draggable').toArray(); // object -> array
    $draggable_items.forEach(element => {
        $(element).draggable({
            // snap: '.droppable', // magnet to droppable items
            // snapTolerance: 15, // distance of magnet
            revert: 'invalid', // slide to start if dropped to wrong place
            disabled: true, // when page load disable all draggable items
        })    
    });
    
    // set droppable items
    $droppable_items = $('#droppable-items').find('.droppable').toArray(); 
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

                $droppable_count -= 1;

                // end game when all droppable items disabled
                if( ! $droppable_count ) {
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
    $('#myTimer .startButton').click(function () {
        timer.start({precision: 'secondTenths'});
        $draggable_items.forEach(element => {
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
    demo.on('click', function(event) {
        $droppable_items.forEach(element => {
            element = $(element);
            $dragItem = $(element.attr('id').replace('drop','#drag')) ;
            $dragItem.animate(element.position(), 200, "linear");
            console.log(element.position())
        });

        event.preventDefault();
    })


})

