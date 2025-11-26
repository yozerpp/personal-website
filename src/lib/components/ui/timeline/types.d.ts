import {SnippetHolder} from "@/components/ui/types";

export type TimelineElement = {
    header?: SnippetHolder,
    content: SnippetHolder,
}
export type TimelineProps={
    elements: TimelineElement[],
    separatorLength?: number,
    class?: string,
}