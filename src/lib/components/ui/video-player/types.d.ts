import {URL} from "node:url";

export type VideoPlayerProps={
    videoUrl: string| URL,
    name?: string,
    class?: string,
    aspectRatio?: number,
}