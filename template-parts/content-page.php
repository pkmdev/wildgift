<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wild_Gift
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

	<header class="entry-header">
		<div class="header__inner">
			<?php the_title( '<h1 class="header__title">', '</h1>', !is_front_page() ); ?>
		</div>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<div class="content__inner">
			<div class="content__gutter"></div>
			<div class="content__content">
				<?php
				the_content();
				?>
			</div>
		</div>
	</div><!-- .entry-content -->

		<footer class="entry-footer">
		</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
