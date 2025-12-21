import {AnchorProp, SnippetHolder} from "@/components/ui/types";
import {TransitionConfig} from "svelte/transition";
import {URL} from "node:url";
export type ProjectProps = {
    ref?:HTMLElement,
    title: SnippetHolder | string,
  description: SnippetHolder | string,
    footer?: SnippetHolder | string | AnchorProp[],
    videoUrl : string | URL,
    videoAnimation? : (node : Element, params:any, options: {direction: 'in' |'out' |'both'}) => TransitionConfig,
    controls?,
    class?: string
};
