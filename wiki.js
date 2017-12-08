/*
@project DorpWiki
@version 1.0.0
@author Carver Harrison
@licence bsd-3-clause
@site https://dorper.me/p/wiki
*/

/* @library https://github.com/Holixus/nano-markdown */
!function(a,b){"function"==typeof define&&define.amd?define([],b):"object"==typeof exports?module.exports=b():a.returnExports=b()}(this,function(){"use strict";function a(a){return a.replace(/\\([(){}[\]#*+\-.!_\\])/g,function(a,b){return String.fromCharCode(1,c.indexOf(b)+d)}).replace(/(\*\*|__|~~)(\S(?:[\s\S]*?\S)?)\1/g,function(a,b,c){return"~~"===b?"<del>"+c+"</del>":"<b>"+c+"</b>"}).replace(/(\n|^|\W)([_\*])(\S(?:[\s\S]*?\S)?)\2(\W|$|\n)/g,function(a,b,c,d,e){return b+"<i>"+d+"</i>"+e}).replace(/(!?)\[([^\]<>]+)\]\((\+?)([^ \)<>]+)(?: "([^\(\)\"]+)")?\)/g,function(a,b,c,d,f,g){var h=g?' title="'+g+'"':"";return b?'<img src="'+e.href(f)+'" alt="'+c+'"'+h+"/>":(d&&(h+=' target="_blank"'),'<a href="'+e.href(f)+'"'+h+">"+c+"</a>")})}function b(a){return a.replace(/\x01([\x0f-\x1c])/g,function(a,b){return c.charAt(b.charCodeAt(0)-d)})}var c="\\[!]#{()}*+-._",d=16,e=function(c){return c.replace(/.+(?:\n.+)*/g,function(c){var d=/^\s{4}([^]*)$/.exec(c);if(d)return"<pre><code>"+d[1].replace(/\n    /g,"\n")+"</code></pre>";for(var f,g=[],h=a(c).split("\n"),i=0,j=h.length;j>i;++i){var k=h[i],l=/^\s{0,3}(\#{1,6})\s+(.*?)\s*#*\s*$/.exec(k);if(l)g.push(f=[l[2],"h",l[1].length]);else{var m=/^(\s*)(?:[-*]|(\d[.)])) (.+)$/.exec(k);m?g.push(f=[m[3],m[2]?"ol":"ul",m[1].length]):/^\s{0,3}([-])(\s*\1){2,}\s*$/.test(k)?g.push(f=["","hr"]):f&&"hr"!==f[1]&&"h"!==f[1]?f[0]+="\n"+k:g.push(f=[k,"p",""])}}var n="",o=[];for(i=0,j=g.length;j>i;++i){f=g[i];var p=f[0],q=f[1],r=f[2];if("ul"===q||"ol"===q)!o.length||r>o[0][1]?(o.unshift([q,r]),n+="<"+o[0][0]+"><li>"+p):o.length>1&&r<=o[1][1]?(n+="</li></"+o.shift()[0]+">",--i):n+="</li><li>"+p;else{for(;o.length;)n+="</li></"+o.shift()[0]+">";n+="hr"===q?"<hr/>":"<"+q+r+e.headAttrs(r,p)+">"+p+"</"+q+r+">"}}for(;o.length;)n+="</li></"+o.shift()[0]+">";return b(n)})};return e.href=function(a){return a},e.headAttrs=function(a,b){return""},e});

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
    } else {
      console.error("AJAX Error: Could not GET '"+url+"'.");
    }
  };
}

// On Window Load
window.addEventListener('load', function() {
  jget('CONFIG', function(data) {
    data.split('\n').forEach(function(l) {
      var kv = l.split('=');
      config[kv[0]] = kv[1];
    });
    
    // Load Wiki Page
    var ptitle = window.location.href.split('?')[1];
    
    jget('pages/'+pname+'.md', function(data) {
      var pbody = data;
      var pbodym = nmd(pbody);
      document.getElementById('title').innerHTML = ptitle;
      document.getElementById('body').innerHTML = pbodym;      
      console.log("Done loading wiki page '"+ptitle+"'.");
    });
  })
});
