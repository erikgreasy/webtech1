
makeDroppable( '#czechia', '#czechia-container', {top: 240, left: 201})
makeDroppable( '#austria', '#austria-container' )
makeDroppable( '#poland', '#poland-container', {top: 191, left: 215} )
makeDroppable( '#slovakia', '#slovakia-container' )
makeDroppable( '#romania', '#romania-container' )
makeDroppable( '#hungary', '#hungary-container' )
makeDroppable( '#bulgaria', '#bulgaria-container' )
makeDroppable( '#slovenia', '#slovenia-container' )
makeDroppable( '#croatia', '#croatia-container' )






function makeDroppable( objectSelector, targetSelector, finalPos ) {
    $( objectSelector ).draggable();
    $( targetSelector ).droppable({
        accept: objectSelector,
        
        drop: function( event, ui ) {
            $( this ).addClass( "active" )

            alert( objectSelector + ' done' )
            $( objectSelector ).draggable('disable');
            $( objectSelector ).css({
                position: 'absolute',
                left: finalPos.left + 'px',
                top: finalPos.top + 'px'
            })
            console.log( $( this ).position() )

        },
        deactivate: function() {
            if( $( this ).hasClass( 'active' ) ) {

                //
            } else {
                console.log( 'si mimo' )

            }
        }
    });
}