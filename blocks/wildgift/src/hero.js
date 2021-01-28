import { __ } from '@wordpress/i18n';
import { RichText, InnerBlocks, MediaUpload, MediaUploadCheck, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, Button, DateTimePicker, TextControl, Tooltip, Panel, PanelBody, PanelRow, FormToggle, SelectControl, FocalPointPicker, ColorPalette, AnglePickerControl, RangeControl} from '@wordpress/components';

const ALLOWED_MEDIA_TYPES = [ 'image' ];

export const name = 'hero';

export const settings = {
	/**
	 * This is the display title for your block, which can be translated with `i18n` functions.
	 * The block inserter will show this name.
	 */
	title: __( 'Hero', 'wildgift' ),

	/**
	 * This is a short description for your block, can be translated with `i18n` functions.
	 * It will be shown in the Block Tab in the Settings Sidebar.
	 */
	description: __(
		'Hero block for WildGift home page',
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
 icon: 'format-image', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.

 keywords: [
   __( 'Wild Gift' ),
   __( 'Hero' )
 ],
  getEditWrapperProps( props ) {
    return {
      'data-align': 'full'
    };
  },
  attributes: {
      background: {
          type: 'object',
          default: null,
      },
      focalPoint: {
          type: 'object',
          default: {
            x: '.5',
            y: '.5'
          }
      },
      fullwidth: {
         type: 'string',
         default: 'alignfull'
       },
      height: {
         type: 'string',
         default: '100vh'
        },
       fixedheight: {
         type: 'string'
       },
       justify: {
           type: 'string',
           default: 'flex-start'
       },
       showVideo: {
         type: 'boolean',
         default: false
       },
       videoOGGURL: {
 				type: 'string',
   			},
   			videoOGGID: {
   				type: 'number'
   			},
   			videoMP4URL: {
   				type: 'string',
   			},
   			videoMP4ID: {
   				type: 'number'
   			},
   			videoWEBMURL: {
   				type: 'string',
   			},
   			videoWEBMID: {
   				type: 'number'
   			},
    },
  edit: ( props ) => {
      let background = props.attributes.background;
      let overlay = props.attributes.overlay;
      let focalPoint = props.attributes.focalPoint
      let bgimg = (props.attributes.background != null  ? props.attributes.background.url : '');
      let showVideo = props.attributes.showVideo;
      let videoOGGURL  = props.attributes.videoOGGURL;
			let videoOGGID = props.attributes.videoOGGID;
			let videoMP4URL = props.attributes.videoMP4URL;
		  let	videoMP4ID = props.attributes.videoMP4ID;
			let videoWEBMURL = props.attributes.videoWEBMURL;
			let videoWEBMID = props.attributes.videoWEBMID;

      function onSelectBackground( content ) {
          props.setAttributes({background: content })
      }
      function clearBackgroundImage( content ) {
          props.setAttributes({background: null })
      }
			function clearMP4( content ) {
          props.setAttributes({videoMP4URL: null,  videoMP4ID: null})
      }
			function clearWebM( content ) {
          props.setAttributes({videoWEBMURL: null,  videoWEBMID: null})
      }
			function clearOGG( content ) {
          props.setAttributes({videoOGGURL: null,  videoOGGMID: null})
      }
      function onChangeFocalPoint (content) {
          props.setAttributes({focalPoint: content})
      }
      function onChangeWidth (content) {
          props.setAttributes({fullwidth: content})
      }
      function onChangeHeight (content) {
          props.setAttributes({height: content})
      }
      function onChangeFixedHeight (content) {
          props.setAttributes({fixedheight: content})
      }
      function onChangeJustify (content) {
          props.setAttributes({justify: content})
      }
      function onChangeShowVideo ( content ) {
          props.setAttributes({showVideo: ! showVideo})
      }

      return [
        <InspectorControls>
        <PanelBody title="Content Alignment" >
           <PanelRow>
             <SelectControl
               label="Vertical Alignment"
               value= {props.attributes.justify}
               options={[
                 { label: 'Top', value: 'flex-start' },
                 { label: 'Center', value: 'center' },
                 { label: 'Bottom', value: 'flex-end' }
               ]}
               onChange={onChangeJustify}
             />
           </PanelRow>
         </PanelBody>
          <PanelBody title="Background/Placeholder Image" >
            <PanelRow>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ onSelectBackground }
                  allowedTypes={ ALLOWED_MEDIA_TYPES }
                  value={ background }
                  render={ ( { open } ) => (
                    <Button
                      className={'button'}
                      onClick={ open }>
                      Select Background
                    </Button>
                  ) }
                />
              </MediaUploadCheck>
              <MediaUploadCheck>
                <Button
                  className={'button'}
                  onClick={ clearBackgroundImage }>
                  Clear Image
                </Button>
              </MediaUploadCheck>
            </PanelRow>
            <PanelRow>
              <FocalPointPicker
                label="Image Focal Point"
                url={ (background ? background.url : '') }
                dimensions={ {
                    width: 'auto',
                    height: 'auto'
                  } }
                value={ focalPoint }
                onChange={ onChangeFocalPoint }
              />
            </PanelRow>
          </PanelBody>
          <PanelBody title="Hero Video">
            <PanelRow>
              <FormToggle
                  label="Background Video"
                  help={ showVideo ? 'Background Video' : 'Background Image' }
                  checked={ showVideo }
                  onChange={ onChangeShowVideo }
              />
            </PanelRow>
            <PanelRow>
              <h2>MP4 Video File</h2>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ function (media) {;
                    return props.setAttributes({
                      videoMP4URL: media.url,
                      videoMP4ID: media.id
                    })
                    } }
                  allowedTypes={ 'video' }
                  value={ videoMP4ID }
                  render={ ( { open } ) => (
                    <Button
                      className={'button'}
                      onClick={ open }>
                      Select MP4 Video
                    </Button>
                  ) }
                />
              </MediaUploadCheck>
							<MediaUploadCheck>
                <Button
                  className={'button'}
                  onClick={ clearMP4 }>
                  Clear MP4
                </Button>
              </MediaUploadCheck>
            </PanelRow>
            <MediaUploadCheck>
              <PanelRow>
              <p>{videoMP4URL}</p>
              </PanelRow>
            </MediaUploadCheck>
            <PanelRow>
              <h2>WebM Video File</h2>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ function (media) {;
                    return props.setAttributes({
                      videoWEBMURL: media.url,
                      videoWEBMID: media.id
                    })
                    } }
                  allowedTypes={ 'video' }
                  value={ videoWEBMID }
                  render={ ( { open } ) => (
                    <Button
                      className={'button'}
                      onClick={ open }>
                      Select WebM Video
                    </Button>
                  ) }
                />
              </MediaUploadCheck>
							<MediaUploadCheck>
                <Button
                  className={'button'}
                  onClick={ clearWebM }>
                  Clear WebM
                </Button>
              </MediaUploadCheck>
            </PanelRow>
            <MediaUploadCheck>
              <PanelRow>
              <p>{videoWEBMURL}</p>
              </PanelRow>
            </MediaUploadCheck>
            <PanelRow>
              <h2>OGG Video File</h2>
              <MediaUploadCheck>
                <MediaUpload
                  onSelect={ function (media) {;
                    return props.setAttributes({
                      videoOGGURL: media.url,
                      videoOGGID: media.id
                    })
                    } }
                  allowedTypes={ 'video' }
                  value={ videoOGGID }
                  render={ ( { open } ) => (
                    <Button
                      className={'button'}
                      onClick={ open }>
                      Select OGG Video
                    </Button>
                  ) }
                />
              </MediaUploadCheck>
							<MediaUploadCheck>
                <Button
                  className={'button'}
                  onClick={ clearOGG }>
                  Clear OGG
                </Button>
              </MediaUploadCheck>
            </PanelRow>
            <MediaUploadCheck>
              <PanelRow>
              <p>{videoOGGURL}</p>
              </PanelRow>
            </MediaUploadCheck>
          </PanelBody>
          <PanelBody title="Hero Size" >
           <PanelRow>
             <SelectControl
               label="Hero Width"
               value= {props.attributes.fullwidth}
               options={[
                 { label: 'Content Width', value: 'content-width' },
                 { label: 'Full Width', value: 'alignfull' }
               ]}
               onChange={onChangeWidth}
             />
           </PanelRow>
           <PanelRow>
             <SelectControl
               label="Hero Height"
               value= {props.attributes.height}
               options={[
                 { label: 'Fixed', value: '' },
                 { label: '100%', value: '100vh' },
                 { label: '50%', value: '50vh' },
                 { label: '33%', value: '33.333vh'},
                 { label: '25%', value: '25vh'}
               ]}
               onChange={onChangeHeight}
             />
           </PanelRow>
           <PanelRow>
           <TextControl
             label="Fixed Height in pixels"
             value={ props.attributes.fixedheight }
             onChange={ onChangeFixedHeight }
           />
           </PanelRow>

          </PanelBody>
        </InspectorControls>,
        <div   className={props.className + (bgimg ? ' hasbg ' : '') } style={{
            backgroundImage: `url(${bgimg})`,
            backgroundPosition: `${ focalPoint.x * 100 }% ${ focalPoint.y * 100 }%`
          }}>
            <InnerBlocks />
          </div>
      ];
  },
  save: ( props ) => {

      let bgimg = (props.attributes.background ? props.attributes.background.url : '');
      let sources = [];
      if (props.attributes.showVideo) {
        if (props.attributes.videoMP4URL) sources.push(<source data-src  = {props.attributes.videoMP4URL} type = 'video/mp4' />);
        if (props.attributes.videoOGGURL) sources.push(<source data-src  = {props.attributes.videoOGGURL} type = 'video/ogg' />);
        if (props.attributes.videoWEBMURL) sources.push(<source data-src  = {props.attributes.videoWEBMURL} type = 'video/WebM' />);
      }
      let video = (props.attributes.showVideo ?
        <div className = 'hero__video'>
          <video
            autoplay = 'true'
            muted = 'true'
            poster = {props.attributes.mediaURL}
            loop = 'true'
            playsinline = 'true'
            data-object-fit = 'true'
          >
          {sources}
          </video>
        </div>
      : '');

      return (
        <div className={props.attributes.fullwidth + (bgimg ? ' hasbg ' : '') }
          style={{
            backgroundImage: `url(${bgimg})`,
            backgroundPosition: `${ props.attributes.focalPoint.x * 100 }% ${ props.attributes.focalPoint.y * 100 }%`,
            height: (props.attributes.height == '' ? props.attributes.fixedheight+'px' :  props.attributes.height ),
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: props.attributes.justify
          }}>
            {video}
            <div className={'hero__inner'}>
                <InnerBlocks.Content />
            </div>
        </div>
      )
  },
}
