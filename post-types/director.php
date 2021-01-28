<?php

/**
 * Registers the `director` post type.
 */
function director_init() {
	register_post_type( 'director', array(
		'labels'                => array(
			'name'                  => __( 'Directors', 'wildgift' ),
			'singular_name'         => __( 'Director', 'wildgift' ),
			'all_items'             => __( 'All Directors', 'wildgift' ),
			'archives'              => __( 'Director Archives', 'wildgift' ),
			'attributes'            => __( 'Director Attributes', 'wildgift' ),
			'insert_into_item'      => __( 'Insert into Director', 'wildgift' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Director', 'wildgift' ),
			'featured_image'        => _x( 'Featured Image', 'director', 'wildgift' ),
			'set_featured_image'    => _x( 'Set featured image', 'director', 'wildgift' ),
			'remove_featured_image' => _x( 'Remove featured image', 'director', 'wildgift' ),
			'use_featured_image'    => _x( 'Use as featured image', 'director', 'wildgift' ),
			'filter_items_list'     => __( 'Filter Directors list', 'wildgift' ),
			'items_list_navigation' => __( 'Directors list navigation', 'wildgift' ),
			'items_list'            => __( 'Directors list', 'wildgift' ),
			'new_item'              => __( 'New Director', 'wildgift' ),
			'add_new'               => __( 'Add New', 'wildgift' ),
			'add_new_item'          => __( 'Add New Director', 'wildgift' ),
			'edit_item'             => __( 'Edit Director', 'wildgift' ),
			'view_item'             => __( 'View Director', 'wildgift' ),
			'view_items'            => __( 'View Directors', 'wildgift' ),
			'search_items'          => __( 'Search Directors', 'wildgift' ),
			'not_found'             => __( 'No Directors found', 'wildgift' ),
			'not_found_in_trash'    => __( 'No Directors found in trash', 'wildgift' ),
			'parent_item_colon'     => __( 'Parent Director:', 'wildgift' ),
			'menu_name'             => __( 'Directors', 'wildgift' ),
		),
		'public'                => true,
		'hierarchical'          => false,
		'show_ui'               => true,
		'show_in_nav_menus'     => true,
		'supports'              => array( 'title', 'editor','thumbnail' ),
		'has_archive'           => 'directors',
		'rewrite'               => true,
		'query_var'             => true,
		'menu_position'         => null,
		'menu_icon'             => 'dashicons-megaphone',
		'show_in_rest'          => true,
		'rest_base'             => 'director',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'template' => array(
        array( 'wildgift/project', array() ),
    ),
	) );

}
add_action( 'init', 'director_init' );

/**
 * Sets the post updated messages for the `director` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `director` post type.
 */
function director_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['director'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Director updated. <a target="_blank" href="%s">View Director</a>', 'wildgift' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'wildgift' ),
		3  => __( 'Custom field deleted.', 'wildgift' ),
		4  => __( 'Director updated.', 'wildgift' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Director restored to revision from %s', 'wildgift' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Director published. <a href="%s">View Director</a>', 'wildgift' ), esc_url( $permalink ) ),
		7  => __( 'Director saved.', 'wildgift' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Director submitted. <a target="_blank" href="%s">Preview Director</a>', 'wildgift' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Director scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Director</a>', 'wildgift' ),
		date_i18n( __( 'M j, Y @ G:i', 'wildgift' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Director draft updated. <a target="_blank" href="%s">Preview Director</a>', 'wildgift' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'director_updated_messages' );
