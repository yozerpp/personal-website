import TransitionConfig from 'svelte/transition'
import {Snippet} from "svelte";

export type TransitionFunction =
    ((node : Element, params? : any | undefined, options? : {direction: 'in' |'out'|'both'})=>TransitionConfig)
        | ((node : Element, params? : any | undefined)=>TransitionConfig);
export type Color = string | number;
export type ColorWithOpacity = {color: Color, opacity?: number}
export type GradientColor = {direction: 't'| 'tr' | 'r' | 'br'| 'b'| 'bl' | 'l' |  'tl',from: Color | ColorWithOpacity, via?: Color | ColorWithOpacity, to: Color | ColorWithOpacity}
export type SnippetHolder = {
    args?: Record<string, unknown>;
    snippet: Snippet<[any]>;
};
export type CssProp=string | {
    normal: string,
    md?: string,
    lg?:string,
}