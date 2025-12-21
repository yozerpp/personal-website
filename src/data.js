import {m} from '/src/paraglide/messages.js';
import {createRawSnippet} from "svelte";
import {AppWindow, BriefcaseBusiness, PersonStanding, Wrench} from "@lucide/svelte";
/**@import {ProjectProps} from '$lib/components/ui/Project/types'*/

/**@param {string} name*/
function makeId(name){
    return name.replace(/\s+/,'_').toLowerCase();
}
/**@param {string} seperatedString*/
function parseBulletedDescription(seperatedString, separator= '|', cls = null){
    const sep = seperatedString.split(separator);
    return bulletedDescription(sep[0].length ? sep[0] : null, sep.slice(1, sep.length), cls);
}
/**@param {string} str*/
function escapeHtml(str){
    // return str;
    const re = /\n/g;
    let m;
    let prevPos = 0;
    let ret = '';
    while ((m = re.exec(str))){
        let replacement;
        switch(m["0"]){
            case '&': replacement = '&amp;'; break;
            case '<': replacement = '&lt;'; break;
            case '>': replacement = '&gt;'; break;
            case '"': replacement = '&quot;'; break;
            case "'": replacement = '&#39;'; break;
            case '\n': replacement = '<br/>'; break;
            default: replacement = m["0"];
        }
        ret+=str.substring(prevPos, m.index) + replacement;
        prevPos = m.index + m[0].length;
    }
    if(str.length > prevPos)
        ret+=str.substring(prevPos, str.length);
    return ret;
}
function bulletedDescription(/**@type string*/description, /**@type {string[] | undefined}*/ elements, cls = null){
    let ret = '<div>';
    if(description)
        ret += `<p>${escapeHtml(description)}</p>`;
    if(!elements || elements.length === 0 ){return ret + '</div>'}
    return ret + `<ul class="list-disc ${cls?cls:''}">` +
        elements.map(elem =>`<li>${escapeHtml(elem)}</li>`).join('')+
        `</ul>` +
        '</div>';
}
function clickToProjectHref(name){
    document.getElementById('projects').scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
    document.getElementById("projectTab_" + makeId(name)).dispatchEvent(new Event('click', {bubbles:true, cancelable: true}));
}
export const sidebarElements = [
    {name: m.about_title(), href: `#about`, image: PersonStanding},
    {name: m.experience_title(), href: `#experiences`, image: BriefcaseBusiness},
    {name: m.projects_title(), href: `#projects`, image: AppWindow},
    {name: m.skills_title(), href: `#skills`, image: Wrench},
];
/**@type {import('@/components/ui/Experience/types.js').ExperienceProps[]}*/
export const experiences = [
    {
        title: m.experience_ktu(),
        experienceType: 'school',
        timeline: {start: new Date(2020, 8), end: new Date(2025, 8)},
        description: createRawSnippet(()=>({
            render: parseBulletedDescription.bind(null, (m.experience_ktu_desc()))
        })),
        footer: [
            {onclick: clickToProjectHref.bind(null,m.projects_nutdetector_title()), text: m.projects_nutdetector_title()},
            {onclick: clickToProjectHref.bind(null,m.projects_ecommerce_api_title()), text: m.projects_ecommerce_api_title()},
            {href: '/transcript.pdf', text: m.experience_ktu_transcript(), download: true}
        ]
    },
    {
        title: m.experience_biltas(),
        experienceType: 'internship',
        timeline: {start: new Date(2024, 6), end: new Date(2024, 8)},
        description: createRawSnippet(()=>{
            const full = m.experience_biltas_desc()
            const split = full.split('|');
            return  {
                render: bulletedDescription.bind(null, split[0], split.slice(1))
            }
        }),
        footer: [
            {href: 'https://biltas.com.tr/', text: m.experience_biltas_website()},
            {href: '/document-signer_um.pdf', text: m.experience_biltas_user_manual()},
        ]
    },
    {
        title: m.experience_kivi(),
        experienceType: 'internship',
        timeline: {start: new Date(2025, 6), end: new Date(2025, 7)},
        description: createRawSnippet(()=>{
            const points = m.experience_kivi_desc({project_name: m.projects_ecommerce_platform_title()}).split('|')
            return {
                render: bulletedDescription.bind(null, points[0], points.slice(1))
            }
        }),
        footer: [
            {href: 'https://www.kivierp.com/', text: m.experience_kivi_website()},
            {href:'#project_' + makeId(m.projects_ecommerce_platform_title()), text: m.projects_ecommerce_platform_title()},
        ]
    }
];
/**@type {import('@/components/ui/Project/types.js').ProjectProps[]}*/
export const projects = [
    {
        title: m.projects_thisWebsite_title(),
        description: m.projects_thisWebsite_description(),
        footer: [{href: "https://github.com/yozerpp/personal-website", text: m.project_repository_generic()}]
    },
    {
        title: m.projects_ecommerce_platform_title(),
        description: parseBulletedDescription(m.projects_ecommerce_platform_description(), '|', 'list-none'),
        footer: [{href: 'demo/ecommerce-platform', text: m.projects_demo_generic()}, {href: 'github.com/yozerpp/ecommerce_kivi', text: m.project_repository_generic()}]
    },
    {title: m.projects_nutdetector_title(), description: m.projects_nutdetector_description(), footer: [{href: 'github.com/yozerpp/nutdetector', text:m.project_repository_generic()}]},
    {title: m.projects_ecommerce_api_title(),description: m.projects_ecommerce_api_description(),footer:[{href: 'demo/ecommerce-api', text: m.projects_demo_generic()},{href: 'github.com/yozerpp/ecommerce-backend', text:m.project_repository_generic()}] },
];
/**@type {import('@/components/ui/Skill/types.js').SkillProps[]}*/
export const skills = [
    // { name: 'hidden', expertise: 1 },
    {
        name: "Full-Stack Development",
        expertise: 2,
        references: [
            { text: m.experience_kivi(), href: '#experiences' },
            { text: m.projects_ecommerce_platform_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_platform_title()) }
        ]
    },
    {
        name: "Back-End Web Development",
        expertise: 3,
        references: [
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_ecommerce_api_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_api_title()) },
            {text: m.projects_ecommerce_platform_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_platform_title())}
        ]
    },
    {
        name: "ASP.NET",
        expertise: 3,
        references: [
            { text: m.experience_kivi(), href: '#experiences' },
            { text: m.projects_ecommerce_platform_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_platform_title()) }
        ]
    },
    {
        name: "Spring Framework",
        expertise: 3,
        references: [
            { text: m.experience_biltas(), href: '#experiences' }
        ]
    },
    {
        name: "Java",
        expertise: 3,
        references: [
            { text: m.experience_biltas(), href: '#experiences' },
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_ecommerce_api_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_api_title()) }
        ]
    },
    {
        name: "Tomcat",
        expertise: 2,
        references: [
            { text: m.projects_ecommerce_api_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_api_title()) }
        ]
    },
    {
        name: "Desktop Application Development",
        expertise: 2,
        references: [
            { text: m.experience_biltas(), href: '#experiences' }
        ]
    },
    {
        name: "MySQL",
        expertise: 2,
        references: [
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_ecommerce_api_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_api_title()) }
        ]
    },
    {
        name: "SQL Server",
        expertise: 2,
        references: [
            { text: m.experience_kivi(), href: '#experiences' },
            { text: m.projects_ecommerce_platform_title(), onclick: clickToProjectHref.bind(null, m.projects_ecommerce_platform_title()) }
        ]
    },
    {
        name: "Cloud Development",
        expertise: 1,
        references: []
    },
    {
        name: "Kubernetes",
        expertise: 1,
        references: []
    },
    {
        name: "C++",
        expertise: 2,
        references: [
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_nutdetector_title(), onclick: clickToProjectHref.bind(null, m.projects_nutdetector_title()) }
        ]
    },
    {
        name: "Machine Learning",
        expertise: 1,
        references: [
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_nutdetector_title(), onclick: clickToProjectHref.bind(null, m.projects_nutdetector_title()) }
        ]
    },
    {
        name: "Image Processing",
        expertise: 1,
        references: [
            { text: m.experience_ktu(), href: '#experiences' },
            { text: m.projects_nutdetector_title(), onclick: clickToProjectHref.bind(null, m.projects_nutdetector_title()) }
        ]
    },
    {
        name: "CUDA",
        expertise: 1,
        references: [
            { text: m.projects_nutdetector_title(), onclick: clickToProjectHref.bind(null, m.projects_nutdetector_title()) }
        ]
    },
    {
        name: "Compiler Design",
        expertise: 2,
        references: [
            { text: m.experience_ktu(), href: '#experiences' }
        ]
    },
    {
        name: "Scrum",
        expertise: 2,
        references: [
            { text: m.experience_kivi(), href: '#experiences' }
        ]
    },
    {
        name: "Agile Project Management",
        expertise: 2,
        references: [
            { text: m.experience_kivi(), href: '#experiences' }
        ]
    },
];
export const languages = [
    {id:"TR", name: "Türkçe", icon:"/img/Turkey.svg"},
    {id:"EN", name: "English", icon:"/img/UK.svg"}
]
export const socialLinks = [
    {
        href: "https://www.linkedin.com/in/yusuf-ozer-59b23b304",
        title: "LinkedIn",
        type: "LinkedIn"
    },
    {
        href: "https://www.github.com/yozerpp",
        title: "Github",
        type: "Github",
        class: "rounded-full" // Note: Rename to 'className' if using in React
    },
    {
        href: "mailto:tipili-yusuf-ozer@hotmail.com",
        title: "Mail",
        type: "Mail"
    }
];