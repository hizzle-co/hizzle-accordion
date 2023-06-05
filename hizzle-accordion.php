<?php
/**
 * Plugin Name:       Hizzle Accordion
 * Description:       Adds an accordion block.
 * Requires at least: 6.0
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Hizzle Team
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hizzle-accordion
 *
 * @package           hizzle-accordion
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function hizzle_accordion_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'hizzle_accordion_block_init' );
