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

const DIAGRAM_5_A =
  "+----------------+----------------+---------------+----------------+-----------------+\n" +
  "|                |    {<float>}   |  {<float>:f}  |   {<float>:e}  |   {<float>:%}   |\n" +
  "+----------------+----------------+---------------+----------------+-----------------+\n" +
  "|    0.000056789 |   '5.6789e-05' |    '0.000057' | '5.678900e-05' |     '0.005679%' |\n" +
  "|    0.00056789  |   '0.00056789' |    '0.000568' | '5.678900e-04' |     '0.056789%' |\n" +
  "|    0.0056789   |   '0.0056789'  |    '0.005679' | '5.678900e-03' |     '0.567890%' |\n" +
  "|    0.056789    |   '0.056789'   |    '0.056789' | '5.678900e-02' |     '5.678900%' |\n" +
  "|    0.56789     |   '0.56789'    |    '0.567890' | '5.678900e-01' |    '56.789000%' |\n" +
  "|    5.6789      |   '5.6789'     |    '5.678900' | '5.678900e+00' |   '567.890000%' |\n" +
  "|   56.789       |  '56.789'      |   '56.789000' | '5.678900e+01' |  '5678.900000%' |\n" +
  "|  567.89        | '567.89'       |  '567.890000' | '5.678900e+02' | '56789.000000%' |\n" +
  "+----------------+----------------+---------------+----------------+-----------------+\n";

const DIAGRAM_5_B =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┓\n" +
  "┃                │    {&lt;float&gt;}   │  {&lt;float&gt;:f}  │   {&lt;float&gt;:e}  │   {&lt;float&gt;:%}   ┃\n" +
  "┠────────────────┼────────────────┼───────────────┼────────────────┼─────────────────┨\n" +
  "┃    0.000056789 │   '5.6789e-05' │    '0.000057' │ '5.678900e-05' │     '0.005679%' ┃\n" +
  "┃    0.00056789  │   '0.00056789' │    '0.000568' │ '5.678900e-04' │     '0.056789%' ┃\n" +
  "┃    0.0056789   │   '0.0056789'  │    '0.005679' │ '5.678900e-03' │     '0.567890%' ┃\n" +
  "┃    0.056789    │   '0.056789'   │    '0.056789' │ '5.678900e-02' │     '5.678900%' ┃\n" +
  "┃    0.56789     │   '0.56789'    │    '0.567890' │ '5.678900e-01' │    '56.789000%' ┃\n" +
  "┃    5.6789      │   '5.6789'     │    '5.678900' │ '5.678900e+00' │   '567.890000%' ┃\n" +
  "┃   56.789       │  '56.789'      │   '56.789000' │ '5.678900e+01' │  '5678.900000%' ┃\n" +
  "┃  567.89        │ '567.89'       │  '567.890000' │ '5.678900e+02' │ '56789.000000%' ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_6_A =
  "+----------------+----------------+---------------+----------------+-----------------+\n" +
  "|                |  {<float>:.2}  | {<float>:.2f} |  {<float>:.2e} |  {<float>:.2%}  |\n" +
  "+----------------+----------------+---------------+----------------+-----------------+\n" +
  "|    0.000056789 |   '5.7e-05'    |      '0.00'   |   '5.68e-05'   |       '0.01%'   |\n" +
  "|    0.00056789  |   '0.00057'    |      '0.00'   |   '5.68e-04'   |       '0.06%'   |\n" +
  "|    0.0056789   |   '0.0057'     |      '0.01'   |   '5.68e-03'   |       '0.57%'   |\n" +
  "|    0.056789    |   '0.057'      |      '0.06'   |   '5.68e-02'   |       '5.68%'   |\n" +
  "|    0.56789     |   '0.57'       |      '0.57'   |   '5.68e-01'   |      '56.79%'   |\n" +
  "|    5.6789      |   '5.7'        |      '5.68'   |   '5.68e+00'   |     '567.89%'   |\n" +
  "|   56.789       |   '5.7e+01'    |     '56.79'   |   '5.68e+01'   |    '5678.90%'   |\n" +
  "|  567.89        |   '5.7e+02'    |    '567.89'   |   '5.68e+02'   |   '56789.00%'   |\n" +
  "+----------------+----------------+---------------+----------------+-----------------+\n";

