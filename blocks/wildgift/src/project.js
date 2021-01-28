import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, Button, DateTimePicker, TextControl, Tooltip, Panel, PanelBody, PanelRow, FormToggle, SelectControl, FocalPointPicker, ColorPalette, AnglePickerControl, RangeControl, Modal} from '@wordpress/components';
import { useState } from '@wordpress/element';
import {withSelect, withDispatch, useSelect} from '@wordpress/data';
import { source, createBlock } from '@wordpress/blocks';

export const name = 'project';

export const settings = {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Projects', 'wildgift' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Projects block for WildGift Director pages',
		'wildgift'
	),

	/**
	 * Blocks are grouped into categories to help users browse and discover them.
	 * The categories provided by core are `common`, `embed`, `formatting`, `layout` and `widgets`.
	 */
	category: 'common',

	/**
	 * An icon property should be specified to make it easier to identify a block.
	 * These can be any of WordPress’ Dashicons, or a custom svg element.
	 */
	icon: 'portfolio',

	/**
	 * Optional block extended support features.
	 */
	supports: {
		// Removes support for an HTML mode.
		html: false,
	},
	attributes: {
    template: {
      type: 'array',
      default: []
    },
    order: {
      type: 'array',
      default: []
    },
    count: {
      type: 'number',
      default: 0
    },
		text: {
			type: 'string',
			default: ''
		},
  },

  edit: withSelect( ( select, blockData ) => {
		 let blocks = wp.data.select( 'core/block-editor' ).getBlocks( blockData.clientId );
		 let postid = wp.data.select("core/editor").getCurrentPostId();
		 let order = blocks.map( block => block.attributes.id );
		 let projects = wp.data.select('core').getEntityRecords( 'postType', 'project',{per_page: 100, metaKey: '_director', metaValue: postid});

		 return {
			 projects: projects,
			 order: order,
			 postid: postid
		 };
	 } )( ( props ) => {

		 let text = props.attributes.text;

 		 function onChangeText ( content ) {
 				 props.setAttributes({text: content})
 		 }

		 function refreshProjectList() {

       let projects = props.projects;
			 console.log(projects);
			 if (projects == null) return false;
       let blocks = wp.data.select( 'core/block-editor' ).getBlocks( props.clientId );
       const clientIds = blocks.map( block => block.clientId );
       //wp.data.dispatch('core/block-editor').removeBlocks(clientIds);
       var count = 0;
       var currentgroup = projects.filter(project => props.order.includes(project.id));
       var newgroup = projects.filter(project => !props.order.includes(project.id));
       currentgroup.sort(function(a, b){
         return props.order.indexOf(a.id) - props.order.indexOf(b.id);
       });
			 var template = props.attributes.template;
       var group = currentgroup.concat(newgroup);
       var newblocks = [];
       var neworder = [];

       if (group != null && group.length > 0) {
				 group.forEach(function(project) {
			     neworder.push(project.id);
			     let args = {
			       id: project.id,
			       title: project.title.rendered,
			       client: project._client,
			       director: project._director,
						 vimeo: project._vimeo,
			       image: project.featured_media,
						 link: project.link,
			     }
           template.push(['wildgift/inner-project', args]);
           const block = createBlock('wildgift/inner-project', args)
           newblocks.push(block)
           //wp.data.dispatch('core/block-editor').insertBlock(block, count, props.clientId);
           count++;
         })
       }
       wp.data.dispatch('core/block-editor').replaceInnerBlocks(props.clientId, newblocks);

       props.setAttributes({count: count})
     }

		// refreshProjectList()

		return [
      <div className={ props.className }>
				<div className={ 'projects__about' }>
					<RichText
							tagName="span"
							onChange={ onChangeText }
							value={ text }
							placeholder="About Text"
					/>
				</div>
				<Button
					className={'button'}
					onClick={ refreshProjectList }>
					Refresh Project List
				</Button>
				<Button
					className={'button'}
					onClick={ function() {
						window.open( "/wp-admin/post-new.php?post_type=project&director="+props.postid);
					} } >
					Add New Project
				</Button>
				<div className={'projects__inner'}>
					<InnerBlocks templateLock={'insert'} allowedBlocks={['oae/inner-project']} />
				</div>
  		</div>
		];
	}),

	save: ( props ) => {
		return (
 			<div className={ props.className}>
        <div id={'video-player'}>
					<div id={'close-video-player'}></div>
				</div>
        <div className={'video-selector'}>
						<div className={'projects__about'}>
							<RichText.Content tagName="span" className={'project__about'} value={ props.attributes.text }/>
						</div>
						<div className={'projects__carousel'}>
				    	<InnerBlocks.Content />
						</div>
       </div>
      </div>
		);
	},
}
