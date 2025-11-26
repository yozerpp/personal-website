import type {TransitionConfig} from "svelte/transition";
import {SnippetHolder} from "@/components/ui/types";

export type CarouselControls = {
    scrollNext: () => void;
    scrollPrev: () => void;
    canScrollNext: () => boolean;
    canScrollPrev: () => boolean;
    scrollTo: (index: number, jump?: boolean) => void;
    handleKeyDown: (e: unknown) => void;
};

export type CarouselAnimationParams = {
    delay?: number;
    duration?: number;
    easing?: (t: number) => number;
    toLeft?: boolean;
    coming?: boolean;
};

export type CarouselProps = {
    controls?: CarouselControls;
    slides: SnippetHolder[];
    class?: string;
    orientation?: "horizontal" | "vertical";
    animation?: (
        node: HTMLElement,
        params: CarouselAnimationParams
    ) => TransitionConfig;
};
