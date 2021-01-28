<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Wild_Gift
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div> <!--Start -->
<div id="page" <?php body_class(); ?>>
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'wildgift' ); ?></a>

	<header id="masthead" class="site-header">
		<div class="masthead__inner">
			<div class="site-branding masthead__logo">
				<?php
				the_custom_logo();
				?>
			</div><!-- .site-branding -->

			<nav id="site-navigation" class="main-navigation masthead__navigation">
				<button class="hamburger hamburger--elastic menu-toggle" aria-controls="primary-menu" aria-expanded="false">
					<div class="hamburger-box">
			      <div class="hamburger-inner"></div>
			    </div>
				</button>
				<?php
				wp_nav_menu(
					array(
						'theme_location' => 'menu-1',
						'menu_id'        => 'primary-menu',
					)
				);
				?>
			</nav><!-- #site-navigation -->
		</div><!-- .masthead__inner -->
	</header><!-- #masthead -->
