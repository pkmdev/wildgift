<div class="item__container">
  <a href="<?php the_permalink(); ?>" data-local=1 data-isdirector=1>
    <div class="item__content">
      <h2 class="item__title" ><?php the_title(); ?></h2>
      <h4 class="item__cta">See Work</h4>
    </div>
    <div class="item__image" style="background-image:url('<?php echo get_the_post_thumbnail_url( $post, 'full' ); ?>')"></div>
  </a>
</div>
