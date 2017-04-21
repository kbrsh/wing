// Grid Demo

// template:
// console.log(Moon.compile("<div>  <span m-html='\"&lt;div class=&quot;col&quot;&gt;\" + col + \"&lt;/div&gt;\"'></span></div>"))
Moon.component("column", {
  props: ['col'],
  render: function(h) {
    var instance = this; return h("div", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, "  "), h("span", {attrs: {}, dom: {"innerHTML": ("" + ("&lt;div class=&quot;col&quot;&gt;" + instance.get("col") + "&lt;/div&gt;"))}}, {"shouldRender": true, "eventListeners": {}}, [])])
  }
});

// template:
// console.log(Moon.compile(`<div id="grid-demo">
// <button m-on:click="add">Add Column</button>
//   <button m-on:click="remove">Remove Column</button>
//   <div class="row">
//     <div class="col grid-demo-col center" m-for="col in cols">
//       <p>{{col}}</p>
//     </div>
//   </div>
//   <div class="row">
//     <div class="col">
//       <pre><code><span m-html="startHTML"></span>
// <column m-for="col in cols" col="{{col}}"></column>
// <span m-html="endHTML"></span></code></pre>
//     </div>
//   </div>
// </div>`))

// minified
// console.log(Moon.compile(`<div id="grid-demo"><button m-on:click="add">Add Column</button> <button m-on:click="remove">Remove Column</button> <div class="row"> <div class="col grid-demo-col center" m-for="col in cols"> <p>{{col}}</p></div></div><div class="row"> <div class="col"> <pre><code><span m-html="startHTML"></span>
// <column m-for="col in cols" col="{{col}}"></column>
// <span m-html="endHTML"></span></code></pre> </div></div></div>`))


new Moon({
  el: "#grid-demo",
  data: {
    startHTML: "&lt;div class=&quot;row&quot;&gt;",
    codeHTML: `<span>&lt;div class=&quot;col&quot;&gt;{{col}}&lt;/div&gt;</span>`,
    endHTML: "&lt;/div&gt;",
    cols: [1, 2, 3, 4]
  },
  methods: {
    add: function() {
      var cols = this.get('cols');
      cols.push(cols[cols.length - 1] + 1);
      this.set('cols', cols);
    },
    remove: function() {
      var cols = this.get('cols');
      if(cols.length - 1) {
        cols.pop();
        this.set('cols', cols);
      }
    }
  },
  render: function(h) {
    var instance = this; return h("div", {attrs: {"id": "grid-demo"}}, {"shouldRender": true, "eventListeners": {}}, [h("button", {attrs: {}}, {"shouldRender": true, "eventListeners": {"click": [function(event) {instance.callMethod("add", [event])}]}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, "Add Column")]), h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("button", {attrs: {}}, {"shouldRender": true, "eventListeners": {"click": [function(event) {instance.callMethod("remove", [event])}]}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, "Remove Column")]), h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("div", {attrs: {"class": "row"}}, {"shouldRender": true, "eventListeners": {}}, [].concat.apply([], [h("#text", {"shouldRender": false, "eventListeners": {}}, " "), instance.renderLoop((instance.get("cols")), function(col) { return h("div", {attrs: {"class": "col grid-demo-col center"}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("p", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": true, "eventListeners": {}}, "" + (col) + "")])]); })])), h("div", {attrs: {"class": "row"}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("div", {attrs: {"class": "col"}}, {"shouldRender": true, "eventListeners": {}}, [h("#text", {"shouldRender": false, "eventListeners": {}}, " "), h("pre", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [h("code", {attrs: {}}, {"shouldRender": true, "eventListeners": {}}, [].concat.apply([], [h("span", {attrs: {}, dom: {"innerHTML": ("" + (instance.get("startHTML")))}}, {"shouldRender": true, "eventListeners": {}}, []), h("#text", {"shouldRender": true, "eventListeners": {}}, "\n"), instance.renderLoop((instance.get("cols")), function(col) { return h("column", {attrs: {"col": "" + (col) + ""}}, {"shouldRender": true, "eventListeners": {}}, []); }), h("#text", {"shouldRender": true, "eventListeners": {}}, "\n"), h("span", {attrs: {}, dom: {"innerHTML": ("" + (instance.get("endHTML")))}}, {"shouldRender": true, "eventListeners": {}}, [])]))]), h("#text", {"shouldRender": false, "eventListeners": {}}, " ")])])])
  }
});

// Smooth Scrolling
(function() {

     'use strict';

    // Feature Test
    if ( 'querySelector' in document && 'addEventListener' in window && Array.prototype.forEach ) {

        // Function to animate the scroll
        var smoothScroll = function (anchor, duration) {

            // Calculate how far and how fast to scroll
            var startLocation = window.pageYOffset;
            var endLocation = anchor.offsetTop;
            var distance = endLocation - startLocation;
            var increments = distance/(duration/16);
            var stopAnimation;

            // Scroll the page by an increment, and check if it's time to stop
            var animateScroll = function () {
                window.scrollBy(0, increments);
                stopAnimation();
            };

            // If scrolling down
            if ( increments >= 0 ) {
                // Stop animation when you reach the anchor OR the bottom of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( (travelled >= (endLocation - increments)) || ((window.innerHeight + travelled) >= document.body.offsetHeight) ) {
                        clearInterval(runAnimation);
                    }
                };
            }
            // If scrolling up
            else {
                // Stop animation when you reach the anchor OR the top of the page
                stopAnimation = function () {
                    var travelled = window.pageYOffset;
                    if ( travelled <= (endLocation || 0) ) {
                        clearInterval(runAnimation);
                    }
                };
            }

            // Loop the animation function
            var runAnimation = setInterval(animateScroll, 16);

        };

        // Define smooth scroll links
        var scrollToggle = document.querySelectorAll('.scroll');

        // For each smooth scroll link
        [].forEach.call(scrollToggle, function (toggle) {

            // When the smooth scroll link is clicked
            toggle.addEventListener('click', function(e) {

                // Prevent the default link behavior
                e.preventDefault();

                // Get anchor link and calculate distance from the top
                var dataID = toggle.getAttribute('href');
                var dataTarget = document.querySelector(dataID);
                var dataSpeed = toggle.getAttribute('data-speed');

                // If the anchor exists
                if (dataTarget) {
                    // Scroll to the anchor
                    smoothScroll(dataTarget, dataSpeed || 500);
                }

            }, false);

        });

    }

 })();
