const fs=require('node:fs');
const vm=require('node:vm');
const crypto=require('node:crypto');
const file='D:/HOCTAP/vibecode/Codex/001/index.html';
let html=fs.readFileSync(file,'utf8');
if(crypto.createHash('sha256').update(html).digest('hex')!=='43bec2f6fbf98336f89b08b92a93d87256b41d38fa6e476da592f09a72889ba1')throw Error('File changed; inspect before patch');
function once(a,b){if(html.split(a).length!==2)throw Error('Target not unique: '+a.slice(0,100));html=html.replace(a,()=>b);}
once('        <button id="filterToolButton" type="button" aria-pressed="false" aria-controls="filterOptions">Lọc dòng dữ liệu</button>', '        <button id="filterToolButton" type="button" aria-pressed="false" aria-controls="filterOptions">Lọc dòng dữ liệu</button>\n        <button id="affixToolButton" type="button" aria-pressed="false" aria-controls="affixOptions">Thêm đầu cuối</button>');
once('      </fieldset>\n    </fieldset>\n  </form>', '      </fieldset>\n      <fieldset id="affixOptions" hidden disabled><legend class="sr-only">Thêm đầu cuối</legend>\n        <div class="row">\n          <label class="field"><span>Thêm vào đầu</span><input id="prefixText" type="text" autocomplete="off" spellcheck="false" placeholder="Nhập nội dung hoặc để trống"></label>\n          <label class="field"><span>Thêm vào cuối</span><input id="suffixText" type="text" autocomplete="off" spellcheck="false" placeholder="Nhập nội dung hoặc để trống"></label>\n        </div>\n      </fieldset>\n    </fieldset>\n  </form>');
once("filterCaseSensitive: true }, options);", "filterCaseSensitive: true, prefixText: '', suffixText: '' }, options);");
once("['between', 'position', 'column', 'none'].includes(o.mode)","['between', 'position', 'column', 'none', 'affix'].includes(o.mode)");
once('    o.filterCaseSensitive = o.filterCaseSensitive !== false;', "    o.filterCaseSensitive = o.filterCaseSensitive !== false;\n    o.prefixText = String(o.prefixText == null ? '' : o.prefixText);\n    o.suffixText = String(o.suffixText == null ? '' : o.suffixText);");
once('  function extractLine(line, o) {', "  function extractLine(line, o) {\n    if (o.mode === 'affix') return { matched: true, value: o.prefixText + line + o.suffixText };");
once("  let activeTool = 'cut';", "  let activeTool = 'cut';\n  const toolLabels = { cut: 'Cắt dữ liệu', filter: 'Lọc dữ liệu', affix: 'Thêm đầu cuối' };");
once("return { mode: filtering ? 'none' : 'between',", "return { mode: activeTool === 'affix' ? 'affix' : filtering ? 'none' : 'between', prefixText: activeTool === 'affix' ? $('prefixText').value : '', suffixText: activeTool === 'affix' ? $('suffixText').value : '',");
const a=html.indexOf('  function updateMode() {');const b=html.indexOf('  function selectTool(tool)',a);
if(a<0||b<0)throw Error('Missing updateMode');
html=html.slice(0,a)+"  function updateMode() {\n    [['cut', 'cutOptions', 'cutToolButton'], ['filter', 'filterOptions', 'filterToolButton'], ['affix', 'affixOptions', 'affixToolButton']].forEach(function (tool) {\n      const selected = activeTool === tool[0];\n      $(tool[1]).hidden = !selected;\n      $(tool[1]).disabled = busy || !selected;\n      $(tool[2]).setAttribute('aria-pressed', String(selected));\n    });\n    if (!busy) $('runLabel').textContent = toolLabels[activeTool];\n  }\n"+html.slice(b);
once("$('runLabel').textContent = value ? label || 'Đang xử lý…' : activeTool === 'filter' ? 'Lọc dữ liệu' : 'Cắt dữ liệu';", "$('runLabel').textContent = value ? label || 'Đang xử lý…' : toolLabels[activeTool];");
once("  $('filterToolButton').addEventListener('click', function () { selectTool('filter'); });", "  $('filterToolButton').addEventListener('click', function () { selectTool('filter'); });\n  $('affixToolButton').addEventListener('click', function () { selectTool('affix'); });");
const scripts=Array.from(html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g),m=>m[1]);
for(const code of scripts)new vm.Script(code);
const ids=Array.from(html.matchAll(/\bid="([^"]+)"/g),m=>m[1]);
if(ids.length!==new Set(ids).size)throw Error('Duplicate DOM id');
for(const m of scripts[1].matchAll(/\$\('([^']+)'\)/g))if(!ids.includes(m[1]))throw Error('Missing DOM id '+m[1]);
fs.writeFileSync(file,html,'utf8');
console.log(JSON.stringify({file,bytes:Buffer.byteLength(html),sha256:crypto.createHash('sha256').update(html).digest('hex')}));