const DIAGRAM_6_B =
  "┏━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━┯━━━━━━━━━━━━━━━━━┓\n" +
  "┃                │  {&lt;float&gt;:.2}  │ {&lt;float&gt;:.2f} │  {&lt;float&gt;:.2e} │  {&lt;float&gt;:.2%}  ┃\n" +
  "┠────────────────┼────────────────┼───────────────┼────────────────┼─────────────────┨\n" +
  "┃    0.000056789 │   '5.7e-05'    │      '0.00'   │   '5.68e-05'   │       '0.01%'   ┃\n" +
  "┃    0.00056789  │   '0.00057'    │      '0.00'   │   '5.68e-04'   │       '0.06%'   ┃\n" +
  "┃    0.0056789   │   '0.0057'     │      '0.01'   │   '5.68e-03'   │       '0.57%'   ┃\n" +
  "┃    0.056789    │   '0.057'      │      '0.06'   │   '5.68e-02'   │       '5.68%'   ┃\n" +
  "┃    0.56789     │   '0.57'       │      '0.57'   │   '5.68e-01'   │      '56.79%'   ┃\n" +
  "┃    5.6789      │   '5.7'        │      '5.68'   │   '5.68e+00'   │     '567.89%'   ┃\n" +
  "┃   56.789       │   '5.7e+01'    │     '56.79'   │   '5.68e+01'   │    '5678.90%'   ┃\n" +
  "┃  567.89        │   '5.7e+02'    │    '567.89'   │   '5.68e+02'   │   '56789.00%'   ┃\n" +
  "┗━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━┷━━━━━━━━━━━━━━━━━┛\n";

const DIAGRAM_7_A =
  '+------------+----------+------------+----------+--------------+\n' +
  '|            | Iterable | Collection | Sequence | abc.Sequence |\n' +
  '+------------+----------+------------+----------+--------------+\n';

const DIAGRAM_7_B =
  '┏━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━━━┯━━━━━━━━━━┯━━━━━━━━━━━━━━┓\n' +
  '┃            │ Iterable │ Collection │ Sequence │ abc.Sequence ┃\n' +
  '┠────────────┼──────────┼────────────┼──────────┼──────────────┨\n' +
  '┃ iter()     │    !     │     !      │    ✓     │      ✓       ┃\n' +
  '┃ contains() │    ✓     │     ✓      │    ✓     │      ✓       ┃\n' +
  '┃ len()      │          │     !      │    !     │      !       ┃\n' +
  '┃ getitem()  │          │            │    !     │      !       ┃\n' +
  '┃ reversed() │          │            │    ✓     │      ✓       ┃\n' +
  '┃ index()    │          │            │          │      ✓       ┃\n' +
  '┃ count()    │          │            │          │      ✓       ┃\n' +
  '┗━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━━━┷━━━━━━━━━━┷━━━━━━━━━━━━━━┛\n';


// isFontAvailable:
(function(d){function c(c){b.style.fontFamily=c;e.appendChild(b);f=b.clientWidth;e.removeChild(b);return f}var f,e=d.body,b=d.createElement("span");b.innerHTML=Array(100).join("wi");b.style.cssText=["position:absolute","width:auto","font-size:128px","left:-99999px"].join(" !important;");var g=c("monospace"),h=c("serif"),k=c("sans-serif");window.isFontAvailable=function(b){return g!==c(b+",monospace")||k!==c(b+",sans-serif")||h!==c(b+",serif")}})(document);

if (isFontAvailable('Menlo')) {
  $(`code:contains(${DIAGRAM_1_A})`).html(DIAGRAM_1_B);
  $(`code:contains(${DIAGRAM_2_A})`).html(DIAGRAM_2_B);
  $(`code:contains(${DIAGRAM_3_A})`).html(DIAGRAM_3_B);
  $(`code:contains(${DIAGRAM_4_A})`).html(DIAGRAM_4_B);
  $(`code:contains(${DIAGRAM_5_A})`).html(DIAGRAM_5_B);
  $(`code:contains(${DIAGRAM_6_A})`).html(DIAGRAM_6_B);
  $(`code:contains(${DIAGRAM_7_A})`).html(DIAGRAM_7_B);
}

var isMobile = false;
// Device detection:
if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) 
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) { 
    isMobile = true;
}

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
