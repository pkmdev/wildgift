<?php
/**
 * Template part for displaying page content in single.php
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Wild_Gift
 */

?>
<article id="post-<?php the_ID(); ?>" <?php post_class(''); ?>>

	<header class="entry-header">
		<div class="header__inner">
			<?php the_title( '<h1 class="header__title"><a data-local="1" href="/directors/">Directors</a> <span class="header__name">', '</span></h1>', !is_front_page() ); ?>
			<h4 class="header__subtitle"><span class="video__title"></span><span class="video__client"></span></h4>
		</div>
	</header><!-- .entry-header -->

	<div class="entry-content">
		<div class="content__inner">
			<div class="content__gutter"></div>
			<div class="content__content">
				<?php echo get_the_post_thumbnail( get_the_ID(),'full', array('class'=>'video__background')); ?>
				<?php
				the_content();
				?>
			</div>
		</div>
	</div><!-- .entry-content -->

		<footer class="entry-footer">
		</footer><!-- .entry-footer -->
</article><!-- #post-<?php the_ID(); ?> -->
