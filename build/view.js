(()=>{"use strict";var e,r={542:()=>{const e=(e,r,t)=>{const o=e.closest(r);null!==o&&t(o)},r=r=>{"false"===r.getAttribute("aria-expanded")?e(r,".wp-block-hizzle-accordion",(e=>{((e,r)=>{e.querySelectorAll(".hizzle-accordion__heading").forEach((e=>{const t=e===r?"true":"false";e.setAttribute("aria-expanded",t)}))})(e,r)})):r.setAttribute("aria-expanded","false")};var t;t=()=>{document.querySelectorAll(".hizzle-accordion__heading").forEach((t=>{try{t.addEventListener("click",(o=>{o.preventDefault(),e(t,".hizzle-accordion__heading",r)}))}catch(e){console.error(e)}}));const t=()=>{document.querySelectorAll(".hizzle-accordion__panel").forEach((e=>{e.style.setProperty("--hizzle-accordion-panel-max-height",e.scrollHeight+"px")}))};t(),window.addEventListener("resize",t)},"undefined"!=typeof document&&("complete"!==document.readyState&&"interactive"!==document.readyState?document.addEventListener("DOMContentLoaded",t):t())}},t={};function o(e){var a=t[e];if(void 0!==a)return a.exports;var n=t[e]={exports:{}};return r[e](n,n.exports,o),n.exports}o.m=r,e=[],o.O=(r,t,a,n)=>{if(!t){var i=1/0;for(s=0;s<e.length;s++){for(var[t,a,n]=e[s],c=!0,l=0;l<t.length;l++)(!1&n||i>=n)&&Object.keys(o.O).every((e=>o.O[e](t[l])))?t.splice(l--,1):(c=!1,n<i&&(i=n));if(c){e.splice(s--,1);var d=a();void 0!==d&&(r=d)}}return r}n=n||0;for(var s=e.length;s>0&&e[s-1][2]>n;s--)e[s]=e[s-1];e[s]=[t,a,n]},o.o=(e,r)=>Object.prototype.hasOwnProperty.call(e,r),(()=>{var e={692:0,431:0};o.O.j=r=>0===e[r];var r=(r,t)=>{var a,n,[i,c,l]=t,d=0;if(i.some((r=>0!==e[r]))){for(a in c)o.o(c,a)&&(o.m[a]=c[a]);if(l)var s=l(o)}for(r&&r(t);d<i.length;d++)n=i[d],o.o(e,n)&&e[n]&&e[n][0](),e[n]=0;return o.O(s)},t=globalThis.webpackChunkhizzle_accordion=globalThis.webpackChunkhizzle_accordion||[];t.forEach(r.bind(null,0)),t.push=r.bind(null,t.push.bind(t))})();var a=o.O(void 0,[431],(()=>o(542)));a=o.O(a)})();