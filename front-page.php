<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wild_Gift
 */

get_header();
?>
	<div id="logo-splash">
		<video autoplay muted playsinline>
			<source src="<?php echo get_template_directory_uri(); ?>/img/wild_gift_logo_3_normal_hold.mp4" />
		</video>
	</div>
	<main id="primary" class="site-main">

		<?php
		while ( have_posts() ) :
			the_post();

			get_template_part( 'template-parts/content', 'page' );


		endwhile; // End of the loop.
		?>

	</main><!-- #main -->

<?php

get_footer();
