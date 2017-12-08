/*
@project DorpWiki
@version 1.0.0
@author Carver Harrison
@licence bsd-3-clause
@site https://dorper.me/p/wiki
@file Javascript for DorpWiki
*/

/* @library https://github.com/Khan/KaTeX/tree/master/contrib/auto-render */
(function(e){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=e()}else if(typeof define==="function"&&define.amd){define([],e)}else{var t;if(typeof window!=="undefined"){t=window}else if(typeof global!=="undefined"){t=global}else if(typeof self!=="undefined"){t=self}else{t=this}t.renderMathInElement=e()}})(function(){var e,t,r;return function n(e,t,r){function a(o,l){if(!t[o]){if(!e[o]){var f=typeof require=="function"&&require;if(!l&&f)return f(o,!0);if(i)return i(o,!0);var d=new Error("Cannot find module '"+o+"'");throw d.code="MODULE_NOT_FOUND",d}var s=t[o]={exports:{}};e[o][0].call(s.exports,function(t){var r=e[o][1][t];return a(r?r:t)},s,s.exports,n,e,t,r)}return t[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)a(r[o]);return a}({1:[function(e,t,r){var n=e("./splitAtDelimiters");var a=function(e,t){var r=[{type:"text",data:e}];for(var a=0;a<t.length;a++){var i=t[a];r=n(r,i.left,i.right,i.display||false)}return r};var i=function(e,t){var r=a(e,t);var n=document.createDocumentFragment();for(var i=0;i<r.length;i++){if(r[i].type==="text"){n.appendChild(document.createTextNode(r[i].data))}else{var o=document.createElement("span");var l=r[i].data;try{katex.render(l,o,{displayMode:r[i].display})}catch(f){if(!(f instanceof katex.ParseError)){throw f}console.error("KaTeX auto-render: Failed to parse `"+r[i].data+"` with ",f);n.appendChild(document.createTextNode(r[i].rawData));continue}n.appendChild(o)}}return n};var o=function(e,t,r){for(var n=0;n<e.childNodes.length;n++){var a=e.childNodes[n];if(a.nodeType===3){var l=i(a.textContent,t);n+=l.childNodes.length-1;e.replaceChild(l,a)}else if(a.nodeType===1){var f=r.indexOf(a.nodeName.toLowerCase())===-1;if(f){o(a,t,r)}}}};var l={delimiters:[{left:"$$",right:"$$",display:true},{left:"\\[",right:"\\]",display:true},{left:"\\(",right:"\\)",display:false}],ignoredTags:["script","noscript","style","textarea","pre","code"]};var f=function(e){var t;var r;for(var n=1,a=arguments.length;n<a;n++){t=arguments[n];for(r in t){if(Object.prototype.hasOwnProperty.call(t,r)){e[r]=t[r]}}}return e};var d=function(e,t){if(!e){throw new Error("No element provided to render")}t=f({},l,t);o(e,t.delimiters,t.ignoredTags)};t.exports=d},{"./splitAtDelimiters":2}],2:[function(e,t,r){var n=function(e,t,r){var n=r;var a=0;var i=e.length;while(n<t.length){var o=t[n];if(a<=0&&t.slice(n,n+i)===e){return n}else if(o==="\\"){n++}else if(o==="{"){a++}else if(o==="}"){a--}n++}return-1};var a=function(e,t,r,a){var i=[];for(var o=0;o<e.length;o++){if(e[o].type==="text"){var l=e[o].data;var f=true;var d=0;var s;s=l.indexOf(t);if(s!==-1){d=s;i.push({type:"text",data:l.slice(0,d)});f=false}while(true){if(f){s=l.indexOf(t,d);if(s===-1){break}i.push({type:"text",data:l.slice(d,s)});d=s}else{s=n(r,l,d+t.length);if(s===-1){break}i.push({type:"math",data:l.slice(d+t.length,s),rawData:l.slice(d,s+r.length),display:a});d=s+r.length}f=!f}i.push({type:"text",data:l.slice(d)})}else{i.push(e[o])}}return i};t.exports=a},{}]},{},[1])(1)});

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
    jget('pages/'+ptitle+'.md', function(data) {
      var pbody = data;
      var pbodym = marked(pbody);
      document.getElementById('title').innerHTML = ptitle;
      document.getElementById('content').innerHTML = pbodym;      
      
      // Setup Bindings
      document.querySelectorAll('[data-bind="page markdown"]').forEach(function (i) {
        i.innerHTML = pbody;
      });
      
      document.querySelectorAll('[data-bind="page html"]').forEach(function (i) {
        i.innerHTML = pbodym;
      });
      
      // Setup KaTeX
      renderMathInElement(document.body, { delimiters: [
        {left: "$$", right: "$$", display: true},
        {left: "$", right: "$", display: false}
      ]});
      
      // Setup Highlight.js
      hljs.initHighlighting();
      
      // Log success message to console
      console.log("Done loading wiki page '"+ptitle+"'.");
    });
  });
});
