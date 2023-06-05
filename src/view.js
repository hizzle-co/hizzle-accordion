import './style.scss';

/**
 * Selects an element.
 *
 * @param {HTMLElement} el The element to start the search from.
 * @param {string} closest The selector to search for.
 * @param {function} cb The callback to run when the element is found.
 */
const closest = ( el, closest, cb ) => {
	const element = el.closest( closest );

	if ( element !== null ) {
		cb( element );
	}
};

/**
 * Closes all accordion children and opens 1.
 *
 * @param {HTMLElement} wrapper The wrapper element.
 * @param {HTMLElement} open The element to open.
 */
const openAccordion = ( wrapper, open ) => {
	const accordions = wrapper.querySelectorAll( '.hizzle-accordion__heading' );

	accordions.forEach( ( accordion ) => {
		const attribute = accordion === open ? 'true' : 'false';
		accordion.setAttribute( 'aria-expanded', attribute );
	} );
};

/**
 * Toggles an accordion.
 *
 * @param {HTMLElement} accordion The clicked accordion.
 */
const toggleAccordion = ( accordion ) => {
	const isOpening = accordion.getAttribute( 'aria-expanded' ) === 'false';

	if ( isOpening ) {
		closest( accordion, '.wp-block-hizzle-accordion', ( wrapper ) => {
			openAccordion( wrapper, accordion );
		} );
	} else {
		accordion.setAttribute( 'aria-expanded', 'false' );
	}
};

/**
 * Specify a function to execute when the DOM is fully loaded.
 *
 * @param {Callback} callback A function to execute after the DOM is ready.
 *
 * @return {void}
 */
function domReady( callback ) {
	if ( typeof document === 'undefined' ) {
		return;
	}

	if (
		document.readyState === 'complete' ||
		document.readyState === 'interactive'
	) {
		return void callback();
	}

	document.addEventListener( 'DOMContentLoaded', callback );
}

domReady( () => {
	// Init all accordions.
	const accordionButtons = document.querySelectorAll(
		'.hizzle-accordion__heading'
	);

	// Loop through each accordion.
	accordionButtons.forEach( ( button ) => {
		try {
			// Watch for clicks on the accordion button.
			button.addEventListener( 'click', ( event ) => {
				// Prevent default behavior.
				event.preventDefault();

				// Toggle the value of aria-expanded on the closest .hizzle-accordion__heading element.
				closest(
					button,
					'.hizzle-accordion__heading',
					toggleAccordion
				);
			} );
		} catch ( e ) {
			console.error( e );
		}
	} );

	// Loops through all accordion panels and sets the value of --hizzle-accordion-panel-max-height css var to scrollHeight.
	const resizeAccordionPanels = () => {
		const accordionPanels = document.querySelectorAll(
			'.hizzle-accordion__panel'
		);

		accordionPanels.forEach( ( panel ) => {
			panel.style.setProperty(
				'--hizzle-accordion-panel-max-height',
				panel.scrollHeight + 'px'
			);
		} );
	};

	// Resize accordion panels on load.
	resizeAccordionPanels();

	// Resize accordion panels on resize.
	window.addEventListener( 'resize', resizeAccordionPanels );
} );
