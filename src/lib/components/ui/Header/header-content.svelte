<script>
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import {m} from '$lib/paraglide/messages.js'
    import {typewriter} from "@/components/ui/transitions.js";
    import {fade} from "svelte/transition";
    /** @type import('./types.d.ts').HeaderProps */
    let {
        headerAnimation =typewriter,
        avatarAnimation = fade,
        photoUrl,
        name
    } = $props();

</script>

<header class="container px-2 pt-1 pb-2 md:px-5 md:pt-4 md:pb-3 flex flex-row justify-center items-end gap-[7%]" >
    <div in:avatarAnimation>
        <Avatar.Root class="size-[15vw] lg:size-[10vw]">
            <Avatar.Image src={photoUrl} alt={m.pp_alt()}/>
            <Avatar.Fallback>{m.pp_alt()}</Avatar.Fallback>
        </Avatar.Root>
    </div>
    <div>
        <h3 in:headerAnimation={{deleteAfter:true}} class="mb-2 md:mb-5 text-2xl md:text-3xl lg:text-6xl font-extrabold font-sans">{name}</h3>
    </div>
</header>
