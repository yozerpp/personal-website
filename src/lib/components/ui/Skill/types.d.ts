import type {AnchorProp} from "@/components/ui/types";

export type SkillProps = {
    ref: HTMLElement,
    name: string,
    expertise: 1|2|3|4,
    references?:AnchorProp[],
    class:string,
};
export type ExpertiseBarProps = {
    expertise: 1|2|3|4;
    class?:string;
}