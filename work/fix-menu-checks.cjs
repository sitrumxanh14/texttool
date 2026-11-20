const fs=require('node:fs');
let test=fs.readFileSync('./work/verify-textkit.cjs','utf8');
test=test.replace("await $('#previewOutput').innerText()", "await $('#previewOutput').textContent()").replaceAll("await $('#statFiltered').innerText()", "await $('#statFiltered').textContent()");
fs.writeFileSync('./work/verify-textkit.cjs',test,'utf8');
console.log('Preview assertions read collapsed details as textContent');
