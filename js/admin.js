
jQuery( document ).ready(function( $) {

		$(document).on("click", ".menu__button__select__image", function (e) {
			console.log('click');
			 e.preventDefault();
			 var button = $(this);
			 var menuid = $(this).data('id');

	     console.log(wp);
			 // Create the media frame.
			 var file_frame = wp.media({
					title: 'Select or upload image',
					button: {
						 text: 'Select'
					},
					multiple: false  // Set to true to allow multiple files to be selected
			 });

			 // When an image is selected, run a callback.
			 file_frame.on('select', function () {
					// We set multiple to false so only get one image from the uploader

					var attachment = file_frame.state().get('selection').first().toJSON();

				  console.log(attachment);
					var data = {
						'action': 'wildgift_menu_bg_image',
						'menuid': menuid,
						'mediaid': attachment.id
					};
					// We can also pass the url value separately from ajaxurl for front end AJAX implementations
					jQuery.post(ajaxurl, data, function(response) {
						button.next('img').remove();
						button.after(response);
					});

			 });

			 // Finally, open the modal
			 file_frame.open();
		});

		$('#project-vimeo-link').change(function() {
				var val = $(this).val();
				var id = val.replace("https://vimeo.com/", "");
				id = id.replace("http://vimeo.com/", "");
				vimeoGetThumb(id, $(this));
		})

})

function vimeoGetThumb(id, target = false){
		var request = jQuery.ajax({
			 type:'GET',
			 url: 'https://vimeo.com/api/v2/video/' + id + '.json',
			 success: function(data){
					 var thumbnail_src = data[0].thumbnail_large;
					 if (target) {
						 jQuery('#vimeo-thumbnail').attr('src', thumbnail_src);
						 jQuery('#vimeo-image-url').val(thumbnail_src);
	 				 }
			 },
			 error:function (xhr, ajaxOptions, thrownError){
				    if(xhr.status==404) {
				        alert('Invalid ID or URL, Error: ' + thrownError);
				    }
				}
	 });
}
