import {SnippetHolder} from "@/components/ui/types";
import {TransitionConfig} from "svelte/transition";
import {URL} from "node:url";
export type ProjectProps = {
    ref?:HTMLElement,
    title: SnippetHolder,
  description: SnippetHolder,
    footer?: SnippetHolder,
    videoUrl : string | URL,
    animation? : (node : Element, params:any, options: {direction: 'in' |'out' |'both'}) => TransitionConfig,
    class?: string
};
