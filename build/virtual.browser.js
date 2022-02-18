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
   */const e=t=>"[object String]"===Object.prototype.toString.call(t),r=t=>{const e=Object.prototype.toString.call(t);return"[object Undefined]"===e||"[object Null]"===e},n=t=>"[object Object]"===Object.prototype.toString.call(t),i=(t,e)=>r=>Object.prototype.hasOwnProperty.call(r,t)&&e(r[t]),o=t=>"[object Array]"===Object.prototype.toString.call(t),a=t=>{return n(t)&&(r=[i("identifier",e),i("name",e),i("children",o),i("attributes",n)],t=>n(tagret)&&r.every((e=>e(t))));var r},c=t=>{const e=Object.prototype.toString.call(t);return"[object Function]"===e||"[object AsyncFunction]"===e},l=t=>(o(t)?t.forEach((t=>{l(t)})):n(t)&&Object.values(t).forEach((t=>{l(t)})),Object.freeze(t),t),u=t=>0===t.length?t:[...t].reduce(((t,e)=>e.match(/[A-Z]/)?""===t?e.toLowerCase():`${t}-${e.toLowerCase()}`:`${t}${e}`),""),s=t=>{if(e(t))return document.createTextNode(t);if(!a(t))return;const{identifier:r,name:n,attributes:i,children:o}=t,c=t.attributes.xmlns?document.createElementNS(t.attributes.xmlns,t.name):document.createElement(n);return Object.entries(i).forEach((([e,r])=>{"xmlns"!==e&&(t.attributes.xmlns?c.setAttribute(u(e),r):c[e]=r)})),o.forEach((t=>{c.appendChild(s(t))})),c.dataset.virtual=r,c},d=t=>{a(t)&&(c(t.attributes.onload)&&t.attributes.onload(),t.children.forEach((t=>{d(t)})))},b=t=>{a(t)&&(c(t.attributes.onunload)&&t.attributes.onunload(),t.children.forEach((t=>{b(t)})))},f=(t,n)=>i=>{if(r(i))return;if(r(t))return r(n)?void 0:(i.appendChild(s(n)),void d(n));if(e(t)){if(e(n)){if(t===n)return;return void(i.textContent=n)}return r(n)?void(i.textContent=""):(i.innerHTML="",i.appendChild(s(n)),void d(n))}if(!a(t))return;const o=document.querySelector(`[data-virtual="${t.identifier}"]`);if(o instanceof window.Element){if(r(n))return b(n),void i.removeChild(o);if(e(n))return i.innerHTML="",void(i.textContent=n);if(a(n)){if(t.name!==n.name||t.key!==n.key)return b(t),i.replaceChild(s(n),o),void d(n);Object.entries(t.attributes).forEach((([t,e])=>{const i=n.attributes[t];r(i)?o.removeAttribute(t):e!==i&&(n.attributes.xmlns?o.setAttribute(u(t),i):o[t]=i)})),Object.entries(n.attributes).forEach((([e,i])=>{const a=t.attributes[e];r(a)&&(n.attributes.xmlns?o.setAttribute(u(e),i):o[e]=i)})),n.children.forEach(((e,r)=>{const n=t.children[r];f(n,e)(o)})),t.children.forEach(((t,e)=>{const r=n.children[e];if(!r){f(t,r)(o)}})),n.identifier=t.identifier}}};t.createApplication=t=>{let e;const r=({type:n,payload:i})=>{const o=t.update(t.state,{type:n,payload:i}),a=t.view(l(o),l(r));f(e,a)(t.element),e=a,t.state=o};e=t.view(l(t.state),l(r));return f(null,e)(t.element),r},t.createVirtualElement=({name:t,key:e,attributes:r,children:n})=>({identifier:window.crypto.randomUUID(),name:t,key:e,attributes:r,children:n}),Object.defineProperty(t,"__esModule",{value:!0})}(this["@aminnairi/virtual"]=this["@aminnairi/virtual"]||{});
