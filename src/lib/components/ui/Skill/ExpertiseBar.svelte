<script>
    import {cn} from "@/utils.js";
    import {m} from '$paraglide/messages.js';
    /** @type import('./types').ExpertiseBarProps*/
    let {
        expertise,
        class:className,
    } = $props();
    const expRange = 4;
    const colorAndText = {
        1: {color: 'bg-blue-300', textColor:'text-blue-300/70', text: m.expertise_novice()},
        2: {color: 'bg-green-600',textColor:'text-green-500/70', text: m.expertise_intermediate()},
        3: {color: 'bg-orange-400', textColor:'text-orange-300/70', text: m.expertise_advanced()},
        4: {color: 'bg-amber-600', textColor: 'text-amber-500/70', text: m.expertise_expert()}
    }[expertise];
</script>
<div class={cn("flex flex-col gap-0",className)}>
    <div class={cn("grid grid-cols-4 gap-0 p-0 overflow-hidden border-2 rounded-2xl border-gray-400/70")}>
        {#each {length: 4} as _,i(i)}
            <div class={cn("border-gray-400/80 py-3 m-0", i<expertise?colorAndText.color:'', i>0?'border-s-2':'')}></div>
        {/each}
    </div>
    <p class="text-md text-center text-shadow-muted-foreground text-shadow-sm content-start m-0 p-0 {colorAndText.textColor} dark:text-shadow-accent">{colorAndText.text}</p>
</div>