/**
 * Variables
 */
let demoRunning = false;
let gameRunning = false;
var europeWidth = $('#europe').width()
var interval;
var timePassed = 0;

// countries that are not successfully completed
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

// positions where user should drag countries
const finalPositions = {
    '#czechia' : { top: 184 + ((europeWidth-400)/100) * 47, left: europeWidth*0.5025 + $( '#europe' ).position().left },

    '#austria' : { top: 207 + ((europeWidth-400)/100) * 51.5, left: europeWidth*0.431 + $( '#europe' ).position().left },

    '#poland' : {top: 135 + ((europeWidth-400)/100) * 34, left: europeWidth*0.5375 + $( '#europe' ).position().left },

    '#slovakia' : {top: 203 + ((europeWidth-400)/100) * 51.5 , left: europeWidth*0.63 + $( '#europe' ).position().left },

    '#romania' : {top: 214 + ((europeWidth-400)/100) * 53.55, left: europeWidth*0.6925 + $( '#europe' ).position().left },

    '#hungary' : {top: 219 + ((europeWidth-400)/100) * 55, left: europeWidth*0.59 + $( '#europe' ).position().left },

    '#bulgaria' : {top: 272 + ((europeWidth-400)/100) * 68, left: europeWidth*0.752 + $( '#europe' ).position().left },

    '#slovenia' : {top: 243 + ((europeWidth-400)/100) * 61, left: europeWidth*0.545 + $( '#europe' ).position().left },

    '#croatia' : {top: 242 + ((europeWidth-400)/100) * 60.7, left: europeWidth*0.541 + $( '#europe' ).position().left },
}


/**
 * Event listeners
 */
$( '#startBtn' ).click( function() {
    startGame()
})

$( '#demoBtn' ).click( function() {
    demo()
})


/**
 * Countries containers responsivity
 */
$( '#austria-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 234 + ((europeWidth-400)/100) * 59,
    left: europeWidth*0.55 + $( '#europe' ).position().left
})
$( '#czechia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 204 + ((europeWidth-400)/100) * 50,
    left: europeWidth*0.58 + $( '#europe' ).position().left
})
$( '#poland-container' ).css({
    width: europeWidth*0.175,
    height: europeWidth*0.1375,
    top: 154 + ((europeWidth-400)/100) * 40,
    left: europeWidth*0.6 + $( '#europe' ).position().left
})
$( '#slovakia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.05,
    top: 220 + ((europeWidth-400)/100) * 55,
    left: europeWidth*0.67 + $( '#europe' ).position().left
})
$( '#romania-container' ).css({
    width: europeWidth*0.125,
    height: europeWidth*0.1,
    top: 239 + ((europeWidth-400)/100) * 60,
    left: europeWidth*0.78 + $( '#europe' ).position().left
})
$( '#bulgaria-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 289 + ((europeWidth-400)/100) * 73,
    left: europeWidth*0.82 + $( '#europe' ).position().left
})
$( '#hungary-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.075,
    top: 234 + ((europeWidth-400)/100) * 62,
    left: europeWidth*0.67 + $( '#europe' ).position().left
})
$( '#croatia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.05,
    top: 269 + ((europeWidth-400)/100) * 67,
    left: europeWidth*0.6 + $( '#europe' ).position().left
})
$( '#slovenia-container' ).css({
    width: europeWidth*0.075,
    height: europeWidth*0.025,
    top: 264 + ((europeWidth-400)/100) * 65,
    left: europeWidth*0.56 + $( '#europe' ).position().left
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


/**
 * Takes country(objectSelector), country-container(targetSelector) and coordinates where should user drag the country (finalPos)
 * Makes target droppable and object draggable
 */
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
            if( uncomplete.length == 0 ) {
                endGame();
            }

            $( objectSelector ).css({
                position: 'absolute',
                left: finalPos.left + 'px',
                top: finalPos.top + 'px'
            })

        },
    });
}


/**
 * Gets called on end of the game
 */
function endGame() {
    clearInterval( interval )
}

/**
 * Called after startBtn click. Initiate dragability and starts timer
 */
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

/**
 * Put countries in their right spots automatically
 */
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