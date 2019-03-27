$(document).ready(function() {
  parseMd();
});

function parseMd() {
  var GITHUB =
    "https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md";
  jQuery.get(GITHUB, function(text) {
    var converter = new showdown.Converter();
    html = converter.makeHtml(text);
    aDiv = $("#main_container");
    nodes = $.parseHTML(html);
    aDiv.after(nodes);
    removeOrigToc();
    addToc();
    insertLinks();
    unindentBanner();
    d3.selectAll("code").each(function() {
      hljs.highlightBlock(this);
    });
  });
}

function removeOrigToc() {
  headerContents = $("#contents");
  contentsList = headerContents.next();
  headerContents.remove();
  contentsList.remove();
}

function insertLinks() {
  $("h2").each(function() {
    aId = $(this).attr("id");
    text = $(this).text();
    $(this).html('<a href="#' + aId + '" name="' + aId + '">#</a>' + text);
  });
}

function unindentBanner() {
  let montyImg = $("img").first();
  montyImg.parent().addClass("banner");
  let downloadPraragrapth = $("p").first();
  downloadPraragrapth.addClass("banner");
}

function addToc() {
  headerMain = $("#main");
  nodes = $.parseHTML(TOC);
  headerMain.before(nodes);
}

var TOC =
  "<br>" +
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
  "}\n" +
  "</code></pre>\n";
