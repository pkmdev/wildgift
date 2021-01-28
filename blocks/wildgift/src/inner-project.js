import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, Button, DateTimePicker, TextControl, Tooltip, Panel, PanelBody, PanelRow, FormToggle, SelectControl, FocalPointPicker, ColorPalette, AnglePickerControl, RangeControl, Modal} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {withSelect, withDispatch, useSelect} from '@wordpress/data';

function ImageItem( { id } ) {
  if (id == 0 || typeof id != 'number') return false;
  const image = useSelect( ( select ) => {
    return select( 'core' ).getMedia( id )
  }, [ id ] );
  return image ? <img src={image.source_url} /> : false
}

export const name = 'inner-project';

export const settings = {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Project' ), // Block title.
  parent: [ 'wildgift/project' ],
	icon: 'video-alt', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'WildGift' ),
		__( 'Project' ),
    __( 'Inner Block' ),
	],
  attributes: {
      id: {
        type: 'number',
        default: ''
      },
      client: {
        type: 'string',
        default: ''
      },
      title: {
        type: 'string',
        default: ''
      },
      link: {
        type: 'string',
        default: ''
      },
      image: {
        type: 'number',
        default: 0
      },
      vimeo: {
        type: 'string',
        default: ''
      },
      director: {
        type: 'number',
        default: 0
      },
    },
    edit: withSelect( ( select, blockData ) => {
       return {
         imagesrc: select( 'core' ).getMedia( blockData.attributes.image )
       };
     } )( ( props ) => {

        let id = props.attributes.id;
        let client = props.attributes.client;
        let director = props.attributes.director;
        let title = props.attributes.title;
        let image = props.attributes.image;

        function onChangeHide ( content ) {
            props.setAttributes({hide: ! hide})
        }

        return [
          <div className={ props.className }>
            <ImageItem id={image} />
            <h2>{client}</h2>
            <h3>{title}</h3>
            <Button
    					className={'button'}
    					onClick={ function() {
    						window.open( "/wp-admin/post.php?action=edit&post="+id);
    					} } >
    					Edit Video
    				</Button>
          </div>
        ];
    }),
    save: ( props ) => null,
}
