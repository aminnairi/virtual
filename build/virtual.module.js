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
const t=t=>"[object String]"===Object.prototype.toString.call(t),e=t=>{const e=Object.prototype.toString.call(t);return"[object Undefined]"===e||"[object Null]"===e},r=t=>"[object Object]"===Object.prototype.toString.call(t),n=(t,e)=>r=>Object.prototype.hasOwnProperty.call(r,t)&&e(r[t]),i=t=>"[object Array]"===Object.prototype.toString.call(t),o=e=>{return r(e)&&(o=[n("identifier",t),n("name",t),n("children",i),n("attributes",r)],t=>r(tagret)&&o.every((e=>e(t))));var o},c=t=>{const e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e},a=({name:t,key:e,attributes:r,children:n})=>({identifier:window.crypto.randomUUID(),name:t,key:e,attributes:r,children:n}),d=e=>{if(t(e))return document.createTextNode(e);if(!o(e))return;const{identifier:r,name:n,attributes:i,children:c}=e,a=document.createElement(n);return Object.entries(i).forEach((([t,e])=>{a[t]=e})),c.forEach((t=>{a.appendChild(d(t))})),a.dataset.virtual=r,a},l=t=>{o(t)&&(c(t.attributes.onload)&&t.attributes.onload(),t.children.forEach((t=>{l(t)})))},u=t=>{o(t)&&(c(t.attributes.onunload)&&t.attributes.onunload(),t.children.forEach((t=>{u(t)})))},s=(r,n)=>i=>{if(e(i))return;if(e(r))return e(n)?void 0:(i.appendChild(d(n)),void l(n));if(t(r)){if(t(n)){if(r===n)return;return void(i.innerText=n)}return e(n)?void(i.innerText=""):(i.innerHTML="",i.appendChild(d(n)),void l(n))}if(!o(r))return;const c=document.querySelector(`[data-virtual="${r.identifier}"]`);if(c instanceof window.Element){if(e(n))return u(n),void i.removeChild(c);if(t(n))return i.innerHTML="",void(i.innerText=n);if(o(n)){if(r.name!==n.name)return u(r),i.replaceChild(d(n),c),void l(n);r.key!==n.key&&(u(r),l(n)),Object.entries(r.attributes).forEach((([t,r])=>{const i=n.attributes[t];e(i)?c.removeAttribute(t):r!==i&&(c[t]=i)})),Object.entries(n.attributes).forEach((([t,n])=>{const i=r.attributes[t];e(i)&&(c[t]=n)})),n.children.forEach(((t,e)=>{const n=r.children[e];s(n,t)(c)})),r.children.forEach(((t,e)=>{const r=n.children[e];if(!r){s(t,r)(c)}})),n.identifier=r.identifier}}},b=t=>{let e;const r=({type:n,payload:i})=>{const o=t.update(t.state,{type:n,payload:i}),c=t.view(o,r);s(e,c)(t.element),e=c,t.state=o};e=t.view(t.state,r);return s(null,e)(t.element),r};export{b as createApplication,a as createVirtualElement};
