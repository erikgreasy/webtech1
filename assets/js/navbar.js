class Navbar extends HTMLElement {

    submenuIndex = 0;
    navItems = [
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
                    url: 'info.html',
                },
                {
                    name: 'Hry',
                    url: '#',
                    children: [
                        {
                            name: 'Hra 1',
                            url: '/hra1.html'
                        },
                        {
                            name: 'Hra 2',
                            url: '/hra2.html',
                        }
                    ]
                }
            ]
        },
        {
            name: 'Kontakt',
            url: '/kontakt.html'
        }
    ];

    constructor() {
        super();

        const nav = document.createElement( 'nav' );
        nav.className += "navbar navbar-expand-sm bg-dark navbar-dark pt-2 pb-2";

        const brand = document.createElement( 'a' );
        brand.className += 'navbar-brand';
        brand.textContent = "Spoznaj";
        brand.setAttribute( 'href', '/' );

        const collapse = document.createElement( 'div' );
        collapse.className += "collapse navbar-collapse";


        // Creating calendar element
        const calendar = document.createElement( 'ul' );
        calendar.className = " navbar-nav ml-auto";
        
        const calendarLi = document.createElement( 'li' );
        calendarLi.className += " nav-item";
        calendarLi.setAttribute( 'id', 'showCalendar' );

        const calendarA = document.createElement( 'a' );
        calendarA.className += " nav-link";
        calendarA.setAttribute( 'href', '#' );
        calendarA.textContent = "Kalendár menín";

        calendarLi.appendChild( calendarA );
        calendar.appendChild( calendarLi );


        let ul = this.createNav();
        

        

        collapse.appendChild( ul );
        nav.appendChild( brand );
        nav.appendChild( collapse );
        nav.appendChild( calendar );
        document.querySelector( 'body' ).prepend( nav );
    }

    createSubmenu( items, parent ) {
        let submenuId = this.getSubmenuId();
        let submenu = document.createElement( 'ul' );
        
        submenu.className += "dropdown-menu";
        submenu.setAttribute( 'aria-labelledy', submenuId );
        parent.querySelector( '.dropdown-toggle' ).setAttribute( 'id', submenuId );


        items.forEach( item => {
            let li = this.createNavItem( item, true );
            submenu.appendChild( li );
            if( item.children ) {
                this.createSubmenu( item.children, li );
            }
            return;
            
        } )
        parent.appendChild( submenu );
    

    }

    createNav() {
        const navItems = this.navItems;
        let navigation = document.createElement( 'ul' );
        navigation.className += " navbar-nav mr-auto";
        navItems.forEach( item => {
            let li = this.createNavItem( item );
            navigation.appendChild( li );

            if( item.children ) {
                li.setAttribute( 'data-toggle', 'dropdown' );
                li.setAttribute( 'aria-expanded', false );
                this.createSubmenu( item.children, li );
            }
            navigation.appendChild( li );
        });
        return navigation;
    }

    createNavItem( item, submenuItem = false ) {
        let li = document.createElement( 'li' );

        

        let a = document.createElement( 'a' );
        a.textContent = item.name;
        a.setAttribute( 'href', item.url );

        if( submenuItem ) {
            // create just a element
            li.className += "dropdown-item";
        } else {
            // create wrapper li element
            li.className += "nav-item";
            a.className += "nav-link";

        }

        if( item.children ) {
            if( submenuItem ) {
                li.className += " dropdown-submenu";

            } else {

                li.className += " dropdown";
            }
            a.className += " dropdown-toggle";
        }
        

        li.appendChild( a );

        return li;
    }


    getSubmenuId() {
        return 'submenu-' + this.submenuIndex++;
    }
}


// Define the new element
customElements.define('navbar-element', Navbar);