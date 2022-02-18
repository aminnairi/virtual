/*!
 * Virtual DOM based JavaScript library for building dynamic websites.
 * Copyright (C) 2022 Amin NAIRI
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
const t=t=>"[object String]"===Object.prototype.toString.call(t),e=t=>{const e=Object.prototype.toString.call(t);return"[object Undefined]"===e||"[object Null]"===e},r=t=>"[object Object]"===Object.prototype.toString.call(t),n=(t,e)=>r=>Object.prototype.hasOwnProperty.call(r,t)&&e(r[t]),i=t=>"[object Array]"===Object.prototype.toString.call(t),o=e=>{return r(e)&&(o=[n("identifier",t),n("name",t),n("children",i),n("attributes",r)],t=>r(tagret)&&o.every((e=>e(t))));var o},a=t=>{const e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e},c=t=>(i(t)?t.forEach((t=>{c(t)})):r(t)&&Object.values(t).forEach((t=>{c(t)})),Object.freeze(t),t),l=t=>0===t.length?t:[...t].reduce(((t,e)=>e.match(/[A-Z]/)?""===t?e.toLowerCase():`${t}-${e.toLowerCase()}`:`${t}${e}`),""),u=({name:t,key:e,attributes:r,children:n})=>({identifier:window.crypto.randomUUID(),name:t,key:e,attributes:r,children:n}),d=e=>{if(t(e))return document.createTextNode(e);if(!o(e))return;const{identifier:r,name:n,attributes:i,children:a}=e,c=e.attributes.xmlns?document.createElementNS(e.attributes.xmlns,e.name):document.createElement(n);return Object.entries(i).forEach((([t,r])=>{"xmlns"!==t&&(e.attributes.xmlns?c.setAttribute(l(t),r):c[t]=r)})),a.forEach((t=>{c.appendChild(d(t))})),c.dataset.virtual=r,c},s=t=>{o(t)&&(a(t.attributes.onload)&&t.attributes.onload(),t.children.forEach((t=>{s(t)})))},b=t=>{o(t)&&(a(t.attributes.onunload)&&t.attributes.onunload(),t.children.forEach((t=>{b(t)})))},f=(r,n)=>i=>{if(e(i))return;if(e(r))return e(n)?void 0:(i.appendChild(d(n)),void s(n));if(t(r)){if(t(n)){if(r===n)return;return void(i.textContent=n)}return e(n)?void(i.textContent=""):(i.innerHTML="",i.appendChild(d(n)),void s(n))}if(!o(r))return;const a=document.querySelector(`[data-virtual="${r.identifier}"]`);if(a instanceof window.Element){if(e(n))return b(n),void i.removeChild(a);if(t(n))return i.innerHTML="",void(i.textContent=n);if(o(n)){if(r.name!==n.name||r.key!==n.key)return b(r),i.replaceChild(d(n),a),void s(n);Object.entries(r.attributes).forEach((([t,r])=>{const i=n.attributes[t];e(i)?a.removeAttribute(t):r!==i&&(n.attributes.xmlns?a.setAttribute(l(t),i):a[t]=i)})),Object.entries(n.attributes).forEach((([t,i])=>{const o=r.attributes[t];e(o)&&(n.attributes.xmlns?a.setAttribute(l(t),i):a[t]=i)})),n.children.forEach(((t,e)=>{const n=r.children[e];f(n,t)(a)})),r.children.forEach(((t,e)=>{const r=n.children[e];if(!r){f(t,r)(a)}})),n.identifier=r.identifier}}},h=t=>{let e;const r=({type:n,payload:i})=>{const o=t.update(t.state,{type:n,payload:i}),a=t.view(c(o),c(r));f(e,a)(t.element),e=a,t.state=o};e=t.view(c(t.state),c(r));return f(null,e)(t.element),r};export{h as createApplication,u as createVirtualElement};
