$(document).ready(function() {
  parseMd()
});

// parseMd()

function parseMd() {
  var GITHUB = 'https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md'
  var RAWGIT = "https://rawgit.com/gto76/python-cheatsheet/master/README.md"
  jQuery.get(GITHUB, function(text) {
    var converter = new showdown.Converter()
    // text = '#hello, markdown!'
    // var converter = new showdown.Converter({extensions: ['prettify']})
    html = converter.makeHtml(text)
    aDiv = $('#bla')
    nodes = $.parseHTML(html)
    aDiv.after(nodes);
    // PR.prettyPrint()
    insertLinks()
    // $("code").removeClass("xml")
    // $.getScript("https://bost.ocks.org/mike/highlight.min.js")
    // hljs.configure({
      // languages: ['python']
    // })
    // hljs.initHighlighting();

    // d3.selectAll("code:not([class])").classed("javascript", 1);

    // d3.selectAll("code").classed("javascript", 1);

    d3.selectAll("code").each(function() { hljs.highlightBlock(this); });

  });
}

// function parseMd() {
//   var GITHUB = 'https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md'
//   var RAWGIT = "https://rawgit.com/gto76/python-cheatsheet/master/README.md"
//   jQuery.get(GITHUB, function(text) {
//     var converter = new showdown.Converter({extensions: ['prettify']})
//     // text = '#hello, markdown!'
//     html = converter.makeHtml(text)
//     aDiv = $('#bla')
//     nodes = $.parseHTML(html)
//     aDiv.after(nodes);
//     PR.prettyPrint()
//     insertLinks()
//   });
// }

function insertLinks() {
  $('h2').each(function() {
    // title = $(this).text()
    aId = $(this).attr('id')
    // titleNoSpace = title.replace(" ", "-");
    $(this).append('<a href="#'+aId+'" name="'+aId+'">#</a>')
  })
}
