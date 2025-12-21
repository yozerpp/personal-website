<script>
    import {Linkedin, Github, AppWindow as Demo, Mail} from "@lucide/svelte";
    import {cn} from "@/utils.js";
    /**@type import('./types').SocialIconProps*/
    let {
        href,
        title,
        type,
        size,
        class:className,
    } = $props();
    const IconAndClasses = $derived.by(()=>{
        switch (type){
            case 'LinkedIn':
                return {class: 'from-blue-700/100 via-blue-600/100 to-blue-400/100 bg-gradient-to-b text-white', icon:Linkedin};
            case 'Github':
                return {class: 'bg-black text-white', icon:Github};
            case 'Demo':
                return {class:'bg-neutral-200 text-amber-300', icon:Demo};
            case 'Mail':
                return {class: 'bg-sky-500 text-white', icon:Mail};
        }
    });
</script>
<a {href} target="_blank" {title} class={cn(IconAndClasses.class,"p-0 transition-transform size-[2rem] lg:size-[2.5rem] hover:scale-120 rounded-sm w-fit", className)}>
    <IconAndClasses.icon class="p-2 size-full" {size}/>
</a>
