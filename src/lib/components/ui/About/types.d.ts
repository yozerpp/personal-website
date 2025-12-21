import {SnippetHolder} from "@/components/ui/types";

export type AboutProps = {
    title: string,
    text: SnippetHolder | string,
    class?:string,
    show?: boolean
};