<script>
    import HeaderContent from './header-content.svelte'
    import {cn, getColorString} from "@/utils.js";
    /** @type import('./types').HeaderProps */
    let {
        color = {direction: 'b',from: {color:'gray-900', opacity: 90}, via: {color:'black',opacity: 90 }, to: {color: 'gray-900', opacity: 70}},
        class: classNames,
        backgroundImage,
        ...properties
    } = $props()
    const colorClass = 'from' in color
        ? ['bg-gradient-to-' + color.direction,`from-${getColorString(color.from)}`, `via-${getColorString(color.via)}`, `to-${getColorString(color.to)}`]
        : [`bg-${getColorString(color)}`];

</script>

<header style:background-image={backgroundImage} class={cn("sticky w-full top-0 text-white font-[lato-heavy] rounded-b-[48px] border-2 border-accent/25 drop-shadow-xl shadow-black/30 backdrop-blur-md", ...(Array.isArray(classNames) ? classNames : [classNames]), ...colorClass)}>
    <HeaderContent {...properties}/>
</header>

