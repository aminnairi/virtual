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
 */
import {resolve} from "path";
import {terser} from "rollup-plugin-terser";
import remove from "rollup-plugin-delete";

export default {
  input: resolve("sources", "index.js"),
  plugins: [
    remove({
      targets: [
        resolve("build", "**", "*")
      ]
    }),
    terser()
  ],
  output: [
    {
      file: resolve("build", "virtual.browser.js"),
      format: "iife",
      name: "@aminnairi/virtual",
      extend: true
    },
    {
      file: resolve("build", "virtual.module.js"),
      format: "esm"
    }
  ]
};
