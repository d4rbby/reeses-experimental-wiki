/*
@project DorpWiki
@version 1.0.0
@author Carver Harrison
@licence bsd-3-clause
@site https://dorper.me/p/wiki
@file Javascript for DorpWiki
*/

/* @library https://github.com/Holixus/nano-markdown */
function lex(e){return e.replace(/\\([(){}[\]#*+\-.!_\\])/g,function(e,r){return String.fromCharCode(1,escapes.indexOf(r)+esc_ofs)}).replace(/(\*\*|__|~~)(\S(?:[\s\S]*?\S)?)\1/g,function(e,r,n){return"~~"===r?"<del>"+n+"</del>":"<b>"+n+"</b>"}).replace(/(\n|^|\W)([_\*])(\S(?:[\s\S]*?\S)?)\2(\W|$|\n)/g,function(e,r,n,t,s){return r+"<i>"+t+"</i>"+s}).replace(/(!?)\[([^\]<>]+)\]\((\+?)([^ \)<>]+)(?: "([^\(\)\"]+)")?\)/g,function(e,r,n,t,s,c){var l=c?' title="'+c+'"':"";return r?'<img src="'+nmd.href(s)+'" alt="'+n+'"'+l+"/>":(t&&(l+=' target="_blank"'),'<a href="'+nmd.href(s)+'"'+l+">"+n+"</a>")})}function unesc(e){return e.replace(/\x01([\x0f-\x1c])/g,function(e,r){return escapes.charAt(r.charCodeAt(0)-esc_ofs)})}var escapes="\\[!]#{()}*+-._",esc_ofs=16,nmd=function(e){return e.replace(/.+(?:\n.+)*/g,function(e){var r=/^\s{4}([^]*)$/.exec(e);if(r)return"<pre><code>"+r[1].replace(/\n    /g,"\n")+"</code></pre>";for(var n,t=[],s=lex(e).split("\n"),c=0,l=s.length;c<l;++c){var f=s[c],u=/^\s{0,3}(\#{1,6})\s+(.*?)\s*#*\s*$/.exec(f);if(u)t.push(n=[u[2],"h",u[1].length]);else{var h=/^(\s*)(?:[-*]|(\d[.)])) (.+)$/.exec(f);h?t.push(n=[h[3],h[2]?"ol":"ul",h[1].length]):/^\s{0,3}([-])(\s*\1){2,}\s*$/.test(f)?t.push(n=["","hr"]):n&&"hr"!==n[1]&&"h"!==n[1]?n[0]+="\n"+f:t.push(n=[f,"p",""])}}var i="",a=[];for(c=0,l=t.length;c<l;++c){var o=(n=t[c])[0],g=n[1],p=n[2];if("ul"===g||"ol"===g)!a.length||p>a[0][1]?(a.unshift([g,p]),i+="<"+a[0][0]+"><li>"+o):a.length>1&&p<=a[1][1]?(i+="</li></"+a.shift()[0]+">",--c):i+="</li><li>"+o;else{for(;a.length;)i+="</li></"+a.shift()[0]+">";i+="hr"===g?"<hr/>":"<"+g+p+nmd.headAttrs(p,o)+">"+o+"</"+g+p+">"}}for(;a.length;)i+="</li></"+a.shift()[0]+">";return unesc(i)})};nmd.href=function(e){return e},nmd.headAttrs=function(e,r){return""};

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

// On Window Load
window.addEventListener('load', function() {
  jget('CONFIG', function(data) {
    data.split('\n').forEach(function(l) {
      var kv = l.split('=');
      config[kv[0]] = kv[1];
    });
    
    // Load Wiki Page
    var ptitle = window.location.href.split('?')[1];
    
    jget('pages/'+ptitle+'.md', function(data) {
      var pbody = data;
      var pbodym = nmd(pbody);
      document.getElementById('title').innerHTML = ptitle;
      document.getElementById('content').innerHTML = pbodym;      
      console.log("Done loading wiki page '"+ptitle+"'.");
    });
  })
});
