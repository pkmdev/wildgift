<?php
/**
 * Functions to register client-side assets (scripts and stylesheets) for the
 * Gutenberg block.
 *
 * @package wildgift
 */

/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function wildgift_block_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}
	$dir = get_template_directory() . '/blocks';

	$index_js = 'wildgift/build/index.js';
	wp_register_script(
		'wildgift-block-editor',
		get_template_directory_uri() . "/blocks/$index_js",
		array(
			'wp-editor',
			'wp-blocks',
			'wp-i18n',
			'wp-element',
			'wp-data',
			'wp-block-editor'
		),
		filemtime( "$dir/$index_js" )
	);

	$editor_css = 'wildgift/build/index.css';
	if (is_admin()) {
		wp_register_style(
			'wildgift-block-editor',
			get_template_directory_uri() . "/blocks/$editor_css",
			array(),
			filemtime( "$dir/$editor_css" )
		);
	}

	$style_css = 'wildgift/build/style-index.css';
	wp_register_style(
		'wildgift-block',
		get_template_directory_uri() . "/blocks/$style_css",
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type( 'wildgift/wildgift', array(
		'editor_script' => 'wildgift-block-editor',
		'editor_style'  => 'wildgift-block-editor',
		'style'         => 'wildgift-block',
	) );

	register_block_type( 'wildgift/inner-project', array(
			'attributes'      => array(
				'id'    => array(
					 'type'      => 'number'
				),
				'client'    => array(
					 'type'      => 'string'
				),
				'title'    => array(
					 'type'      => 'string'
				),
				'link'    => array(
					 'type'      => 'string'
				),
				'vimeo'    => array(
					 'type'      => 'string'
				),
				'image'    => array(
					 'type'      => 'number'
				),
				'director'    => array(
					 'type'      => 'number'
				),
			),
			'render_callback' => 'wg_inner_project_dynamic_render_callback'
		) );
}
add_action( 'init', 'wildgift_block_init' );

function wg_inner_project_dynamic_render_callback( $attributes, $content ) {
	ob_start();	?>
	<div class= "project__inner">
		<a class = "project__inner__video"
			href = "<?php echo (isset($attributes['client']) ? $attributes['link'] : ''); ?>"
			data-vimeo="<?php echo (isset($attributes['vimeo']) ? $attributes['vimeo'] : ''); ?>"
			data-client="<?php echo (isset($attributes['client']) ? $attributes['client'] : ''); ?>"
			data-title="<?php echo (isset($attributes['title']) ? $attributes['title'] : ''); ?>"
		>
			<img class="project__inner__video__content" src="<?php echo wp_get_attachment_image_src($attributes['image'], 'medium', false)[0]; ?>" />
		</a>
	</div>

	<?php
	$output = ob_get_contents();
	ob_end_clean();
	return $output;
}
