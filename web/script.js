$(document).ready(function() {
  parseMd()
});

function parseMd() {
  var GITHUB = 'https://raw.githubusercontent.com/gto76/python-cheatsheet/master/README.md'
  jQuery.get(GITHUB, function(text) {
    var converter = new showdown.Converter()
    html = converter.makeHtml(text)
    aDiv = $('#main_container')
    nodes = $.parseHTML(html)
    aDiv.after(nodes);
    insertLinks()
    d3.selectAll("code").each(function() { hljs.highlightBlock(this); });
  });
}

function insertLinks() {
  $('h2').each(function() {
    aId = $(this).attr('id')
    $(this).append('<a href="#'+aId+'" name="'+aId+'">#</a>')
  })
}
