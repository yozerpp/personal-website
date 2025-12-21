import {SnippetHolder} from "@/components/ui/types";
import {Snippet} from "svelte";

export type TooltipProps={
    children: Snippet;
    content: string | SnippetHolder;
}