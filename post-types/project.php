<?php

/**
 * Registers the `project` post type.
 */
function project_init() {
	register_post_type( 'project', array(
		'labels'                => array(
			'name'                  => __( 'Projects', 'wildgift' ),
			'singular_name'         => __( 'Project', 'wildgift' ),
			'all_items'             => __( 'All Projects', 'wildgift' ),
			'archives'              => __( 'Project Archives', 'wildgift' ),
			'attributes'            => __( 'Project Attributes', 'wildgift' ),
			'insert_into_item'      => __( 'Insert into Project', 'wildgift' ),
			'uploaded_to_this_item' => __( 'Uploaded to this Project', 'wildgift' ),
			'featured_image'        => _x( 'Featured Image', 'project', 'wildgift' ),
			'set_featured_image'    => _x( 'Set featured image', 'project', 'wildgift' ),
			'remove_featured_image' => _x( 'Remove featured image', 'project', 'wildgift' ),
			'use_featured_image'    => _x( 'Use as featured image', 'project', 'wildgift' ),
			'filter_items_list'     => __( 'Filter Projects list', 'wildgift' ),
			'items_list_navigation' => __( 'Projects list navigation', 'wildgift' ),
			'items_list'            => __( 'Projects list', 'wildgift' ),
			'new_item'              => __( 'New Project', 'wildgift' ),
			'add_new'               => __( 'Add New', 'wildgift' ),
			'add_new_item'          => __( 'Add New Project', 'wildgift' ),
			'edit_item'             => __( 'Edit Project', 'wildgift' ),
			'view_item'             => __( 'View Project', 'wildgift' ),
			'view_items'            => __( 'View Projects', 'wildgift' ),
			'search_items'          => __( 'Search Projects', 'wildgift' ),
			'not_found'             => __( 'No Projects found', 'wildgift' ),
			'not_found_in_trash'    => __( 'No Projects found in trash', 'wildgift' ),
			'parent_item_colon'     => __( 'Parent Project:', 'wildgift' ),
			'menu_name'             => __( 'Projects', 'wildgift' ),
		),
		'public'                => true,
		'hierarchical'          => true,
		'show_ui'               => true,
		'show_in_nav_menus'     => true,
		'supports'              => array( 'title', 'thumbnail','page-attributes'),
		'has_archive'           => 'projects',
		'rewrite'               => array( "slug" => "director/%director_name%/video/%client_name%", "with_front" => true ),
		'query_var'             => true,
		'menu_position'         => null,
		'menu_icon'             => 'dashicons-video-alt',
		'show_in_rest'          => true,
		'rest_base'             => 'project',
		'rest_controller_class' => 'WP_REST_Posts_Controller',
		'register_meta_box_cb' => 'wg_add_project_metabox',
	) );

}
add_action( 'init', 'project_init' );

add_action( 'init', function() {
    add_rewrite_endpoint('video', EP_ALL);
});

add_filter( 'post_type_link', function( $link, $post ) {
    if ( 'project' == get_post_type( $post ) ) {
				$client = get_post_meta( $post->ID, '_client', true );
				$director_id = get_post_meta( $post->ID, '_director', true );
				$director = get_post($director_id);
				$name = isset($director) ? $director->post_name : 'none';

				$link = str_replace( '%director_name%', $name, $link );
				$link = str_replace( '%client_name%', sanitize_title($client), $link );

    }
    return $link;
}, 10, 2 );

/**
 * Sets the post updated messages for the `project` post type.
 *
 * @param  array $messages Post updated messages.
 * @return array Messages for the `project` post type.
 */
