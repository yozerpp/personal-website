import {SnippetHolder} from "@/components/ui/types";

export type DropdownProps = {
    items: DropdownElement[],
    selected?: number,
    initialText?: string,
    class?:string,
}
export type DropdownElement = string | SnippetHolder;