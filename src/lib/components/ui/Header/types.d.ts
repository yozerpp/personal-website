import {GradientColor, Color, TransitionFunction, ColorWithOpacity} from "@/components/ui/types";
export type HeaderProps = {
    avatarAnimation?:  TransitionFunction,
    headerAnimation?: TransitionFunction,
    color?: Color | ColorWithOpacity | GradientColor,
    class?: string | string[],
    photoUrl : string,
    backgroundImage?: string,
    name : string,
    offsetHeight?: number,
    class: string
};