/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	InnerBlocks,
	__experimentalGetBorderClassesAndStyles as getBorderClassesAndStyles,
	__experimentalGetColorClassesAndStyles as getColorClassesAndStyles,
	__experimentalGetSpacingClassesAndStyles as getSpacingClassesAndStyles,
} from '@wordpress/block-editor';
import classnames from 'classnames';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( {attributes} ) {

	const borderProps  = getBorderClassesAndStyles( attributes );
	const colorProps   = getColorClassesAndStyles( attributes );
	const spacingProps = getSpacingClassesAndStyles( attributes );

	const props = useBlockProps.save({
		style: { ...colorProps.style, ...borderProps.style, ...spacingProps.style },
		className: classnames( colorProps.className, borderProps.className, spacingProps.className ),
	});

	return (
		<div { ...props }>
			<InnerBlocks.Content />
		</div>
	);
}
