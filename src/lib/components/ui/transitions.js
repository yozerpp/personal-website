import {linear} from "svelte/easing";

const caretTemplate = document.createElement("span");
caretTemplate.innerHTML = '_';
caretTemplate.className = 'caret';
caretTemplate.style.display = 'inline-flex'
/**@param {string} fontSizeHint
 * @param {string} maxHeightHint
 * @return HTMLElement*/
function createCaret(fontSizeHint = '', maxHeightHint = ''){
    /**@type HTMLElement*/
    const ret = caretTemplate.cloneNode(true)
    const m = fontSizeHint.match(/^(\d+)(px|em|rem)$/);
    ret.style.setProperty("font-size", m ? parseFloat(m[1]) + m[2] : fontSizeHint, "important");
    ret.style.setProperty("max-height", maxHeightHint, "important");
    return ret;
}
/**
 *
 * @param {Element} node
 * @param {{delay: number, duration: number, deleteAfter?: boolean, easing: function(number):number}} params
 * @param {{direction:'in' | 'out' |'both'}} options
 * @return import("svelte/transition").TransitionConfig
 */

export function typewriter(node, {delay = 0, speed = 1, deleteAfter = false, easing = linear}, options){
    const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null)
    /**@type {{node: Node, content: string, ratio: number, oldStyle: {height: string, width: string}}[]}*/
    const textNodes = [];
    /** @type Node*/
    let node1;
    const re = new RegExp("^[\\n\\s\\t]+$")
    while ((node1 = walker.nextNode())) {
        if (node1.textContent.length === 0 || re.test(node1.textContent)) continue;
        textNodes.push({
            node: node1,
            content: node1.textContent,
            ratio: 0,
            oldStyle: {height: node1.parentElement.style.minHeight, width: node1.parentElement.style.minWidth}
        });
        // const d= node1.parentElement.style.display;
        // if(d === 'flex' || d ==='block') node1.parentElement.style.display = 'inline-' + d;
        // else node1.parentElement.style.display = 'inline-block';
        node1.parentElement.style.minWidth = node1.parentElement.clientWidth + 'px';
        node1.parentElement.style.minHeight = node1.parentElement.clientHeight + 'px';
        node1.textContent = '';
    }
    const totalLength = textNodes.map(n=>n.content.length).reduce((previousValue, currentValue)=>previousValue + currentValue,0);
    /** @type {{node: Node, content: string, ratio:number}[]} */
    textNodes.forEach(t=>t.ratio = t.content.length / totalLength);
    let nodeWithProps = textNodes.shift();
    nodeWithProps.node.after(createCaret(getComputedStyle(nodeWithProps.node.parentElement).fontSize, nodeWithProps.node.parentElement.style.minHeight))
    let oldRatios = 0;
    return options.direction !=='out'
        ? {
            delay,
            duration: totalLength * 10 / (speed!==0?speed:1),
            easing,
            tick: (t, u) => {
                if(!nodeWithProps) return;
                nodeWithProps.node.textContent = nodeWithProps.content.slice(0, Math.min(nodeWithProps.content.length, Math.round(nodeWithProps.content.length * (t-oldRatios) /nodeWithProps.ratio )))
                if(t >= nodeWithProps.ratio + oldRatios){
                    if(textNodes.length > 0 || deleteAfter) nodeWithProps.node.nextSibling.remove();
                    nodeWithProps.node.parentElement.style.minHeight = nodeWithProps.oldStyle.height.length === 0 ? nodeWithProps.oldStyle.height + 'px' : '';
                    nodeWithProps.node.parentElement.style.minWidth = nodeWithProps.oldStyle.width.length === 0 ? nodeWithProps.oldStyle.width + 'px' : '';
                    oldRatios += nodeWithProps.ratio;
                    nodeWithProps = textNodes.shift();
                    if(nodeWithProps)
                    nodeWithProps.node.after(createCaret(getComputedStyle(nodeWithProps.node.parentElement).fontSize, nodeWithProps.node.parentElement.style.minHeight));
                }
            }
        }
        : {duration: 0};
}