class Navbar extends HTMLElement {

    // variable for creating HTML ids
    submenuIndex = 0;

    // Navigation array
    navItems = [
        {
            name: 'Domov',
            url: '/',
        },
        {
            name: 'Checklist',
            url: '/checklist.html',
        },
        {
            name: 'Spoznávaj',
            url: '#',
            children: [
                {
                    name: 'Kontinenty',
                    url: '/continents_info.html',
                },
                {
                    name: 'Hry',
                    url: '#',
                    children: [
                        {
                            name: 'Spoznaj kontinenty',
                            url: '/_rk/continents_game.html'
                        },
                        {
                            name: 'Spoznaj Európu',
                            url: '/_em/europe.html'
                        },
                        {
                            name: 'Spoznaj Slovensko',
                            url: '/_rb/roman_game.html',
                        },
                        {
                            name: 'Spoznaj Bratislavu',
                            url: '/_ml/bratislava.html'
                        },
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

        // create navigation
        const nav = document.createElement( 'nav' );
        nav.className += "navbar navbar-expand-md bg-dark navbar-dark pt-2 pb-2";

        // create navbar brand
        const brand = document.createElement( 'a' );
        brand.className += 'navbar-brand';
        brand.textContent = "Spoznaj";
        brand.setAttribute( 'href', '/' );

        // create navbar toggler
        const toggler = document.createElement( 'button' );
        toggler.className += " navbar-toggler";
        toggler.setAttribute( 'data-toggle', 'collapse' );
        toggler.setAttribute( 'data-target', '#top-navbar' );
        const togglerIcon = document.createElement( 'span' );
        togglerIcon.className += " navbar-toggler-icon";
        toggler.appendChild( togglerIcon );

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

        // create collapsing wrapper
        const collapse = document.createElement( 'div' );
        collapse.className += "collapse navbar-collapse";
        collapse.setAttribute( 'id', 'top-navbar' );

        // generate navigation list
        let ul = this.createNav();

        collapse.appendChild( ul );
        collapse.appendChild( calendar );

        nav.appendChild( brand );
        nav.appendChild( toggler );
        nav.appendChild( collapse );
        document.querySelector( 'body' ).prepend( nav );
    }


    /**
     * Generates the main navigation list (items and links)
     */
    createNav() {
        const navItems = this.navItems;
        let navigation = document.createElement( 'ul' );
        navigation.className += " navbar-nav mr-auto";
        navItems.forEach( item => {
            let li = this.createNavItem( item );
            navigation.appendChild( li );

            if( item.children ) {
                li.querySelector('a').setAttribute( 'data-toggle', 'dropdown' );
                li.setAttribute( 'aria-expanded', false );
                this.createSubmenu( item.children, li );
            }
            navigation.appendChild( li );
        });
        return navigation;
    }


    /**
     * Creates submenu HTML with items that belong to parent.
     * Called itself recursively if any of items has children.
     */
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
    

    /**
     * Create HTML nav item. Works for 1st level nav item, and also submenu items based on condition.
     */
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

    /**
     * Returns unique submenu HTML id
     */
    getSubmenuId() {
        return 'submenu-' + this.submenuIndex++;
    }
}


// Define the new element
customElements.define('navbar-element', Navbar);