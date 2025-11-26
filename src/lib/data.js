import {m} from '/src/paraglide/messages.js';
import {createRawSnippet} from "svelte";
/**@import {ProjectProps} from '$lib/components/ui/Project/types'*/

/**@type ProjectProps*/
export const thisWebsiteProject = {
    title: {snippet: createRawSnippet(() => ({render: () => plainProjectTitle(m.projects_thisWebsite_title())}))},
    description: {snippet: createRawSnippet(() => ({render: () => plainProjectDescription(m.projects_thisWebsite_description())}))},
    videoUrl: "https://www.youtube.com/embed/aA5FgDdRwHI?si=vvVBYNwKto8cAVxn&autoplay=1&controls=0&loop=1&disablekb=1&fs=0playsinline=1&mute=1",
}
function plainProjectTitle(title){
    return `<h3 class="text-3xl text-accent text-shadow-accent-foreground text-shadow-lg">${title}</h3>`;
}
function plainProjectDescription(/**@type string*/description, /**@type {string[] | undefined}*/ elements){
    let ret = `<div><p>${description}</p>`
    if(!elements || elements.length < 0 ){return ret + '</div>'}
    return ret + `<ul>` +
        elements.map(elem =>`<li>${elem}</li>`).join('')+
        `</ul>` +
        '</div>';
}