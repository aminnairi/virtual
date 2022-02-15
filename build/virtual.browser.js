!function(t){"use strict";
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
   */const e=t=>"[object String]"===Object.prototype.toString.call(t),r=t=>{const e=Object.prototype.toString.call(t);return"[object Undefined]"===e||"[object Null]"===e},i=t=>"[object Object]"===Object.prototype.toString.call(t),n=(t,e)=>r=>Object.prototype.hasOwnProperty.call(r,t)&&e(r[t]),o=t=>"[object Array]"===Object.prototype.toString.call(t),a=t=>{return i(t)&&(r=[n("identifier",e),n("name",e),n("children",o),n("attributes",i)],t=>i(tagret)&&r.every((e=>e(t))));var r},c=t=>{const e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e},l=t=>{if(e(t))return document.createTextNode(t);if(!a(t))return;const{identifier:r,name:i,attributes:n,children:o}=t,c=document.createElement(i);return Object.entries(n).forEach((([t,e])=>{c[t]=e})),o.forEach((t=>{c.appendChild(l(t))})),c.dataset.virtual=r,c},d=t=>{a(t)&&(c(t.attributes.onload)&&t.attributes.onload(),t.children.forEach((t=>{d(t)})))},u=t=>{a(t)&&(c(t.attributes.onunload)&&t.attributes.onunload(),t.children.forEach((t=>{u(t)})))},s=(t,i)=>n=>{if(r(n))return;if(r(t))return r(i)?void 0:(n.appendChild(l(i)),void d(i));if(e(t)){if(e(i)){if(t===i)return;return void(n.innerText=i)}return r(i)?void(n.innerText=""):(n.innerHTML="",n.appendChild(l(i)),void d(i))}if(!a(t))return;const o=document.querySelector(`[data-virtual="${t.identifier}"]`);if(o instanceof window.Element){if(r(i))return u(i),void n.removeChild(o);if(e(i))return n.innerHTML="",void(n.innerText=i);if(a(i)){if(t.name!==i.name)return u(t),n.replaceChild(l(i),o),void d(i);t.key!==i.key&&(u(t),d(i)),Object.entries(t.attributes).forEach((([t,e])=>{const n=i.attributes[t];r(n)?o.removeAttribute(t):e!==n&&(o[t]=n)})),Object.entries(i.attributes).forEach((([e,i])=>{const n=t.attributes[e];r(n)&&(o[e]=i)})),i.children.forEach(((e,r)=>{const i=t.children[r];s(i,e)(o)})),t.children.forEach(((t,e)=>{const r=i.children[e];if(!r){s(t,r)(o)}})),i.identifier=t.identifier}}};t.createApplication=t=>{let e;const r=({type:i,payload:n})=>{const o=t.update(t.state,{type:i,payload:n}),a=t.view(o,r);s(e,a)(t.element),e=a,t.state=o};e=t.view(t.state,r);return s(null,e)(t.element),r},t.createVirtualElement=({name:t,key:e,attributes:r,children:i})=>({identifier:window.crypto.randomUUID(),name:t,key:e,attributes:r,children:i}),Object.defineProperty(t,"__esModule",{value:!0})}(this["@aminnairi/virtual"]=this["@aminnairi/virtual"]||{});
