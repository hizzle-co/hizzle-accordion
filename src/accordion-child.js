/**
 * WordPress dependencies.
 */
import {
	RichText,
	useBlockProps,
	InnerBlocks,
	__experimentalUseBorderProps as useBorderProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

/**
 * Internal dependencies
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Converts a heading to a slug.
 *
 * @param {string} heading The heading to convert.
 * @return {string} The slug.
 */
function headingToSlug( heading ) {
	return heading ? heading.toLowerCase().replace( /[^a-z0-9]+/g, '-' ).replace( /^-|-$/g, '' ) : '';
}

registerBlockType( 'hizzle/accordion-child', {
	apiVersion: 2,
	title: __( 'Accordion Child', 'hizzle-accordion' ),
	description: __( 'A child of the accordion.', 'hizzle-accordion' ),
	icon: 'button',
	category: 'design',
	parent: [ "hizzle/accordion" ],
	attributes: {
		heading: {
			type: 'string',
		},
		badge: {
			type: 'string',
		},
	},
	supports: {
		anchor: true,
		align: false,
		alignWide: false,
		color: {
			__experimentalSkipSerialization: true,
			gradients: true,
			__experimentalDefaultControls: {
				background: true,
				text: true
			}
		},
		typography: {
			fontSize: true,
			lineHeight: true,
			__experimentalFontFamily: true,
			__experimentalFontWeight: true,
			__experimentalFontStyle: true,
			__experimentalTextTransform: true,
			__experimentalTextDecoration: true,
			__experimentalLetterSpacing: true,
			__experimentalDefaultControls: {
				fontSize: true
			}
		},
		reusable: false,
		spacing: {
			__experimentalSkipSerialization: true,
			padding: [ 'horizontal', 'vertical' ],
			__experimentalDefaultControls: {
				padding: true
			}
		},
		__experimentalBorder: {
			color: true,
			radius: true,
			style: true,
			__experimentalSkipSerialization: true,
			__experimentalDefaultControls: {
				color: true,
				radius: true,
				style: true
			}
		},
	},
	edit: ( { attributes, setAttributes, isSelected, clientId } ) => {
		const { heading, badge } = attributes;

		const borderProps  = useBorderProps( attributes );
		const colorProps   = useColorProps( attributes );
		const spacingProps = useSpacingProps( attributes );
		const blockProps   = useBlockProps({
			style: { ...colorProps.style },
			className: colorProps.className,
		});

		const contentProps = {
			className: classnames( 'hizzle-accordion__panel-content', spacingProps.className ),
			id: `${headingToSlug( heading )}__content`,
		}

		const is_inner_block_selected = useSelect(
			( select ) => select( 'core/block-editor' ).hasSelectedInnerBlock( clientId, true )
		);

		return (
			<div { ...blockProps }>
				<h4 className={classnames( 'hizzle-accordion__heading', borderProps.className )} style={borderProps.style} aria-expanded={ isSelected || is_inner_block_selected } aria-controls={ `${headingToSlug( heading)}__content` }>
					<div className={classnames( 'hizzle-accordion__heading-button', spacingProps.className )} style={ spacingProps.style } type="button">

						<RichText
							aria-label={ __( 'Heading', 'hizzle-accordion' ) }
							placeholder={ __( 'Add heading…', 'hizzle-accordion' ) }
							value={ heading }
							onChange={ ( value ) => setAttributes( { heading: value } ) }
							identifier="heading"
							tagName="span"
							className="hizzle-accordion__heading-title"
						/>

						<RichText
							aria-label={ __( 'Badge', 'hizzle-accordion' ) }
							placeholder={ __( 'Add badge…', 'hizzle-accordion' ) }
							value={ badge }
							onChange={ ( value ) => setAttributes( { badge: value } ) }
							identifier="badge"
							tagName="code"
							withoutInteractiveFormatting
							className="hizzle-accordion__heading-badge"
						/>

						<span className="hizzle-accordion__heading-icon"></span>
					</div>
				</h4>

				<div className="hizzle-accordion__panel">
					<div {...contentProps}>
						<InnerBlocks template={ [ [ 'core/paragraph', {} ] ] }/>
					</div>
				</div>
			</div>
		);
	},
	save: ( { attributes } ) => {
		const { heading, badge } = attributes;

		const borderProps  = getBorderClassesAndStyles( attributes );
		const colorProps   = getColorClassesAndStyles( attributes );
		const spacingProps = getSpacingClassesAndStyles( attributes );
		const blockProps   = useBlockProps.save({
			style: { ...colorProps.style },
			className: colorProps.className,
		});

		const contentProps = {
			className: classnames( 'hizzle-accordion__panel-content', spacingProps.className ),
			style: spacingProps.style,
			id: `${headingToSlug( heading )}__content`,
		}

		return (
			<div { ...blockProps }>
				<h4 className={classnames( 'hizzle-accordion__heading', borderProps.className )} style={borderProps.style} aria-expanded="false" aria-controls={ `${headingToSlug( heading)}__content` }>
					<button style={spacingProps.style} className={classnames( 'hizzle-accordion__heading-button', spacingProps.className )} type="button">

						<RichText.Content
							tagName="span"
							className="hizzle-accordion__heading-title"
							value={ heading }
						/>

						{ badge && (
							<RichText.Content
								tagName="code"
								className="hizzle-accordion__heading-badge"
								value={ badge }
							/>
						) }

						<span className="hizzle-accordion__heading-icon"></span>
					</button>
				</h4>

				<div className="hizzle-accordion__panel">
					<div {...contentProps}>
						<InnerBlocks.Content />
					</div>
				</div>
			</div>
		);
	}
} );
