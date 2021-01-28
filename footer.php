<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package Wild_Gift
 */

?>

	<footer id="site-footer" class="site__footer">
		<div class="footer__inner">
			<div class="footer__content">
				<div class="footer__rule footer__rule__left"></div>
				<div class="footer__rule footer__rule__right"></div>
				<div class="footer__address">7000 Santa Monica Blvd. Suite A<br>
		  		Los Angeles, CA 90038<br>
					<a href="mailto:info@wildgift.com">info@wildgift.com</a>
				</div>
		  	<div class="footer__social">
		  		<ul>
		  			<!--<li><a href="https://facebook.com/wildgift" target="blank"><img src="<?php echo get_template_directory_uri(); ?>/img/icon_facebook.png"/></a></li>-->
		  			<li><a href="https://instagram.com/wildgiftcontent" target="blank"><img src="<?php echo get_template_directory_uri(); ?>/img/icon_instagram.png"/></a></li>
		  		</ul>
		  	</div>
			</div>
		</div>
	</footer><!-- #site-footer -->
</div><!-- #page -->
</div><!-- end -->
<?php wp_footer(); ?>

</body>
</html>
