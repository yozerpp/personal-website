<script>
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import {m} from '$lib/paraglide/messages.js';
    import {typewriter} from "@/components/ui/transitions.js";
    import {fade} from "svelte/transition";
    import {cn} from "@/utils.js";
    import SocialIcon from "@/components/ui/social-icon/SocialIcon.svelte";
    import {socialLinks} from "../../../../data.js";

    /** @type import('./types.d.ts').HeaderProps */
    let {
        headerAnimation =typewriter,
        avatarAnimation = fade,
        photoUrl,
        name,
        class:className,
    } = $props();
</script>

<div class={cn("relative px-2 pt-1 pb-2 md:px-5 md:pt-4 md:pb-3 size-full", className)} >
    <div class="flex flex-row justify-center size-full items-end gap-3 lg:gap-10">
        <div in:avatarAnimation>
            <Avatar.Root class="size-auto w-[6rem] md:w-[10rem]">
                <Avatar.Image class="size-full" src={photoUrl} alt={m.pp_alt()}/>
                <Avatar.Fallback>{m.pp_alt()}</Avatar.Fallback>
            </Avatar.Root>
        </div>
        <div class="size-fit">
            <h3 in:headerAnimation={{deleteAfter:true}} class="mb-2 md:mb-5 text-4xl md:text-5xl lg:text-6xl font-extrabold font-sans">{name}</h3>
        </div>
    </div>
    <div class="hidden md:grid self-end absolute right-0 -translate-x-[25%] grid-cols-3 gap-1 md:gap-3 lg:gap-5 me-2 md:me-3 lg:me-4">
        {#each socialLinks as social,i(social)}
            <SocialIcon {...social}/>
        {/each}
    </div>
</div>
