#!/usr/bin/env node
// Usage: node test.js
// Script that creates index.html out of web/template.html and README.md.
// It is written in JS because this code used to be executed on the client side.
// To install dependencies run:
// $ npm install -g jsdom jquery showdown highlightjs
// If running on mac and modules cant be found after instalation add:
// export NODE_PATH=/usr/local/lib/node_modules
// to the ~/.bash_profile or ~/.bashrc file and run '$ bash'.


const fs = require('fs');
const jsdom = require('jsdom');
const showdown  = require('showdown');
const hljs = require('highlightjs');


const TOC =
  '<br>' +
  '<h2 id="toc">Contents</h2>\n' +
  '<pre><code class="hljs bash"><strong>ToC</strong> = {\n' +
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dict</a>, <a href="#set">Set</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>, <a href="#namedtuple">Namedtuple</a>, <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regex</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>ᴺᴱᵂ],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Arguments</a>, <a href="#splatoperator">Splat</a>, <a href="#inline">Inline</a>, <a href="#closure">Closure</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exceptions</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#path">Path</a>ᴺᴱᵂ, <a href="#commandexecution">Command_Execution</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#csv">CSV</a>, <a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">MemoryView</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#introspection">Introspection</a>, <a href="#metaprograming">Metaprograming</a>, <a href="#operator">Operator</a>, <a href="#eval">Eval</a>, <a href="#coroutine">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#curses">Curses</a>, <a href="#logging">Logging</a>ᴺᴱᵂ, <a href="#scraping">Scraping</a>, <a href="#web">Web</a>, <a href="#profile">Profile</a>,\n' +
  '                       <a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#audio">Audio</a>]\n' +
  '}\n' +
  '</code></pre>\n';

const MRO =
  '<pre><code class="python language-python hljs"><span class="hljs-meta">&gt;&gt;&gt; </span>C.mro()\n[&lt;<span class="hljs-class"><span class="hljs-title">class</span> \'<span class="hljs-title">C</span>\'&gt;, &lt;<span class="hljs-title">class</span> \'<span class="hljs-title">A</span>\'&gt;, &lt;<span class="hljs-title">class</span> \'<span class="hljs-title">B</span>\'&gt;, &lt;<span class="hljs-title">class</span> \'<span class="hljs-title">object</span>\'&gt;]</span></code>\n</pre>\n'

function main() {
  const html = getMd();
  initDom(html);
  modifyPage();
  const template = readFile('web/template.html');
  const tokens = template.split('<div id=main_container></div>');
  const text = `${tokens[0]} ${document.body.innerHTML} ${tokens[1]}`;
  writeToFile('index.html', text);
}

function initDom(html) {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  global.$ = $;
  global.document = dom.window.document;
}

function getMd() {
  const readme = readFile('README.md');
  const converter = new showdown.Converter();
  return converter.makeHtml(readme);
}

function modifyPage() {
  removeOrigToc();
  addToc();
  insertLinks();
  unindentBanner();
  highlightCode(); 
}

function removeOrigToc() {
  const headerContents = $('#contents');
  const contentsList = headerContents.next();
  headerContents.remove();
  contentsList.remove();
}

function addToc() {
  const nodes = $.parseHTML(TOC);
  $('#main').before(nodes);
}

function insertLinks() {
  $('h2').each(function() {
    const aId = $(this).attr('id');
    const text = $(this).text();
    const line = `<a href="#${aId}" name="${aId}">#</a>${text}`;
    $(this).html(line);
  });
}

function unindentBanner() {
  const montyImg = $('img').first();
  montyImg.parent().addClass('banner');
  const downloadPraragrapth = $('p').first();
  downloadPraragrapth.addClass('banner');
}

function highlightCode() {
  setApache('<D>')
  setApache('<T>')
  setApache('<DT>')
  setApache('<TD>')
  setApache('<a>')
  setApache('<n>')
  $('code').not('.python').not('.text').not('.bash').not('.apache').addClass('python');
  $('code').each(function(index) {
      hljs.highlightBlock(this);
  });
  $('#copy').prev().remove()
  const nodes = $.parseHTML(MRO);
  $('#copy').before(nodes);
}

function setApache(codeContents) {
  $(`code:contains(${codeContents})`).addClass('apache');
}

function readFile(filename) {
  try {  
    return fs.readFileSync(filename, 'utf8');
  } catch(e) {
    console.error('Error:', e.stack);
  }
}

function writeToFile(filename, text) {
  try {  
    return fs.writeFileSync(filename, text, 'utf8');
  } catch(e) {
    console.error('Error:', e.stack);
  }
}

main();
