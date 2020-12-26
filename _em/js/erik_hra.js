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

var europeWidth = $('#europe').width()
var europeHeight = $('#europe').height()
console.log( `Euro width: ${europeWidth}` )
console.log( `Euro height: ${europeHeight}` )

$( '#austria-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 290 + ((europeWidth-400)/100) * 59,
    left: europeWidth*0.55
})
$( '#czechia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 260 + ((europeWidth-400)/100) * 50,
    left: europeWidth*0.58
})
$( '#poland-container' ).css({
    width: europeWidth*0.175,
    height: europeWidth*0.1375,
    top: 210 + ((europeWidth-400)/100) * 40,
    left: europeWidth*0.6
})
$( '#slovakia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.05,
    top: 275 + ((europeWidth-400)/100) * 55,
    left: europeWidth*0.67
})
$( '#romania-container' ).css({
    width: europeWidth*0.125,
    height: europeWidth*0.1,
    top: 295 + ((europeWidth-400)/100) * 60,
    left: europeWidth*0.78
})
$( '#bulgaria-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 345 + ((europeWidth-400)/100) * 73,
    left: europeWidth*0.82
})
$( '#hungary-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 290 + ((europeWidth-400)/100) * 62,
    left: europeWidth*0.67
})
$( '#croatia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.05,
    top: 325 + ((europeWidth-400)/100) * 67,
    left: europeWidth*0.6
})
$( '#slovenia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.025,
    top: 320 + ((europeWidth-400)/100) * 65,
    left: europeWidth*0.56
})

/**
 * Setting responsive width of countries
 */
$( '#czechia' ).css({
    width: europeWidth*0.24 + 'px'
})
$( '#hungary' ).css({
    width: europeWidth/4 + 'px'
})
$( '#bulgaria' ).css({
    width: europeWidth*0.23 + 'px'
})

$( '#austria' ).css({
    width: europeWidth*0.278 + 'px'
})
$( '#poland' ).css({
    width: europeWidth*0.325 + 'px'
})
$( '#slovakia' ).css({
    width: europeWidth*0.175 + 'px'
})
$( '#romania' ).css({
    width: europeWidth*0.3 + 'px'
})
$( '#croatia' ).css({
    width: europeWidth*0.225 + 'px'
})
$( '#slovenia' ).css({
    width: europeWidth*0.125 + 'px'
})



const finalPositions = {
    // '#czechia' : { top: 240, left: 201 },
    '#czechia' : { top: 240 + ((europeWidth-400)/100) * 47, left: europeWidth*0.5025 },

    // '#austria' : { top: 263, left: 173 },
    '#austria' : { top: 263 + ((europeWidth-400)/100) * 51.5, left: europeWidth*0.431 },

    // '#poland' : {top: 191, left: 215},
    '#poland' : {top: 191 + ((europeWidth-400)/100) * 34, left: europeWidth*0.5375},

    // '#slovakia' : {top: 256, left: 248},
    '#slovakia' : {top: 259 + ((europeWidth-400)/100) * 51.5 , left: europeWidth*0.63},

    // '#romania' : {top: 270, left: 277},
    '#romania' : {top: 270 + ((europeWidth-400)/100) * 53.55, left: europeWidth*0.6925},

    // '#hungary' : {top: 275, left: 236},
    '#hungary' : {top: 275 + ((europeWidth-400)/100) * 55, left: europeWidth*0.59},

    // '#bulgaria' : {top: 324, left: 298},
    '#bulgaria' : {top: 328 + ((europeWidth-400)/100) * 68, left: europeWidth*0.752},

    // '#slovenia' : {top: 299, left: 217},
    '#slovenia' : {top: 299 + ((europeWidth-400)/100) * 61, left: europeWidth*0.545},

    // '#croatia' : {top: 298, left: 216},
    '#croatia' : {top: 298 + ((europeWidth-400)/100) * 60.7, left: europeWidth*0.541},



}
console.log( 263 + ((europeWidth-400)/100) * 51  )



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
            console.log( $( objectSelector ).position() )

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
    makeDroppable( '#czechia', '#czechia-container', finalPositions['#czechia'])
    makeDroppable( '#austria', '#austria-container', finalPositions['#austria'] )
    makeDroppable( '#poland', '#poland-container', finalPositions['#poland'] )
    makeDroppable( '#slovakia', '#slovakia-container', finalPositions['#slovakia'] )
    makeDroppable( '#romania', '#romania-container', finalPositions['#romania'] )
    makeDroppable( '#hungary', '#hungary-container', finalPositions['#hungary'] )
    makeDroppable( '#bulgaria', '#bulgaria-container', finalPositions['#bulgaria'] )
    makeDroppable( '#slovenia', '#slovenia-container', finalPositions['#slovenia'] )
    makeDroppable( '#croatia', '#croatia-container', finalPositions['#croatia'] )
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