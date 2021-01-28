/**
 * File navigation.js.
 *
 * Handles toggling the navigation menu for small screens and enables TAB key
 * navigation support for dropdown menus.
 */
( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation don't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button don't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
    anime.remove('#primary-menu a');

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );

      var animation = anime.timeline({loop: false}).add({
        targets: '#primary-menu a',
        translateY: [0,100],
        opacity: [1,0],
        easing: "easeOutExpo",
        duration: 200,
      }).add({
        targets: '.menu-menu-container',
        height: ['100%','0%'],
        width: ['100%','0%'],
        opacity: [1,1],
        easing: "easeOutExpo",
        duration: 200,
        delay: 100
      });
      button.classList.remove( 'is-active' );
      siteNavigation.classList.remove( 'toggled' );
      document.body.classList.remove( 'menu-open' );
      jQuery('.bg-hoder').each(function() {
        jQuery(this).hide();
      });
		} else {
      jQuery('#primary-menu a').css('opacity', 0);
      button.setAttribute( 'aria-expanded', 'true' );
      button.classList.add( 'is-active' );
      siteNavigation.classList.add( 'toggled' );
      document.body.classList.add( 'menu-open' );
      anime.timeline({loop: false}).add({
        targets: '.menu-menu-container',
        height: ['0%','100%'],
        opacity: [1,1],
        width: ['0%','100%'],
        easing: "easeOutExpo",
        duration: 300
      }).add({
        targets: '#primary-menu a',
        translateY: [100,0],
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 700,
        delay: (el, i) => 10 + 200 * i
      });
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
      button.classList.remove( 'is-active' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Get all the link elements with children within the menu.
	const linksWithChildren = menu.querySelectorAll( '.menu-item-has-children > a, .page_item_has_children > a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	// Toggle focus each time a menu link with children receive a touch event.
	for ( const link of linksWithChildren ) {
		link.addEventListener( 'touchstart', toggleFocus, false );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );
		}
	}
}() );
