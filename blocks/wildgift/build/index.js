(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{6:function(e,t,n){}}]),function(e){function t(t){for(var l,a,c=t[0],i=t[1],u=t[2],d=0,b=[];d<c.length;d++)a=c[d],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&b.push(r[a][0]),r[a]=0;for(l in i)Object.prototype.hasOwnProperty.call(i,l)&&(e[l]=i[l]);for(s&&s(t);b.length;)b.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],l=!0,c=1;c<n.length;c++){var i=n[c];0!==r[i]&&(l=!1)}l&&(o.splice(t--,1),e=a(a.s=n[0]))}return e}var l={},r={0:0},o=[];function a(t){if(l[t])return l[t].exports;var n=l[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=e,a.c=l,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)a.d(n,l,function(t){return e[t]}.bind(null,l));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var c=window.webpackJsonp=window.webpackJsonp||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var s=i;o.push([8,1]),n()}([function(e,t){!function(){e.exports=this.wp.element}()},function(e,t){!function(){e.exports=this.wp.components}()},function(e,t){!function(){e.exports=this.wp.blockEditor}()},function(e,t){!function(){e.exports=this.wp.i18n}()},function(e,t){!function(){e.exports=this.wp.data}()},function(e,t){!function(){e.exports=this.wp.blocks}()},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var l={};n.r(l),n.d(l,"name",(function(){return b})),n.d(l,"settings",(function(){return p}));var r={};n.r(r),n.d(r,"name",(function(){return f})),n.d(r,"settings",(function(){return j}));var o={};n.r(o),n.d(o,"name",(function(){return O})),n.d(o,"settings",(function(){return g}));var a=n(5),c=(n(6),n(7),n(0)),i=n(3),u=n(2),s=n(1),d=["image"],b="hero",p={title:Object(i.__)("Hero","wildgift"),description:Object(i.__)("Hero block for WildGift home page","wildgift"),category:"common",icon:"format-image",keywords:[Object(i.__)("Wild Gift"),Object(i.__)("Hero")],getEditWrapperProps:function(e){return{"data-align":"full"}},attributes:{background:{type:"object",default:null},focalPoint:{type:"object",default:{x:".5",y:".5"}},fullwidth:{type:"string",default:"alignfull"},height:{type:"string",default:"100vh"},fixedheight:{type:"string"},justify:{type:"string",default:"flex-start"},showVideo:{type:"boolean",default:!1},videoOGGURL:{type:"string"},videoOGGID:{type:"number"},videoMP4URL:{type:"string"},videoMP4ID:{type:"number"},videoWEBMURL:{type:"string"},videoWEBMID:{type:"number"}},edit:function(e){var t=e.attributes.background,n=(e.attributes.overlay,e.attributes.focalPoint),l=null!=e.attributes.background?e.attributes.background.url:"",r=e.attributes.showVideo,o=e.attributes.videoOGGURL,a=e.attributes.videoOGGID,i=e.attributes.videoMP4URL,b=e.attributes.videoMP4ID,p=e.attributes.videoWEBMURL,m=e.attributes.videoWEBMID;return[Object(c.createElement)(u.InspectorControls,null,Object(c.createElement)(s.PanelBody,{title:"Content Alignment"},Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.SelectControl,{label:"Vertical Alignment",value:e.attributes.justify,options:[{label:"Top",value:"flex-start"},{label:"Center",value:"center"},{label:"Bottom",value:"flex-end"}],onChange:function(t){e.setAttributes({justify:t})}}))),Object(c.createElement)(s.PanelBody,{title:"Background/Placeholder Image"},Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(u.MediaUpload,{onSelect:function(t){e.setAttributes({background:t})},allowedTypes:d,value:t,render:function(e){var t=e.open;return Object(c.createElement)(s.Button,{className:"button",onClick:t},"Select Background")}})),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.Button,{className:"button",onClick:function(t){e.setAttributes({background:null})}},"Clear Image"))),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.FocalPointPicker,{label:"Image Focal Point",url:t?t.url:"",dimensions:{width:"auto",height:"auto"},value:n,onChange:function(t){e.setAttributes({focalPoint:t})}}))),Object(c.createElement)(s.PanelBody,{title:"Hero Video"},Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.FormToggle,{label:"Background Video",help:r?"Background Video":"Background Image",checked:r,onChange:function(t){e.setAttributes({showVideo:!r})}})),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("h2",null,"MP4 Video File"),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(u.MediaUpload,{onSelect:function(t){return e.setAttributes({videoMP4URL:t.url,videoMP4ID:t.id})},allowedTypes:"video",value:b,render:function(e){var t=e.open;return Object(c.createElement)(s.Button,{className:"button",onClick:t},"Select MP4 Video")}})),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.Button,{className:"button",onClick:function(t){e.setAttributes({videoMP4URL:null,videoMP4ID:null})}},"Clear MP4"))),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("p",null,i))),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("h2",null,"WebM Video File"),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(u.MediaUpload,{onSelect:function(t){return e.setAttributes({videoWEBMURL:t.url,videoWEBMID:t.id})},allowedTypes:"video",value:m,render:function(e){var t=e.open;return Object(c.createElement)(s.Button,{className:"button",onClick:t},"Select WebM Video")}})),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.Button,{className:"button",onClick:function(t){e.setAttributes({videoWEBMURL:null,videoWEBMID:null})}},"Clear WebM"))),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("p",null,p))),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("h2",null,"OGG Video File"),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(u.MediaUpload,{onSelect:function(t){return e.setAttributes({videoOGGURL:t.url,videoOGGID:t.id})},allowedTypes:"video",value:a,render:function(e){var t=e.open;return Object(c.createElement)(s.Button,{className:"button",onClick:t},"Select OGG Video")}})),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.Button,{className:"button",onClick:function(t){e.setAttributes({videoOGGURL:null,videoOGGMID:null})}},"Clear OGG"))),Object(c.createElement)(u.MediaUploadCheck,null,Object(c.createElement)(s.PanelRow,null,Object(c.createElement)("p",null,o)))),Object(c.createElement)(s.PanelBody,{title:"Hero Size"},Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.SelectControl,{label:"Hero Width",value:e.attributes.fullwidth,options:[{label:"Content Width",value:"content-width"},{label:"Full Width",value:"alignfull"}],onChange:function(t){e.setAttributes({fullwidth:t})}})),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.SelectControl,{label:"Hero Height",value:e.attributes.height,options:[{label:"Fixed",value:""},{label:"100%",value:"100vh"},{label:"50%",value:"50vh"},{label:"33%",value:"33.333vh"},{label:"25%",value:"25vh"}],onChange:function(t){e.setAttributes({height:t})}})),Object(c.createElement)(s.PanelRow,null,Object(c.createElement)(s.TextControl,{label:"Fixed Height in pixels",value:e.attributes.fixedheight,onChange:function(t){e.setAttributes({fixedheight:t})}})))),Object(c.createElement)("div",{className:e.className+(l?" hasbg ":""),style:{backgroundImage:"url(".concat(l,")"),backgroundPosition:"".concat(100*n.x,"% ").concat(100*n.y,"%")}},Object(c.createElement)(u.InnerBlocks,null))]},save:function(e){var t=e.attributes.background?e.attributes.background.url:"",n=[];e.attributes.showVideo&&(e.attributes.videoMP4URL&&n.push(Object(c.createElement)("source",{"data-src":e.attributes.videoMP4URL,type:"video/mp4"})),e.attributes.videoOGGURL&&n.push(Object(c.createElement)("source",{"data-src":e.attributes.videoOGGURL,type:"video/ogg"})),e.attributes.videoWEBMURL&&n.push(Object(c.createElement)("source",{"data-src":e.attributes.videoWEBMURL,type:"video/WebM"})));var l=e.attributes.showVideo?Object(c.createElement)("div",{className:"hero__video"},Object(c.createElement)("video",{autoplay:"true",muted:"true",poster:e.attributes.mediaURL,loop:"true",playsinline:"true","data-object-fit":"true"},n)):"";return Object(c.createElement)("div",{className:e.attributes.fullwidth+(t?" hasbg ":""),style:{backgroundImage:"url(".concat(t,")"),backgroundPosition:"".concat(100*e.attributes.focalPoint.x,"% ").concat(100*e.attributes.focalPoint.y,"%"),height:""==e.attributes.height?e.attributes.fixedheight+"px":e.attributes.height,display:"flex",flexFlow:"column nowrap",justifyContent:e.attributes.justify}},l,Object(c.createElement)("div",{className:"hero__inner"},Object(c.createElement)(u.InnerBlocks.Content,null)))}},m=n(4),f="project",j={title:Object(i.__)("Projects","wildgift"),description:Object(i.__)("Projects block for WildGift Director pages","wildgift"),category:"common",icon:"portfolio",supports:{html:!1},attributes:{template:{type:"array",default:[]},order:{type:"array",default:[]},count:{type:"number",default:0},text:{type:"string",default:""}},edit:Object(m.withSelect)((function(e,t){var n=wp.data.select("core/block-editor").getBlocks(t.clientId),l=wp.data.select("core/editor").getCurrentPostId(),r=n.map((function(e){return e.attributes.id}));return{projects:wp.data.select("core").getEntityRecords("postType","project",{per_page:100,metaKey:"_director",metaValue:l}),order:r,postid:l}}))((function(e){var t=e.attributes.text;return[Object(c.createElement)("div",{className:e.className},Object(c.createElement)("div",{className:"projects__about"},Object(c.createElement)(u.RichText,{tagName:"span",onChange:function(t){e.setAttributes({text:t})},value:t,placeholder:"About Text"})),Object(c.createElement)(s.Button,{className:"button",onClick:function(){var t=e.projects;if(console.log(t),null==t)return!1;wp.data.select("core/block-editor").getBlocks(e.clientId).map((function(e){return e.clientId}));var n=0,l=t.filter((function(t){return e.order.includes(t.id)})),r=t.filter((function(t){return!e.order.includes(t.id)}));l.sort((function(t,n){return e.order.indexOf(t.id)-e.order.indexOf(n.id)}));var o=e.attributes.template,c=l.concat(r),i=[],u=[];null!=c&&c.length>0&&c.forEach((function(e){u.push(e.id);var t={id:e.id,title:e.title.rendered,client:e._client,director:e._director,vimeo:e._vimeo,image:e.featured_media,link:e.link};o.push(["wildgift/inner-project",t]);var l=Object(a.createBlock)("wildgift/inner-project",t);i.push(l),n++})),wp.data.dispatch("core/block-editor").replaceInnerBlocks(e.clientId,i),e.setAttributes({count:n})}},"Refresh Project List"),Object(c.createElement)(s.Button,{className:"button",onClick:function(){window.open("/wp-admin/post-new.php?post_type=project&director="+e.postid)}},"Add New Project"),Object(c.createElement)("div",{className:"projects__inner"},Object(c.createElement)(u.InnerBlocks,{templateLock:"insert",allowedBlocks:["oae/inner-project"]})))]})),save:function(e){return Object(c.createElement)("div",{className:e.className},Object(c.createElement)("div",{id:"video-player"},Object(c.createElement)("div",{id:"close-video-player"})),Object(c.createElement)("div",{className:"video-selector"},Object(c.createElement)("div",{className:"projects__about"},Object(c.createElement)(u.RichText.Content,{tagName:"span",className:"project__about",value:e.attributes.text})),Object(c.createElement)("div",{className:"projects__carousel"},Object(c.createElement)(u.InnerBlocks.Content,null))))}};function v(e){var t=e.id;if(0==t||"number"!=typeof t)return!1;var n=Object(m.useSelect)((function(e){return e("core").getMedia(t)}),[t]);return!!n&&Object(c.createElement)("img",{src:n.source_url})}var O="inner-project",g={title:Object(i.__)("Project"),parent:["wildgift/project"],icon:"video-alt",category:"common",keywords:[Object(i.__)("WildGift"),Object(i.__)("Project"),Object(i.__)("Inner Block")],attributes:{id:{type:"number",default:""},client:{type:"string",default:""},title:{type:"string",default:""},link:{type:"string",default:""},image:{type:"number",default:0},vimeo:{type:"string",default:""},director:{type:"number",default:0}},edit:Object(m.withSelect)((function(e,t){return{imagesrc:e("core").getMedia(t.attributes.image)}}))((function(e){var t=e.attributes.id,n=e.attributes.client,l=(e.attributes.director,e.attributes.title),r=e.attributes.image;return[Object(c.createElement)("div",{className:e.className},Object(c.createElement)(v,{id:r}),Object(c.createElement)("h2",null,n),Object(c.createElement)("h3",null,l),Object(c.createElement)(s.Button,{className:"button",onClick:function(){window.open("/wp-admin/post.php?action=edit&post="+t)}},"Edit Video"))]})),save:function(e){return null}};[r,o,l].forEach((function(e){var t=e.name,n=e.settings;Object(a.registerBlockType)("wildgift/"+t,n)}))}]);