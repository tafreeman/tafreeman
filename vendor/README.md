# vendor/

Third-party runtime, committed on purpose.

`react.production.min.js` and `react-dom.production.min.js` are byte-for-byte
copies of the UMD builds shipped by the `react` / `react-dom` versions pinned in
`package.json`. `npm run build:js` copies them out of `node_modules`; it refuses
to run if the installed version disagrees with the pin, and `npm run
verify:build` (CI) fails if what is committed here stops matching.

**Do not hand-edit these files, and do not bump them here.** Change the pin in
`package.json`, run `npm install && npm run build:js`, and commit the result.

They live in the repo because GitHub Pages serves this project exactly as it is
checked in — there is no deploy or bundle step. `index.html` previously loaded
React from unpkg, which meant first render depended on a third party being
reachable; when it was not, the page stayed blank.
