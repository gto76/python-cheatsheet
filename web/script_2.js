const TOC =
  '<strong>ToC</strong> = {\n' +
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dictionary</a>, <a href="#set">Set</a>, <a href="#tuple">Tuple</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>, <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regular_Exp</a>, <a href="#format">Format</a>, <a href="#numbers">Numbers</a>, <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#imports">Import</a>, <a href="#decorator">Decorator</a>, <a href="#class">Class</a>, <a href="#ducktypes">Duck_Types</a>, <a href="#enum">Enum</a>, <a href="#exceptions">Exception</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#exit">Exit</a>, <a href="#print">Print</a>, <a href="#input">Input</a>, <a href="#commandlinearguments">Command_Line_Arguments</a>, <a href="#open">Open</a>, <a href="#paths">Path</a>, <a href="#oscommands">OS_Commands</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#csv">CSV</a>, <a href="#sqlite">SQLite</a>, <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>, <a href="#memoryview">Memory_View</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#operator">Operator</a>, <a href="#introspection">Introspection</a>, <a href="#metaprogramming">Metaprograming</a>, <a href="#eval">Eval</a>, <a href="#coroutines">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>, <a href="#curses">Curses</a>, <a href="#logging">Logging</a>, <a href="#scraping">Scraping</a>, <a href="#web">Web</a>, <a href="#profiling">Profile</a>,\n' +
  '                       <a href="#numpy">NumPy</a>, <a href="#image">Image</a>, <a href="#audio">Audio</a>, <a href="#pygame">Games</a>, <a href="#pandas">Data</a>]\n' +
  '}\n';

const TOC_MOBILE =
  '<strong>ToC</strong> = {\n' +
  '    <strong><span class="hljs-string">\'1. Collections\'</span></strong>: [<a href="#list">List</a>, <a href="#dictionary">Dictionary</a>, <a href="#set">Set</a>,\n' +
  '                       <a href="#tuple">Tuple</a>, <a href="#range">Range</a>, <a href="#enumerate">Enumerate</a>,\n' +
  '                       <a href="#iterator">Iterator</a>, <a href="#generator">Generator</a>],\n' +
  '    <strong><span class="hljs-string">\'2. Types\'</span></strong>:       [<a href="#type">Type</a>, <a href="#string">String</a>, <a href="#regex">Regular_Exp</a>,\n' +
  '                       <a href="#format">Format</a>, <a href="#numbers">Numbers</a>,\n' +
  '                       <a href="#combinatorics">Combinatorics</a>, <a href="#datetime">Datetime</a>],\n' +
  '    <strong><span class="hljs-string">\'3. Syntax\'</span></strong>:      [<a href="#arguments">Args</a>, <a href="#inline">Inline</a>, <a href="#imports">Import</a>,\n' +
  '                       <a href="#decorator">Decorator</a>, <a href="#class">Class</a>,\n' +
  '                       <a href="#ducktypes">Duck_Types</a>, <a href="#enum">Enum</a>,\n' +
  '                       <a href="#exceptions">Exception</a>],\n' +
  '    <strong><span class="hljs-string">\'4. System\'</span></strong>:      [<a href="#exit">Exit</a>, <a href="#print">Print</a>, <a href="#input">Input</a>,\n' +
  '                       <a href="#commandlinearguments">Command_Line_Arguments</a>,\n' +
  '                       <a href="#open">Open</a>, <a href="#paths">Path</a>, <a href="#oscommands">OS_Commands</a>],\n' +
  '    <strong><span class="hljs-string">\'5. Data\'</span></strong>:        [<a href="#json">JSON</a>, <a href="#pickle">Pickle</a>, <a href="#csv">CSV</a>, <a href="#sqlite">SQLite</a>,\n' +
  '                       <a href="#bytes">Bytes</a>, <a href="#struct">Struct</a>, <a href="#array">Array</a>,\n' +
  '                       <a href="#memoryview">Memory_View</a>, <a href="#deque">Deque</a>],\n' +
  '    <strong><span class="hljs-string">\'6. Advanced\'</span></strong>:    [<a href="#threading">Threading</a>, <a href="#operator">Operator</a>,\n' +
  '                       <a href="#introspection">Introspection</a>,\n' +
  '                       <a href="#metaprogramming">Metaprograming</a>, <a href="#eval">Eval</a>,\n' +
  '                       <a href="#coroutines">Coroutine</a>],\n' +
  '    <strong><span class="hljs-string">\'7. Libraries\'</span></strong>:   [<a href="#progressbar">Progress_Bar</a>, <a href="#plot">Plot</a>, <a href="#table">Table</a>,\n' +
  '                       <a href="#curses">Curses</a>, <a href="#logging">Logging</a>, <a href="#scraping">Scraping</a>,\n' +
  '                       <a href="#web">Web</a>, <a href="#profiling">Profile</a>, <a href="#numpy">NumPy</a>,\n' +
  '                       <a href="#image">Image</a>, <a href="#audio">Audio</a>, <a href="#pygame">Games</a>, <a href="#pandas">Data</a>]\n' +
  '}\n';


var iOS = /iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

if (iOS) {
  var viewport_meta = document.getElementById('viewport-meta');
  viewport_meta.setAttribute('content', "initial-scale=0.55");
}

var isMobile = false;
// Device detection:
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

var TOC_SCREEN_WIDTH_CUTOFF = 667
var TOC_EM = '2em'

if (isMobile && window.screen.width < TOC_SCREEN_WIDTH_CUTOFF) {
    $(`code:contains(ToC)`).html(TOC_MOBILE).css("line-height", TOC_EM);
}

function updateToc() {
  if (isMobile && window.screen.width < TOC_SCREEN_WIDTH_CUTOFF) {
      $(`code:contains(ToC)`).html(TOC_MOBILE).css("line-height", TOC_EM);
  } else {
      $(`code:contains(ToC)`).html(TOC).css("line-height", TOC_EM);
  }
}
window.addEventListener("orientationchange", updateToc, false);

// ===== Scroll to Top ==== 
$(window).scroll(function() {
  if (isMobile && $(this).scrollTop() >= 480) {  // If mobile device and page is scrolled more than 520px.
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});

$('#return-to-top').click(function() {  // When arrow is clicked
  $('body,html').animate({
    scrollTop : 0                       // Scroll to top of body
  }, 500);
});
