!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(exports):"function"==typeof define&&define.amd?define(["exports"],t):t((e="undefined"!=typeof globalThis?globalThis:e||self)["@aminnairi/virtual"]={})}(this,(function(e){"use strict";
/*!
   * Virtual DOM based JavaScript framework for building dynamic websites.
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
   */const t=e=>"[object String]"===Object.prototype.toString.call(e),r=e=>{const t=Object.prototype.toString.call(e);return"[object Undefined]"===t||"[object Null]"===t},n=e=>"[object Object]"===Object.prototype.toString.call(e),i=(e,t)=>r=>Object.prototype.hasOwnProperty.call(r,e)&&t(r[e]),o=e=>"[object Array]"===Object.prototype.toString.call(e),a=e=>{return n(e)&&(r=[i("identifier",t),i("name",t),i("children",o),i("attributes",n)],e=>n(tagret)&&r.every((t=>t(e))));var r},c=e=>{const t=Object.prototype.toString.call(e);return"[object Function]"===t||"[object AsyncFunction]"===t},d=e=>{if(t(e))return document.createTextNode(e);if(!a(e))return;const{identifier:r,name:n,attributes:i,children:o}=e,c=document.createElement(n);return Object.entries(i).forEach((([e,t])=>{c[e]=t})),o.forEach((e=>{c.appendChild(d(e))})),c.dataset.virtual=r,c},l=e=>{a(e)&&(c(e.attributes.onload)&&e.attributes.onload(),e.children.forEach((e=>{l(e)})))},u=e=>{a(e)&&(c(e.attributes.onunload)&&e.attributes.onunload(),e.children.forEach((e=>{u(e)})))},f=(e,n)=>i=>{if(r(i))return;if(r(e))return r(n)?void 0:(i.appendChild(d(n)),void l(n));if(t(e)){if(t(n)){if(e===n)return;return void(i.innerText=n)}return r(n)?void(i.innerText=""):(i.innerHTML="",i.appendChild(d(n)),void l(n))}if(!a(e))return;const o=document.querySelector(`[data-virtual="${e.identifier}"]`);if(o instanceof window.Element){if(r(n))return u(n),void i.removeChild(o);if(t(n))return i.innerHTML="",void(i.innerText=n);if(a(n)){if(e.key!==n.key)return u(e),i.replaceChild(d(n),o),void l(n);if(e.name!==n.name)return u(e),i.replaceChild(d(n),o),void l(n);Object.entries(e.attributes).forEach((([e,t])=>{const i=n.attributes[e];r(i)?o.removeAttribute(e):t!==i&&(o[e]=i)})),Object.entries(n.attributes).forEach((([t,n])=>{const i=e.attributes[t];r(i)&&(o[t]=n)})),n.children.forEach(((t,r)=>{const n=e.children[r];f(n,t)(o)})),e.children.forEach(((e,t)=>{const r=n.children[t];if(!r){f(e,r)(o)}})),n.identifier=e.identifier}}};e.createApplication=e=>{let t;const r=({type:n,payload:i})=>{const o=e.update(e.state,{type:n,payload:i}),a=e.view(o,r);f(t,a)(e.element),t=a,e.state=o};t=e.view(e.state,r);return f(null,t)(e.element),r},e.createVirtualElement=({name:e,key:t,attributes:r,children:n})=>({identifier:window.crypto.randomUUID(),name:e,key:t,attributes:r,children:n}),Object.defineProperty(e,"__esModule",{value:!0})}));
