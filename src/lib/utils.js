import { clsx, } from "clsx";
import { twMerge } from "tailwind-merge";
import {getLocale, setLocale} from '$paraglide/runtime.js'
/**@param {string} name*/
export function makeId(name){
    return name.replace(/\s+/,'_').toLowerCase();
}
/**@param {string} newLocale*/
export function switchLanguage(newLocale) {
    debugger
    setLocale(newLocale.toLowerCase(),{reload:true})
}
/**@return {string}*/
export function getLanguage(){
    return getLocale()
}
/**@param {import('svelte').Snippet<[any]>} snippet
 * @param {object} args
 * @constructor
 */
export function SnippetHolder(snippet, args){
    return {snippet, args};
}

export class SectionIntersectedEvent extends CustomEvent {
    static name = "sectionintersected";
    constructor(id) {
        super("sectionintersected",{detail: {id}, bubble:false, cancelable:true});
    }
}
export function cn(...inputs) {
	return twMerge(clsx(inputs));
}

/** @param {import('$lib/components/ui/types').Color | import('$lib/components/ui/types').ColorWithOpacity} color
 * @return {string} class of color
 * */
export function getColorString(color){
    if(typeof color === 'string')
        return color;
    else if (typeof color === 'number')
        return `#${color.toString(8)}`;
    else if(typeof color === 'object' && 'color' in color)
        return `${getColorString(color.color)}` + ('opacity' in color ? `/${color.opacity}` : '');
    else return undefined;
}

/**
 * @param {import('$lib/components/ui/types.js').CssProp} prop
 * @param {string} prefix
 * @return {string}
 */
export function toStyleString(prop, prefix){
    if(typeof prop ==='string') return `--${prefix}: ${prop};`;
    let ret =`--${prefix}: ${prop.normal};`;
    if(prop.md) ret += `--${prefix}-md: ${prop.md};`;
    if(prop.lg) ret += `--${prefix}-lg: ${prop.lg};`;
    return ret;
}