function project_updated_messages( $messages ) {
	global $post;

	$permalink = get_permalink( $post );

	$messages['project'] = array(
		0  => '', // Unused. Messages start at index 1.
		/* translators: %s: post permalink */
		1  => sprintf( __( 'Project updated. <a target="_blank" href="%s">View Project</a>', 'wildgift' ), esc_url( $permalink ) ),
		2  => __( 'Custom field updated.', 'wildgift' ),
		3  => __( 'Custom field deleted.', 'wildgift' ),
		4  => __( 'Project updated.', 'wildgift' ),
		/* translators: %s: date and time of the revision */
		5  => isset( $_GET['revision'] ) ? sprintf( __( 'Project restored to revision from %s', 'wildgift' ), wp_post_revision_title( (int) $_GET['revision'], false ) ) : false,
		/* translators: %s: post permalink */
		6  => sprintf( __( 'Project published. <a href="%s">View Project</a>', 'wildgift' ), esc_url( $permalink ) ),
		7  => __( 'Project saved.', 'wildgift' ),
		/* translators: %s: post permalink */
		8  => sprintf( __( 'Project submitted. <a target="_blank" href="%s">Preview Project</a>', 'wildgift' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
		/* translators: 1: Publish box date format, see https://secure.php.net/date 2: Post permalink */
		9  => sprintf( __( 'Project scheduled for: <strong>%1$s</strong>. <a target="_blank" href="%2$s">Preview Project</a>', 'wildgift' ),
		date_i18n( __( 'M j, Y @ G:i', 'wildgift' ), strtotime( $post->post_date ) ), esc_url( $permalink ) ),
		/* translators: %s: post permalink */
		10 => sprintf( __( 'Project draft updated. <a target="_blank" href="%s">Preview Project</a>', 'wildgift' ), esc_url( add_query_arg( 'preview', 'true', $permalink ) ) ),
	);

	return $messages;
}
add_filter( 'post_updated_messages', 'project_updated_messages' );


function wg_add_project_metabox() {
	add_meta_box(
		'wg_project_metabox',
		'Project Information',
		'wg_project_metabox',
		'project',
		'normal',
		'high'
	);
}

function wg_project_metabox() {
	global $post;

	// Nonce field to validate form request came from current site
	wp_nonce_field( basename( __FILE__ ), 'wg_project_fields' );

	$client = get_post_meta( $post->ID, '_client', true );
	$vimeo = get_post_meta( $post->ID, '_vimeo', true );
	$director = get_post_meta( $post->ID, '_director', true ) ? get_post_meta( $post->ID, '_director', true ) : (isset($_GET['director']) ? $_GET['director'] : 0) ;

	echo '<h2>Director</h2>';
	generate_post_select('director', 'director', $director);
	if ('publish' === get_post_status( $post->ID )) {
		echo '<a class="button" target="_blank" href="/wp-admin/post.php?post='.$director.'&action=edit">Edit Director</a>';
	}

	// Output the field
	echo '<h2>Client</h2>';
	echo '<input type="text" name="client" value="' . esc_textarea( $client )  . '" class="widefat">';


	echo '<h2>Vimeo Link/ID</h2>';
	echo '<input id="project-vimeo-link" required type="text" name="vimeo" value="' . esc_textarea( $vimeo )  . '" class="widefat">';
	echo '<img id="vimeo-thumbnail" src="'.get_the_post_thumbnail_url($post->ID,'large').'"/>';
	echo '<input type="hidden" name="thumbnail" id="vimeo-image-url" />';
}

function wg_save_project_meta( $post_id, $post ) {

	// Return if the user doesn't have edit permissions.
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return $post_id;
	}

	if ( ! isset( $_POST['vimeo'] ) || ! wp_verify_nonce( $_POST['wg_project_fields'], basename(__FILE__) ) ) {
		return $post_id;
	}

	$client = isset($_POST['client']) ? esc_textarea( $_POST['client'] ) : false;
	$vimeo = isset($_POST['vimeo'])  ? esc_textarea($_POST['vimeo']) : false;
	$director = isset($_POST['director'])  ? intval($_POST['director']) : false;

	if (!has_post_thumbnail()) {
		$image_url = $_POST['thumbnail'];
		$upload_dir = wp_upload_dir();
		$image_data = file_get_contents($image_url);
		$filename = basename($image_url);
		if(wp_mkdir_p($upload_dir['path']))
		    $file = $upload_dir['path'] . '/' . $filename;
		else
		    $file = $upload_dir['basedir'] . '/' . $filename;
		file_put_contents($file, $image_data);

		$wp_filetype = wp_check_filetype($filename, null );
		$attachment = array(
		    'post_mime_type' => $wp_filetype['type'],
		    'post_title' => sanitize_file_name($filename),
		    'post_content' => '',
		    'post_status' => 'inherit'
		);
		$attach_id = wp_insert_attachment( $attachment, $file, $post_ID );
		require_once(ABSPATH . 'wp-admin/includes/image.php');
		$attach_data = wp_generate_attachment_metadata( $attach_id, $file );
		wp_update_attachment_metadata( $attach_id, $attach_data );

		set_post_thumbnail( $post_id, $attach_id );
	}

	update_post_meta($post_id, '_client', $client);
	update_post_meta($post_id, '_vimeo', $vimeo);
	update_post_meta($post_id, '_director', $director);

}
add_action( 'save_post', 'wg_save_project_meta', 1, 2 );

function generate_post_select($select_id, $post_type, $selected = 0) {
    $post_type_object = get_post_type_object($post_type);
    $label = $post_type_object->label;
    $posts = get_posts(array('post_type'=> $post_type, 'post_status'=> array('publish','draft'), 'suppress_filters' => false, 'posts_per_page'=>-1));
    echo '<select name="'. $select_id .'" id="'.$select_id.'">';
    echo '<option disabled="disabled"', $selected == 0 ? ' selected="selected"' : '', ' value = "" >Select '.$label.' </option>';
    foreach ($posts as $post) {
        echo '<option value="', $post->ID, '"', $selected == $post->ID ? ' selected="selected"' : '', '>', $post->post_title, '</option>';
    }
    echo '</select>';
}

add_filter( 'rest_project_query', function( $args, $request ){
    if ( $meta_key = $request->get_param( 'metaKey' ) ) {
        $args['meta_key'] = $meta_key;
        $args['meta_value'] = $request->get_param( 'metaValue' );
    }
    return $args;
}, 10, 2 );

function project_register_post_meta() {

		register_meta('post', '_client', array(
			'object_subtype' => 'project',
	    'show_in_rest' => true,
	    'type' => 'string',
	    'single' => true,
	    'sanitize_callback' => 'sanitize_text_field',
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
		register_meta('post', '_vimeo', array(
			'object_subtype' => 'project',
	    'show_in_rest' => true,
	    'type' => 'string',
	    'single' => true,
	    'sanitize_callback' => 'sanitize_text_field',
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
	  	register_meta('post', '_director', array(
			'object_subtype' => 'project',
	    'show_in_rest' => true,
	    'type' => 'string',
	    'single' => true,
	    'sanitize_callback' => 'sanitize_text_field',
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
		register_meta('post', '_hidden', array(
			'object_subtype' => 'project',
	    'show_in_rest' => true,
	    'type' => 'boolean',
	    'single' => true,
	    'auth_callback' => function() {
	      return current_user_can('edit_posts');
	    }
	  ));
}
add_action( 'init', 'project_register_post_meta' );

function add_custom_field() {
    register_rest_field( 'project',
        '_client',
        array(
            'get_callback'  => 'rest_get_post_field',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
		register_rest_field( 'project',
        '_director',
        array(
            'get_callback'  => 'rest_get_post_field',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
		register_rest_field( 'project',
        '_vimeo',
        array(
            'get_callback'  => 'rest_get_post_field',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
		register_rest_field( 'project',
        '_hidden',
        array(
            'get_callback'  => 'rest_get_post_field',
            'update_callback'   => null,
            'schema'            => null,
        )
    );
}
add_action( 'rest_api_init', 'add_custom_field' );

function rest_get_post_field( $post, $field_name, $request ) {
    return get_post_meta( $post[ 'id' ], $field_name, true );
}
