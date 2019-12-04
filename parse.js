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
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dictionary</a>, <a href="#set">Set</a>, <a href="#tuple">Tuple</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>, <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regular_Exp</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#closure">Closure</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#ducktypes">Duck_Types</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exceptions</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#path">Path</a>, <a href="#oscommands">Command_Execution</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#csv">CSV</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">MemoryView</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#operator">Operator</a>, <a href="#introspection">Introspection</a>, <a href="#metaprograming">Metaprograming</a>, <a href="#eval">Eval</a>, <a href="#coroutine">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#curses">Curses</a>, <a href="#logging">Logging</a>, <a href="#scraping">Scraping</a>, <a href="#web">Web</a>, <a href="#profiling">Profile</a>,\n' +
  '                       <a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#animation">Animation</a>, <a href="#audio">Audio</a>, <a href="#synthesizer">Synthesizer</a>]\n' +
  '}\n' +
  '</code></pre>\n';

const OS_RENAME =
  'os.rename(from, to)                 <span class="hljs-comment"># Renames the file or directory.</span>\n' +
  'os.replace(from, to)                <span class="hljs-comment"># Same, but overwrites \'to\' if it exists.</span>\n';

const SHUTIL_COPY = 
  'shutil.copy(from, to)               <span class="hljs-comment"># Copies the file.</span>\n' +
  'shutil.copytree(from, to)           <span class="hljs-comment"># Copies the entire directory tree.</span>\n';

const EVAL =
  '<span class="hljs-meta">&gt;&gt;&gt; </span><span class="hljs-keyword">from</span> ast <span class="hljs-keyword">import</span> literal_eval\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'1 + 2\'</span>)\n' +
  '<span class="hljs-number">3</span>\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'[1, 2, 3]\'</span>)\n' +
  '[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]\n' +
  '<span class="hljs-meta">&gt;&gt;&gt; </span>literal_eval(<span class="hljs-string">\'abs(1)\'</span>)\n' +
  'ValueError: malformed node or string\n';

const LRU_CACHE = 
  '<span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> lru_cache\n' +
  '\n' +
  '<span class="hljs-meta">@lru_cache(maxsize=None)</span>\n' +
  '<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">fib</span><span class="hljs-params">(n)</span>:</span>\n' +
  '    <span class="hljs-keyword">return</span> n <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">2</span> <span class="hljs-keyword">else</span> fib(n-<span class="hljs-number">2</span>) + fib(n-<span class="hljs-number">1</span>)\n';

const TYPE =
  '<code class="python language-python hljs">&lt;class&gt; = type(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;parents_tuple&gt;, &lt;attributes_dict&gt;)</code>';

const DATACLASS = 
  '<code class="python language-python hljs"><span class="hljs-keyword">from</span> dataclasses <span class="hljs-keyword">import</span> make_dataclass\n' +
  '&lt;class&gt; = make_dataclass(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;coll_of_attribute_names&gt;)\n' +
  '&lt;class&gt; = make_dataclass(<span class="hljs-string">\'&lt;class_name&gt;\'</span>, &lt;coll_of_tuples&gt;)\n' +
  '&lt;tuple&gt; = (<span class="hljs-string">\'&lt;attr_name&gt;\'</span>, &lt;type&gt; [, &lt;default_value&gt;])</code>';


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
  var readme = readFile('README.md');
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
  setApaches(['<D>', '<T>', '<DT>', '<TD>', '<a>', '<n>']);
  $('code').not('.python').not('.text').not('.bash').not('.apache').addClass('python');
  $('code').each(function(index) {
      hljs.highlightBlock(this);
  });
  fixClasses();
  fixHighlights();
  preventPageBreaks();
  fixPageBreaksFile();
  fixPageBreaksStruct();
  insertPageBreaks();
}

function setApaches(elements) {
  for (el of elements) {
    $(`code:contains(${el})`).addClass('apache');
  }
}

function fixClasses() {
  // Changes class="hljs-keyword" to class="hljs-title" of 'class' keyword.
  $('.hljs-class').filter(':contains(class \')').find(':first-child').removeClass('hljs-keyword').addClass('hljs-title')
}

function fixHighlights() {
  $(`code:contains(os.rename)`).html(OS_RENAME);
  $(`code:contains(shutil.copy)`).html(SHUTIL_COPY);
  $(`code:contains(ValueError: malformed node)`).html(EVAL);
  $(`code:contains(@lru_cache(maxsize=None))`).html(LRU_CACHE);
  $(`code:contains(\'<class_name>\', <parents_tuple>, <attributes_dict>)`).html(TYPE);
  $(`code:contains(make_dataclass(\'<class_name>\')`).html(DATACLASS);
}

function preventPageBreaks() {
  $(':header').each(function(index) {
    var el = $(this)
    var untilPre = el.nextUntil('pre')
    var untilH2 = el.nextUntil('h2')
    if ((untilPre.length < untilH2.length) || el.prop('tagName') === 'H1') {
      untilPre.add(el).next().add(el).wrapAll("<div></div>");
    } else {
      untilH2.add(el).wrapAll("<div></div>");
    }
  });
}

function fixPageBreaksFile() {
  const modesDiv = $('#file').parent().parent().parent()
  move(modesDiv, 'file')
  move(modesDiv, 'exceptions-1')
}

function fixPageBreaksStruct() {
  const formatDiv = $('#floatingpointtypes').parent().parent().parent().parent()
  move(formatDiv, 'floatingpointtypes')
  move(formatDiv, 'integertypesusecapitalletterforunsignedtypestandardsizesareinbrackets')
  move(formatDiv, 'forstandardsizesstartformatstringwith')
}

function move(anchor_el, el_id) {
  const el = $('#'+el_id).parent()
  anchor_el.after(el)
}

function insertPageBreaks() {
  // insertPageBreakBefore('#libraries')
  insertPageBreakBefore('#print')
}

function insertPageBreakBefore(an_id) {
  $('<div class="pagebreak"></div>').insertBefore($(an_id).parent())
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
