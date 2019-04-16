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


(function(d){function c(c){b.style.fontFamily=c;e.appendChild(b);f=b.clientWidth;e.removeChild(b);return f}var f,e=d.body,b=d.createElement("span");b.innerHTML=Array(100).join("wi");b.style.cssText=["position:absolute","width:auto","font-size:128px","left:-99999px"].join(" !important;");var g=c("monospace"),h=c("serif"),k=c("sans-serif");window.isFontAvailable=function(b){return g!==c(b+",monospace")||k!==c(b+",sans-serif")||h!==c(b+",serif")}})(document);

if (!isFontAvailable('Menlo')) {
  $(`code:contains(${DIAGRAM_1_B})`).html(DIAGRAM_1_A);
  $(`code:contains(${DIAGRAM_2_B})`).html(DIAGRAM_2_A);
  var htmlString = $('code:contains(ᴺᴱᵂ)').html().replace(/ᴺᴱᵂ/g, '');
  $('code:contains(ᴺᴱᵂ)').html(htmlString);
}

// ===== Scroll to Top ==== 
$(window).scroll(function() {
  if ($(this).scrollTop() >= 590) {      // If page is scrolled more than 50px
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


