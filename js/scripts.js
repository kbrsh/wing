var STR_RE = /(["'`])((?:.|\n)*?)\1/g;
var HTML_COMMENT_RE = /(\&lt;\!\-\-(?:(?:.|\n)*)\-\-\&gt;)/g;
var HTML_ATTRIBUTE_RE = /(\S+)=["']?((?:.(?!["']?\s+(?:\S+)=|[>"']))+.)["']?/g;
var HTML_TAG_RE = /(&lt;\/?[\w\d-]*?)(\s(?:.|\n)*?)?(\/?&gt;)/g;

var code = document.getElementsByTagName("code");

var compile = function(val, lang) {
  var compiled = val;

  compiled = compiled.replace(STR_RE, "<span class=\"string\">$1$2$1</span>");

  compiled = compiled.replace(HTML_COMMENT_RE, "<span class=\"comment\">$1</span>");
  compiled = compiled.replace(HTML_TAG_RE, function(match, start, content, end) {
    if(content === undefined) {
      content = "";
    } else {
      content = content.replace(HTML_ATTRIBUTE_RE, function(match, name, value) {
        if(value === "string") {
          return match;
        } else {
          if(value === undefined) {
            value = "";
          } else {
            value = "=" + value;
          }
          return "<span class=\"global\">" + name + "</span>" + value;
        }
      });
    }

    return "<span class=\"method\">" + start + "</span>" + content + "<span class=\"method\">" + end + "</span>";
  });


  return compiled;
}

for(var i = 0; i < code.length; i++) {
  var el = code[i];
  el.innerHTML = compile(el.innerHTML, 'html');
}

new Moon({
  el: "#grid-demo",
  data: {
    cols: [1, 2, 3, 4]
  },
  methods: {
    add: function() {
      var cols = this.get('cols');
      var newCol = cols.length + 1;
      if(newCol < 13) {
        cols.push(newCol);
        this.set('cols', cols);
      }
    },
    remove: function() {
      var cols = this.get('cols');
      if(cols.length > 1) {
        cols.pop();
        this.set('cols', cols);
      }
    }
  },
  render: function(h) {
    var instance = this; var cols = instance.get("cols"); return h("div", {attrs: {"id": "grid-demo"}}, {"shouldRender": true, "eventListeners": {}}, [h("button", {attrs: {}}, {"shouldRender": true, "eventListeners": {"click": [function(event) {instance.callMethod("add", [event])}]}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, "Add Column")]), h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("button", {attrs: {}}, {"shouldRender": true, "eventListeners": {"click": [function(event) {instance.callMethod("remove", [event])}]}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, "Remove Column")]), h("div", {attrs: {"class": "row"}}, {"shouldRender": true, "eventListeners": {}}, [].concat.apply([], [instance.renderLoop(cols, function(col) { return h("div", {attrs: {"class": "col grid-demo-col center"}}, {"shouldRender": true, "eventListeners": {}}, [h("p", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": true, "eventListeners": {}}, "" + col + "")])]); })])), h("div", {attrs: {"class": "row"}}, {"shouldRender": true, "eventListeners": {}}, [h("div", {attrs: {"class": "col"}}, {"shouldRender": true, "eventListeners": {}}, [h("pre", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("code", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [].concat.apply([], [h("#text", {"shouldRender": true, "eventListeners": {}}, "<div class=\"row\">\n"), instance.renderLoop(cols, function(col) { return h("span", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": true, "eventListeners": {}}, "\n  <div class=\"col\">" + col + "</div>\n")]); }), h("#text", {"shouldRender": true, "eventListeners": {}}, "\n</div>")]))])])])])
  }
});
