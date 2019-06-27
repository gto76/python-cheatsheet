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
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regex</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#closure">Closure</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#ducktypes">Duck_Types</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exceptions</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#path">Path</a>, <a href="#commandexecution">Command_Execution</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#csv">CSV</a>, <a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">MemoryView</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#introspection">Introspection</a>, <a href="#metaprograming">Metaprograming</a>, <a href="#operator">Operator</a>, <a href="#eval">Eval</a>, <a href="#coroutine">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#curses">Curses</a>, <a href="#logging">Logging</a>, <a href="#scraping">Scraping</a>, <a href="#web">Web</a>, <a href="#profile">Profile</a>,\n' +
  '                       <a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#audio">Audio</a>]\n' +
  '}\n' +
  '</code></pre>\n';

const DIAGRAM_1_A = 
  '+---------+-------------+\n' +
  '| Classes | Metaclasses |\n' +
  '+---------+-------------|\n' +
  '| MyClass > MyMetaClass |\n' +
  '|         |     v       |\n' +
  '|  object ---> type <+  |\n' +
  '|         |    ^ +---+  |\n' +
  '|   str -------+        |\n' +
  '+---------+-------------+\n';

const DIAGRAM_1_B =
  '┏━━━━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃ Classes │ Metaclasses ┃\n' +
  '┠─────────┼─────────────┨\n' +
  '┃ MyClass → MyMetaClass ┃\n' +
  '┃         │     ↓       ┃\n' +
  '┃  object ───→ type ←╮  ┃\n' +
  '┃         │    ↑ ╰───╯  ┃\n' +
  '┃   str ───────╯        ┃\n' +
  '┗━━━━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_2_A =
  '+---------+-------------+\n' +
  '| Classes | Metaclasses |\n' +
  '+---------+-------------|\n' +
  '| MyClass | MyMetaClass |\n' +
  '|    v    |     v       |\n' +
  '|  object <--- type     |\n' +
  '|    ^    |             |\n' +
  '|   str   |             |\n' +
  '+---------+-------------+\n';

const DIAGRAM_2_B =
  '┏━━━━━━━━━┯━━━━━━━━━━━━━┓\n' +
  '┃ Classes │ Metaclasses ┃\n' +
  '┠─────────┼─────────────┨\n' +
  '┃ MyClass │ MyMetaClass ┃\n' +
  '┃    ↓    │     ↓       ┃\n' +
  '┃  object ←─── type     ┃\n' +
  '┃    ↑    │             ┃\n' +
  '┃   str   │             ┃\n' +
  '┗━━━━━━━━━┷━━━━━━━━━━━━━┛\n';

const DIAGRAM_3_A =
  '+------------------+----------+------------+----------+\n' +
  '|                  | Sequence | Collection | Iterable |\n' +
  '+------------------+----------+------------+----------+\n' +
  '| list, range, str |   yes    |    yes     |   yes    |\n' +
  '| dict, set        |          |    yes     |   yes    |\n' +
  '| iter             |          |            |   yes    |\n' +
  '+------------------+----------+------------+----------+\n';

const DIAGRAM_3_B =
  '┏━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━┓\n' +
  '┃                  │ Sequence │ Collection │ Iterable ┃\n' +
  '┠──────────────────┼──────────┼────────────┼──────────┨\n' +
  '┃ list, range, str │    ✓     │     ✓      │    ✓     ┃\n' +
  '┃ dict, set        │          │     ✓      │    ✓     ┃\n' +
  '┃ iter             │          │            │    ✓     ┃\n' +
  '┗━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━┛\n';

const DIAGRAM_4_A =
  '+--------------------+----------+----------+------+---------+--------+\n' +
  '|                    | Integral | Rational | Real | Complex | Number |\n' +
  '+--------------------+----------+----------+------+---------+--------+\n' +
  '| int                |   yes    |   yes    | yes  |   yes   |  yes   |\n' +
  '| fractions.Fraction |          |   yes    | yes  |   yes   |  yes   |\n' +
  '| float              |          |          | yes  |   yes   |  yes   |\n' +
  '| complex            |          |          |      |   yes   |  yes   |\n' +
  '+--------------------+----------+----------+------+---------+--------+\n';

const DIAGRAM_4_B =
  '┏━━━━━━━━━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━┯━━━━━━━━━┯━━━━━━━━┓\n' +
  '┃                    │ Integral │ Rational │ Real │ Complex │ Number ┃\n' +
  '┠────────────────────┼──────────┼──────────┼──────┼─────────┼────────┨\n' +
  '┃ int                │    ✓     │    ✓     │  ✓   │    ✓    │   ✓    ┃\n' +
  '┃ fractions.Fraction │          │    ✓     │  ✓   │    ✓    │   ✓    ┃\n' +
  '┃ float              │          │          │  ✓   │    ✓    │   ✓    ┃\n' +
  '┃ complex            │          │          │      │    ✓    │   ✓    ┃\n' +
  '┗━━━━━━━━━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━┷━━━━━━━━━┷━━━━━━━━┛\n';


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
  readme = switchClassDiagrams(readme);
  const converter = new showdown.Converter();
  return converter.makeHtml(readme);
}

function switchClassDiagrams(readme) {
  readme = readme.replace(DIAGRAM_1_A, DIAGRAM_1_B)
  readme = readme.replace(DIAGRAM_2_A, DIAGRAM_2_B)
  readme = readme.replace(DIAGRAM_3_A, DIAGRAM_3_B)
  readme = readme.replace(DIAGRAM_4_A, DIAGRAM_4_B)
  return readme
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
  fixClasses()
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
