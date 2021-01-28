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

	<div class="entry-content">
		<div class="content__inner">
			<div class="content__gutter"></div>
			<div class="content__content">
				<h3><?php the_title(); ?></h3>
				<?php
				the_content();
				?>
			</div>
		</div>
	</div><!-- .entry-content -->

		<footer class="entry-footer">
		</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
