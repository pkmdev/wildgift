
import { registerBlockType } from '@wordpress/blocks';

import './style.scss';
import './editor.scss';

/**
 * Import Block subfiles
 */

import * as hero from './hero';
import * as project from './project';
import * as innerProject from './inner-project';

const family = 'wildgift'

const blocks = [
    project,
    innerProject,
    hero
];

function registerBlock( block ) {
    const { name, settings } = block;
    registerBlockType( family+'/'+name, settings );
}

blocks.forEach( registerBlock );
