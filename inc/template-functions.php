<?php
/**
 * Functions which enhance the theme by hooking into WordPress
 *
 * @package Wild_Gift
 */

/**
 * Adds custom classes to the array of body classes.
 *
 * @param array $classes Classes for the body element.
 * @return array
 */
function wildgift_body_classes( $classes ) {
	// Adds a class of hfeed to non-singular pages.
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}

	// Adds a class of no-sidebar when there is no sidebar present.
	if ( ! is_active_sidebar( 'sidebar-1' ) ) {
		$classes[] = 'no-sidebar';
	}
	global $post;
	if ( isset( $post ) ) {
		$classes[] = $post->post_type . '-' . $post->post_name;
	}

	return $classes;
}
add_filter( 'body_class', 'wildgift_body_classes' );

/**
 * Add a pingback url auto-discovery header for single posts, pages, or attachments.
 */
function wildgift_pingback_header() {
	if ( is_singular() && pings_open() ) {
		printf( '<link rel="pingback" href="%s">', esc_url( get_bloginfo( 'pingback_url' ) ) );
	}
}
add_action( 'wp_head', 'wildgift_pingback_header' );

add_filter( 'nav_menu_link_attributes', 'wildgift_menu_atts', 10, 3 );

function wildgift_menu_atts( $atts, $item, $args ) {
	$imageid = get_option('menu_'.$item->ID.'_image');
  $atts['data-bgimg'] = wp_get_attachment_url($imageid);
	$atts['data-id'] = $item->ID;
	$atts['data-local'] = true;
	$atts['data-ismenu'] = true;

  return $atts;
}

function wildgift_menu_image_field($item_id) {
    echo '<a class="button menu__button__select__image" data-id="'.$item_id.'">Select Background Image</a>';
		echo wp_get_attachment_image(get_option('menu_'.$item_id.'_image'), 'medium');
}

add_action( 'wp_nav_menu_item_custom_fields', 'wildgift_menu_image_field' );

function wildgift_menu_bg_image() {
	global $wpdb;
	$menuid = intval($_POST['menuid']);
	$image = intval($_POST['mediaid']);

	update_option('menu_'.$menuid.'_image', $image);

	echo wp_get_attachment_image($image, 'medium');

	wp_die();
}

add_action( 'wp_ajax_wildgift_menu_bg_image', 'wildgift_menu_bg_image' );


function directors_custom_number_of_posts( $query ) {
    if ( is_admin() || ! $query->is_main_query() )
        return;

    if ( is_post_type_archive( 'director' ) ) {
        // Display 48 posts for a custom post type called 'galleries'
        $query->set( 'posts_per_page', -1 );
        return;
    }
}
add_action( 'pre_get_posts', 'directors_custom_number_of_posts', 1 );
