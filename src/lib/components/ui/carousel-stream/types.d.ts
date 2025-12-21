import type {TransitionConfig} from "svelte/transition";
import {CssProp, SnippetHolder} from "@/components/ui/types";
import * as c from '$lib/components/ui/project-carousel/types';
export type CarouselAnimationParams = c.CarouselAnimationParams
export type CarouselControls = {startScroll:function():void,stopScroll:function():void};
export type CarouselStreamProps = Omit<c.CarouselProps, 'controls'>  & {speed?:number, controls: CarouselControls};