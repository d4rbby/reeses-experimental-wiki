/*
@project DorpWiki
@version 1.0.0
@author Carver Harrison
@licence bsd-3-clause
@site https://dorper.me/p/wiki
@file Javascript for DorpWiki
*/

// Initializing Message
console.log("Initializing...");

// Variables
var config = {};

// AJAX - Get XMLHTTP object
function jobj() {
  if (window.XMLHttpRequest) {
      // code for modern browsers
      return new XMLHttpRequest();
   } else {
      // code for old IE browsers
      return new ActiveXObject("Microsoft.XMLHTTP");
  }
}

// AJAX - HTTP GET
function jget(url, cb) {
  var xhttp = jobj();
  xhttp.open("GET", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      cb(this.responseText);
    }
    else if (this.readyState == 4 && this.status == 200) {
      console.error("AJAX Error: Could not GET '"+url+"'.");
    }
  };
}

// On window load
window.addEventListener('load', function() {  
  jget('CONFIG', function(data) {
    // Load config
    data.split('\n').forEach(function(l) {
      var kv = l.split('=');
      config[kv[0]] = kv[1];
    });
    
    // Get wiki title
    var ptitle = window.location.href.split('?')[1];
    if (!ptitle) {
      ptitle = config.homepage;
    }
    
    // Load wiki page
    jget('pages/'+ptitle+'.md', function(pbody) {
      require("lib/marked/marked.js", function(marked) {
        // Convert the markdown to HTML
        var pbodym = marked(pbody);
        
        // Insert content into the DOM
        document.getElementById('title').innerHTML = ptitle;
        document.getElementById('content').innerHTML = pbodym;      

        // Setup KaTeX
        require('https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.8.3/katex.min.js', function() {
         require('lib/katex/autoload.js', function(renderMathInElement) {
            renderMathInElement(document.body, { delimiters: [
              {left: "$$", right: "$$", display: true},
              {left: "$", right: "$", display: false}
            ]});
          });
        });
        
        // Setup Highlight.js
        require('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js', function(hljs) {
          hljs.initHighlighting();
        });
        
        // Setup Bindings
        document.querySelectorAll('[data-bind="page markdown"]').forEach(function (i) {
          i.innerHTML = pbody;
        });

        document.querySelectorAll('[data-bind="page html"]').forEach(function (i) {
          i.innerHTML = pbodym;
        });
        
        document.querySelectorAll('[data-bind="title"]').forEach(function (i) {
          i.innerText = ptitle;
        });
        
        jget("https://api.github.com/repos/carverh/wiki/commits", function(r) {
          
        });

        // Log success message to console
        console.log("Done loading wiki page '"+ptitle+"'.");
      });
    });
  });
});
