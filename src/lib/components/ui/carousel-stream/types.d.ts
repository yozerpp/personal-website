import type {TransitionConfig} from "svelte/transition";
import {CssProp, SnippetHolder} from "@/components/ui/types";
import * as c from '$lib/components/ui/carousel/types';
export type CarouselControls = c.CarouselControls;

export type CarouselAnimationParams = c.CarouselAnimationParams

export type CarouselStreamProps = c.CarouselProps & {width: CssProp, speed?:number};