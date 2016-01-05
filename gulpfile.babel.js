import {src, dest, watch, parallel, series} from 'gulp';


import del from 'del';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import rename from 'gulp-rename';


const SRC_DIR = 'src';
const DEST_DIR = 'dist';
const CSS_GLOB = `${SRC_DIR}/**/*.scss`;
const HTML_GLOB = `${SRC_DIR}/**/*.html`;


export const clean = () => del([DEST_DIR]);
export const views = () => src(HTML_GLOB)
.pipe(dest(DEST_DIR));
export const styles = () => src(CSS_GLOB, { base: 'src' })
.pipe(sass().on('error', sass.logError))
.pipe(autoprefixer({ browsers: ['last 2 versions'] }))
.pipe(dest(DEST_DIR));
export const watchSrc = () => {
	watch(CSS_GLOB, styles);
	watch(HTML_GLOB, views);
};
export const dev = series(clean, views, styles, watchSrc);
export default dev;