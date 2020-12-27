class Navbar extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        const shadow = this.attachShadow({mode: 'open'}); // sets and returns 'this.shadowRoot'
        const nav = document.createElement( 'nav' );
        nav.className += "navbar navbar-expand-sm bg-dark navbar-dark pt-2 pb-2";

        const collapse = document.createElement( 'div' );
        collapse.className += "collapse navbar-collapse";

        const ul = document.createElement( 'ul' );
        ul.className += "navbar-nav mr-auto";

        const li = document.createElement( 'li' );
        li.textContent = "ahoj";

        ul.appendChild( li );
        collapse.appendChild( ul );
        nav.appendChild( collapse );

        console.log( nav )
    }
}


// Define the new element
customElements.define('navbar-element', Navbar);