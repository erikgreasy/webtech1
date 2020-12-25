let demoRunning = false;
let gameRunning = false;

/**
 * Event listeners
 */
$( '#startBtn' ).click( function() {
    startGame()
})

$( '#demoBtn' ).click( function() {
    demo()
})

const finalPositions = {
    '#czechia' : { top: 240, left: 201 },
    '#austria' : { top: 263, left: 173 },
    '#poland' : {top: 191, left: 215},
    '#slovakia' : {top: 256, left: 248},
    '#romania' : {top: 270, left: 277},
    '#hungary' : {top: 275, left: 236},
    '#bulgaria' : {top: 324, left: 298},
    '#slovenia' : {top: 299, left: 217},
    '#croatia' : {top: 298, left: 216},


}

const originalPositions = {
        
    czechia : $( '#czechia' ).position()
        
}

console.log( originalPositions )


let uncomplete = [
    '#czechia',
    '#austria',
    '#poland',
    '#slovakia',
    '#romania',
    '#hungary',
    '#bulgaria',
    '#slovenia',
    '#croatia',
]







function makeDroppable( objectSelector, targetSelector, finalPos ) {
    
    $( objectSelector ).draggable({
        revert: true
    });
    $( targetSelector ).droppable({
        accept: objectSelector,
        
        drop: function( event, ui ) {
            $( this ).addClass( "active" )

            $( objectSelector ).draggable({
                revert: false
            });
            $( objectSelector ).draggable('disable');
            let index = uncomplete.indexOf( objectSelector );
            if (index > -1) {
                uncomplete.splice(index, 1);
            }
            console.log( uncomplete )
            if( uncomplete.length == 0 ) {
                endGame();
            }


            $( objectSelector ).css({
                position: 'absolute',
                left: finalPos.left + 'px',
                top: finalPos.top + 'px'
            })

        },
        deactivate: function() {
            if( $( this ).hasClass( 'active' ) ) {

                
            } else {

            }
        }
    });
}


var interval;
var timePassed = 0;

function endGame() {
    alert( 'game ended' )
    clearInterval( interval )
}

function startGame() {
    if( gameRunning ) {
        location.reload()
    }
    gameRunning = true;
    $( '#demoBtn' ).prop('disabled', 'true')
    makeDroppable( '#czechia', '#czechia-container', {top: 240, left: 201})
    makeDroppable( '#austria', '#austria-container', {top: 263, left: 173} )
    makeDroppable( '#poland', '#poland-container', {top: 191, left: 215} )
    makeDroppable( '#slovakia', '#slovakia-container', {top: 256, left: 248} )
    makeDroppable( '#romania', '#romania-container', {top: 270, left: 277} )
    makeDroppable( '#hungary', '#hungary-container', {top: 275, left: 236} )
    makeDroppable( '#bulgaria', '#bulgaria-container', {top: 324, left: 298} )
    makeDroppable( '#slovenia', '#slovenia-container', {top: 299, left: 217} )
    makeDroppable( '#croatia', '#croatia-container', {top: 298, left: 216} )
    timePassed = 0;
    $( '#startBtn' ).html( 'start again' )
    interval = setInterval( function() {
        timePassed++;
        $( '#timer span' ).html( timePassed )
    }, 1000 )
}

function demo() {
    if( demoRunning ) {
        location.reload()
    }
    demoRunning = true;
    $( '#demoBtn' ).html( 'end demo' )
    $( '#startBtn' ).prop( 'disabled', 'true' )

    uncomplete.forEach( item => {
        let finalItemPos = finalPositions[item];
        $( item ).css({
            position: 'absolute'
        })
        $( item ).animate({
            left: finalItemPos.left,
            top: finalItemPos.top
        }, 1000)
    } )
}