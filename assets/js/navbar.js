class Navbar extends HTMLElement {

    

    constructor() {
        super();

        let navItems = [
            {
                name: 'Domov',
                url: '/',
            },
            {
                name: 'Spoznávaj',
                url: '#',
                children: [
                    {
                        name: 'Info',
                        url: '#',
                    },
                    {
                        name: 'Hry',
                        url: '#',
                        children: [
                            {
                                name: 'Hra 1',
                                url: '#'
                            },
                            {
                                name: 'Hra 2',
                                url: '#',
                            }
                        ]
                    }
                ]
            },
            {
                name: 'Kontakt',
                url: '/kontakt.html'
            }
        ]

        const nav = document.createElement( 'nav' );
        nav.className += "navbar navbar-expand-sm bg-dark navbar-dark pt-2 pb-2";

        const brand = document.createElement( 'a' );
        brand.className += 'navbar-brand';
        brand.textContent = "Spoznaj";
        brand.setAttribute( 'href', '/' );

        const collapse = document.createElement( 'div' );
        collapse.className += "collapse navbar-collapse";

        


        let ul = this.createNav(navItems);
        

        

        collapse.appendChild( ul );
        nav.appendChild( brand );
        nav.appendChild( collapse );
        
        document.querySelector( 'body' ).prepend( nav );
        console.log( nav );
    }

    createSubmenu( items, parent ) {
        let submenu = document.createElement( 'ul' );
        submenu.className += "submenu";
        items.forEach( item => {
            let li = this.createNavItem( item );
            submenu.appendChild( li );
            if( item.children ) {
                this.createSubmenu( item.children, li );
            }
            return;
            
        } )
        parent.appendChild( submenu );
    

    }

    createNav( navItems ) {
        let navigation = document.createElement( 'ul' );
        navItems.forEach( item => {
            let li = this.createNavItem( item );
            navigation.appendChild( li );

            if( item.children ) {
                this.createSubmenu( item.children, li );
            }
            navigation.appendChild( li );
        });
        return navigation;
    }

    createNavItem( item ) {
        let li = document.createElement( 'li' );
        li.className += "nav-item";

        let a = document.createElement( 'a' );
        a.className += "nav-link";
        a.textContent = item.name;
        a.setAttribute( 'href', item.url );

        

        li.appendChild( a );

        return li;
    }
}


// Define the new element
customElements.define('navbar-element', Navbar);