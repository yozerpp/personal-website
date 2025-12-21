<script>
    import DropdownMenu from "@/components/ui/dropdown-menu/DropdownMenu.svelte";
    import {languages} from "../../../../data.js";
    import {switchLanguage, getLanguage, cn} from "@/utils.js";
    import {m} from "$paraglide/messages.js"
    import * as Avatar from "@/components/ui/avatar/index.js";
    const languageIcons = languages.map(l=>({snippet: languageIcon, args: l}));
    const selectedIndex = languages.findIndex(l=>l.id.toLowerCase() === getLanguage());
    let {class:className, ...rest} = $props();
</script>
{#snippet languageIcon({icon, name, id})}
    <button onclick={()=>switchLanguage(id)} style="cursor: pointer !important;" class="size-fit px-2 py-1 md:px-4 md:py-2 grid grid-cols-[auto_auto] gap-2">
        <Avatar.Root data-id={id} class="aspect-square rounded-full w-5 lg:w-7">
            <Avatar.Image src={icon} alt={name}/>
            <Avatar.Fallback>{name}</Avatar.Fallback>
        </Avatar.Root>
        <span class=" text-md md:text-xl font-light content-center">{id}</span>
    </button>
{/snippet}

<div {...rest} class={cn("p-1 bg-gradient-to-br from-neutral-200 to-neutral-300 hover:brightness-95 rounded-xl", className)}>
    <DropdownMenu items={languageIcons} selected={selectedIndex}/>
</div>
