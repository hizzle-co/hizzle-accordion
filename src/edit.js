/**
 * WordPress dependencies.
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	__experimentalUseColorProps as useColorProps,
	__experimentalGetSpacingClassesAndStyles as useSpacingProps,
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';

// Template.
const template = [
	[ 'hizzle/accordion-child', {} ],
	[ 'hizzle/accordion-child', {} ],
	[ 'hizzle/accordion-child', {} ],
];
const allowedBlocks = [ 'hizzle/accordion-child' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes } ) {
	const colorProps = useColorProps( attributes );
	const spacingProps = useSpacingProps( attributes );

	// Prepare innner blocks.
	const props = useInnerBlocksProps(
		useBlockProps( {
			style: { ...colorProps.style, ...spacingProps.style },
			className: classnames(
				colorProps.className,
				spacingProps.className
			),
		} ),
		{
			allowedBlocks,
			template,
		}
	);

	return <div { ...props } />;
}
