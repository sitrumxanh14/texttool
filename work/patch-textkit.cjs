const fs = require('node:fs');
const file = 'D:/HOCTAP/vibecode/Codex/001/index.html';
let html = fs.readFileSync(file, 'utf8');
const changes = [{"from":"$('fileInput').addEventListener('change', function () { importFile($('fileInput').files[0]); });","to":"$('fileInput').addEventListener('change', function () { const file = $('fileInput').files[0]; $('fileInput').value = ''; importFile(file); });"},{"from":"    name = Array.from(name).slice(0, 180).join('');\n    if (!name.toLowerCase().endsWith('.txt')) name = name.slice(0, -4) + '.txt';","to":"    const stem = name.slice(0, -4);\n    let shortStem = '';\n    for (const character of stem) { if (shortStem.length + character.length > 170) break; shortStem += character; }\n    name = shortStem + '.txt';"},{"from":"    while (at !== -1) { positions.push(at); at = text.indexOf(marker, at + marker.length); }","to":"    while (at !== -1) {\n      positions.push(at);\n      if (direction !== 'right' && positions.length === occurrence) return at;\n      at = text.indexOf(marker, at + marker.length);\n    }"}];
for (const patch of changes) { if (html.split(patch.from).length !== 2) throw new Error('Patch target missing or ambiguous'); html = html.replace(patch.from, patch.to); }
fs.writeFileSync(file, html, 'utf8');
console.log(JSON.stringify({patched:changes.length,bytes:fs.statSync(file).size}));
