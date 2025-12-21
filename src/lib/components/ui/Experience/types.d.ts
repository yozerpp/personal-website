import {Snippet} from "svelte";
import {AnchorProp, SnippetHolder} from "@/components/ui/types";

export type Timeline = {start: Date | string, end?: Date | string}
export type ExperienceProps={
    ref : HTMLElement,
    timeline: Timeline,
    experienceType: 'school' | 'internship' | 'work',
    title: SnippetHolder | string,
    description: Snippet | SnippetHolder | string,
    footer?: AnchorProp[],
    class?: string,
};