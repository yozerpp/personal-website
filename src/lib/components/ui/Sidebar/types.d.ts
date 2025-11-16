import {TransitionFunction, SnippetHolder} from "@/components/ui/types";

export type SidebarProps = {
    elements: SidebarElement[],
    class?: string,
    selected?: string, //href
}
export type SidebarElement = {
    image: string,
    imageAnimation?: TransitionFunction,
    nameAnimation?: TransitionFunction,
    href: string
    name: string,
    class?: string,
    reveal?: boolean,
}