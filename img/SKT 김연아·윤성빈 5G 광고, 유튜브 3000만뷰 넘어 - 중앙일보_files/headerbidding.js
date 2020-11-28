/*!
* Copyright (c) 2020 IGAWorks adpopcorn development team
* headerbidding.js project is licensed under the ISC license
*
* headerbidding.js
* Header Bidding Management Library
*
* @version 1.0.3
*/
this.IGAWorks=this.IGAWorks||{},this.IGAWorks.HeaderBidding=function(){"use strict";function t(t,e){return e||(e=t.slice(0)),t.raw=e,t}var e=Object.prototype,n=e.hasOwnProperty,r=e.toString,o=e.propertyIsEnumerable,i=Array.prototype.slice,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";if(window.atob||(window.atob=function(t){var e=(t+"").replace(/[=]+$/,""),n="";if(e.length%4==1)throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");for(var r,o,i=0,s=0;o=e.charAt(s++);~o&&(r=i%4?64*r+o:o,i++%4)?n+=String.fromCharCode(255&r>>(-2*i&6)):0)o=a.indexOf(o);return n}),window.btoa||(window.btoa=function(t){for(var e,n,r=t+"",o="",i=0,s=a;r.charAt(0|i)||(s="=",i%1);o+=s.charAt(63&e>>8-i%1*8)){if((n=r.charCodeAt(i+=3/4))>255)throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");e=e<<8|n}return o}),Array.isArray||(Array.isArray=function(t){return"[object Array]"===r.call(t)}),Array.from||(Array.from=function(t,e,n){for(var r=[],o=0;o<t.length;o++)r.push("function"==typeof e?e.call(n,t[o],o,t):t[o]);return r}),Array.prototype.filter||(Array.prototype.filter=function(t,e){for(var n,r=Object(this),o=[],i=0;i<r.length;i++)n=r[i],t.call(e,n,i,r)&&o.push(n);return o}),Array.prototype.forEach||(Array.prototype.forEach=function(t,e){for(var n=Object(this),r=0;r<n.length;r++)t.call(e,n[r],r,n)}),Array.prototype.map||(Array.prototype.map=function(t,e){for(var n=Object(this),r=[],o=0;o<n.length;o++)r.push(t.call(e,n[o],o,n));return r}),function(){try{var t;(t=document.documentElement,i).call(t)}catch(e){Array.prototype.slice=function(t,e){var n=Object(this),r=null!=t?t:0,o=null!=e?e:n.length;if(r=r>=0?r:Math.max(0,n.length+r),o=o>=0?Math.min(o,n.length):n.length+o,Array.isArray(n))return i.call(n,r,o);var a=[];if(o-r)for(var s=0;s<o-r;s++)a.push(n.charAt?n.charAt(r+s):n[r+s]);return a}}}(),Array.prototype.some||(Array.prototype.some=function(t,e){for(var n=Object(this),r=0;r<n.length;r++)if(t.call(e,n[r],r,n))return!0;return!1}),Date.now||(Date.now=function(){return(new Date).getTime()}),Function.prototype.bind||(Function.prototype.bind=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),r=1;r<e;r++)n[r-1]=arguments[r];var o=this,i=function(){},a=function(){for(var e=arguments.length,r=Array(e),a=0;a<e;a++)r[a]=arguments[a];return o.apply(this instanceof i?this:t,[].concat.call(n,r))};return this.prototype&&(i.prototype=this.prototype),a.prototype=new i,a}),Number.MAX_SAFE_INTEGER||(Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1),Object.assign||(Object.assign=function(t){for(var e=arguments.length,r=Array(e>1?e-1:0),o=1;o<e;o++)r[o-1]=arguments[o];return[].forEach.call(r,(function(e){for(var r in e)n.call(e,r)&&(t[r]=e[r])})),t}),Object.create||(Object.create=function(t,e){function n(){}n.prototype=null!=t?t:{},void 0!==e&&Object.defineProperties(n.prototype,e);var r=new n;return n.prototype=null,t||(r.__proto__=null),r}),Object.getPrototypeOf||(Object.getPrototypeOf=function(t){return n.call(t,"__proto__")?t.__proto__:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?Object.prototype:null}),!Object.keys){var s,c=!(s={toString:null},o).call(s,"toString"),d=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];Object.keys=function(t){var e,r=[];for(var o in t)n.call(t,o)&&r.push(o);return c&&(e=d,[].forEach).call(e,(function(e){n.call(t,e)&&r.push(e)})),r}}function u(t){return t?t.replace(/^\?/,"").split("&").reduce((function(t,e){var n=e.split("="),r=n[0],o=n[1];return/\[\]$/.test(r)?(t[r=r.replace("[]","")]=t[r]||[],t[r].push(o)):t[r]=null!=o?o:"",t}),{}):{}}function l(t,e){var n,r,o,i,a,s,c=void 0===e?{}:e,d=c.noDecodeWholeURL,l=c.decodeSearchAsString,h=document.createElement("A");h.href=d?t:decodeURIComponent(t);var p={protocol:(null!==(n=h.protocol)&&void 0!==n?n:"").replace(/:$/,""),host:null!==(r=h.host)&&void 0!==r?r:window.location.href,hostname:h.hostname,port:+h.port,pathname:h.pathname.replace(/^(?!\/)/,"/"),search:l?h.search:u(null!==(o=h.search)&&void 0!==o?o:""),hash:(null!==(i=h.hash)&&void 0!==i?i:"").replace(/^#/,""),href:h.href},f=null!==(a=p.host)&&void 0!==a?a:p.hostname+(p.port?":"+p.port:"");return p.origin=(null!==(s=p.protocol)&&void 0!==s?s:"http")+"://"+f,p}function h(t){var e,n,r,o,i;return""+((null!==(e=t.protocol)&&void 0!==e?e:"http")+"://")+(null!==(n=t.host)&&void 0!==n?n:t.hostname+(t.port?":"+t.port:""))+(null!==(r=t.pathname)&&void 0!==r?r:"")+(t.search?"?"+(i=null!==(o=t.search)&&void 0!==o?o:"",Object.keys(i).map((function(t){return Array.isArray(i[t])?i[t].map((function(e){return t+"[]="+e})).join("&"):t+"="+i[t]})).join("&")):"")+(t.hash?"#"+t.hash:"")}String.prototype.repeat||(String.prototype.repeat=function(t){var e=""+this,n=Math.floor(null!=t?t:0);if(0===e.length||0===n||e.length*n>=0)return"";var r=e.length*n;for(n=Math.floor(Math.log(n)/Math.log(2));n;)e+=e,n--;return e+=e.substring(0,r-e.length)}),String.prototype.trim||(String.prototype.trim=function(){return this.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")}),window.console||[].forEach.call(["assert","clear","count","countReset","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],(function(t){window.console[t]=function(){}})),function(){if("IntersectionObserver"in window&&"IntersectionObserverEntry"in window&&"intersectionRatio"in window.IntersectionObserverEntry.prototype)"isIntersecting"in window.IntersectionObserverEntry.prototype||Object.defineProperty(window.IntersectionObserverEntry.prototype,"isIntersecting",{get:function(){return this.intersectionRatio>0}});else{var t=function(t,e,n,r){void 0===r&&(r=!1),t.addEventListener?t.addEventListener(e,n,r):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n},e=function(t,e,n,r){void 0===r&&(r=!1),t.removeEventListener?t.removeEventListener(e,n,r):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=null},n=function(t){var e;try{e=t.getBoundingClientRect()}catch(n){}return e?(e.width&&e.height||(e.width=e.right-e.left,e.height=e.bottom-e.top),e):{top:0,bottom:0,left:0,right:0,width:0,height:0}},r=function(t){var e=t.parentNode;return e&&e.nodeType===Node.DOCUMENT_FRAGMENT_NODE&&e.host?e.host:e&&e.assignedSlot?e.assignedSlot.parentNode:e},o=function(t,e){for(var n=e;n;){if(n===t)return!0;n=r(n)}return!1},i=function(t){var e=void 0===t?{}:t,n=e.time,r=e.target,o=e.rootBounds,i=e.boundingClientRect,a=e.intersectionRect,s=void 0===a?{top:0,bottom:0,left:0,right:0,width:0,height:0}:a;this.time=n,this.target=r,this.rootBounds=o,this.boundingClientRect=i,this.intersectionRect=s,this.isIntersecting=!!s;var c=this.boundingClientRect,d=c.width,u=c.height,l=this.intersectionRect,h=l.width,p=l.height,f=d*u;this.intersectionRatio=f?parseFloat((h*p/f).toFixed(4)):0|this.isIntersecting},a=function(){var a=function(){function a(t,e){var n,r=void 0===e?{}:e,o=r.root,i=void 0===o?null:o,s=r.rootMargin,c=void 0===s?"0px":s,d=r.threshold,u=void 0===d?[0]:d;if("function"!=typeof t)throw new Error("callback must be a function");if(i&&i.nodeType!==Node.ELEMENT_NODE)throw new Error("root must be an Element");this.__checkForIntersections=function(t,e){void 0===e&&(e=1e3/60);var n=0;return function(){var r=+new Date;r-n<e||(n=r,t.apply(void 0,arguments))}}(this.__checkForIntersections.bind(this),a.TIMEOUT),this.__callback=t,this.__targets=[],this.__entries=[],this.__rootMarginValues=((n=c.split(/\s+/).map((function(t){var e=/^(-?\d*\.?\d+)(px|%)$/.exec(t);if(!e)throw new SyntaxError("rootMargin must be specified in pixels or percent");return{value:parseFloat(e[1]),unit:e[2]}})))[1]=n[1]||n[0],n[2]=n[2]||n[0],n[3]=n[3]||n[1],n),Array.isArray(u)||(u=[u]),this.root=i,this.rootMargin=this.__rootMarginValues.map((function(t){return t.value+t.unit})).join(" "),this.thresholds=u.sort().filter((function(t,e,n){if("number"!=typeof t||t!=+t||t<0||t>1)throw new RangeError("threshold must be a number between 0 and 1 inclusively");return t!==n[e-1]}))}var s=a.prototype;return s.observe=function(t){if(!this.__targets.some((function(e){return e.element===t}))){if(!t||t.nodeType!==Node.ELEMENT_NODE)throw new Error("target must be an Element");this.__register(),this.__targets.push({element:t,entry:null}),this.__monitorIntersections(),this.__checkForIntersections()}},s.unobserve=function(t){this.__targets=this.__targets.filter((function(e){return e.element!==t})),this.__targets.length||(this.__unmonitorIntersections(),this.__unregister())},s.disconnect=function(){this.__targets=[],this.__unmonitorIntersections(),this.__unregister()},s.takeRecords=function(){var t=this.__entries.slice();return this.__entries=[],t},s.__monitorIntersections=function(){this.__monitoringIntersections||(this.__monitoringIntersections=!0,a.POLL_INTERVAL?this.__monitoringInterval=window.setInterval(this.__checkForIntersection,a.POLL_INTERVAL):(t(window,"resize",this.__checkForIntersections,!0),t(document,"scroll",this.__checkForIntersections,!0),a.USE_MUTATION_OBSERVER&&"MutationObserver"in window&&(this.__domObserver=new MutationObserver(this.__checkForIntersections),this.__domObserver.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0}))))},s.__unmonitorIntersections=function(){this.__monitoringIntersections||(this.__monitoringIntersections=!1,window.clearInterval(this.__monitoringInterval),this.__monitoringInterval=null,e(window,"resize",this.__checkForIntersections,!0),e(document,"scroll",this.__checkForIntersections,!0),this.__domObserver&&(this.__domObserver.disconnect(),this.__domObserver=null))},s.__checkForIntersection=function(){var t=this,e=this.__rootIsInDOM(),r=e?this.__getRootRect():{top:0,bottom:0,left:0,right:0,width:0,height:0};this.__targets.forEach((function(a){var s=a.element,c=a.entry,d=s,u=n(d),l=o(t.root||document,d),h=c,p=e&&l&&t.__computeTargetAndRootIntersection(d,r),f=c=new i({time:window.performance&&performance.now&&performance.now(),target:d,boundingClientRect:u,rootBounds:u,intersectionRect:p});h?e&&l?t.__hasCrossedThreshold(h,f)&&t.__entries.push(f):h&&h.isIntersecting&&t.__entries.push(f):t.__entries.push(f)})),this.__entries.length&&this.__callback(this.takeRecords(),this)},s.__computeTargetAndRootIntersection=function(t,e){if("none"===window.getComputedStyle(t).display)return null;for(var o=n(t),i=r(t),a=!1;!a;){var s=i.nodeType===Node.ELEMENT_NODE?window.getComputedStyle(i):{},c=null;if("none"===s.display)return null;if(i===this.root||i===document?(a=!0,c=e):i!==document.body&&i!==document.documentElement&&"visible"!==s.overflow&&(c=n(i)),c&&(d=c,u=o,l=void 0,h=void 0,p=void 0,f=void 0,v=void 0,m=void 0,l=Math.max(d.top,u.top),h=Math.min(d.bottom,u.bottom),p=Math.max(d.left,u.left),f=Math.min(d.right,u.right),m=h-l,!(o=(v=f-p)>=0&&m>=0&&{top:l,bottom:h,left:p,right:f,width:v,height:m})))break;i=r(i)}var d,u,l,h,p,f,v,m;return o},s.__getRootRect=function(){var t;if(this.root)t=n(this.root);else{var e=document.documentElement,r=e.clientWidth,o=e.clientHeight,i=document.body,a=i.clientWidth,s=i.clientHeight;t={top:0,left:0,right:r||a,width:r||a,bottom:o||s,height:o||s}}var c=this.__rootMarginValues.map((function(e,n){var r=e.value;return"px"===e.unit?r:r*(n%2?t.width:t.height)/100})),d={top:t.top-c[0],right:t.right+c[1],bottom:t.bottom+c[2],left:t.left-c[3]};return d.width=d.right-d.left,d.height=d.bottom-d.top,d},s.__hasCrossedThreshold=function(t,e){var n=t&&t.isIntersecting?t.intersectionRatio||0:-1,r=e.isIntersecting?e.intersectionRatio||0:-1;return n!==r&&this.thresholds.some((function(t){return t===n||t===r||t<n!=t<r}))},s.__rootIsInDOM=function(){return!this.root||o(document,this.root)},s.__register=function(){},s.__unregister=function(){},a}();return a.TIMEOUT=100,a.POOL_INTERVAL=null,a.USE_MUTATION_OBSERVER=!0,a}();window.IntersectionObserver=a,window.IntersectionObserverEntry=i}}();var p=Object.prototype,f=p.hasOwnProperty,v=p.toString;function m(t,e){return f.call(t,e)}function g(){}function b(t){return v.call(t).toLowerCase().replace(/(?:^\[object\s(.*?)\]$)/,"$1")}function w(t){return null!=t&&"object"==typeof t}function y(t){if(!w(t)||"object"!==b(t))return!1;var e=Object.getPrototypeOf(t);if(null===e)return!0;for(;null!==Object.getPrototypeOf(e);)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function _(t){return function(t){return null!=t&&("object"==typeof t||"function"==typeof t)}(t)&&"function"===b(t)}var E=Array.isArray;function A(t){return null!=t&&("number"==typeof(e=t.length)&&e>-1&&e%1==0&&e<Number.MAX_SAFE_INTEGER)&&!_(t);var e}function I(t){if(!t)return!0;if(A(t)&&(E(t)||"string"==typeof t||"function"==typeof t.splice))return!t.length;if(function(t){var e,n=null==t?void 0:t.constructor;return t===(null!==(e="function"==typeof n&&n.prototype)&&void 0!==e?e:Object.prototype)}(t))return!Object.keys(t).length;for(var e in t)if(m(t,e))return!1;return!0}function O(t){return!0===t||!1===t||w(t)&&"boolean"===b(t)}function j(t,e,n){var r=0;if(A(t))for(;r<t.length&&!1!==e.call(n,t[r],r,t);r++);else for(r in t)if(!1===e.call(n,t[r],r,t))break;return t}function C(t,e,n){var r=[];return j(t,(function(){for(var t=arguments.length,o=Array(t),i=0;i<t;i++)o[i]=arguments[i];e.apply(n,o)&&r.push(o[0])})),r}function R(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];var r=e[0];O(r)&&e.shift();for(var o,i,a=e[0],s=void 0===a?{}:a,c=e.slice(1);c.length>0;)if(null!=(i=c.shift()))for(var d in i){var u=i[d];"__proto__"!==d&&s!==u&&(r&&u&&(y(u)||(o=E(u)))?s[d]=R(r,s[d]||(o?(o=!1,[]):{}),u):void 0!==u&&(s[d]=u))}return s}var S=/(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;function T(){if(function(){try{return window.self!==window.top}catch(t){return!0}}()){var t;try{t=(e=window.location.ancestorOrigins).length>=1&&e[e.length-1]||function(){try{window.top.location.toString();var t,e="";do{var n,r;(null===(n=t=t?t.parent:window)||void 0===n||null===(r=n.document)||void 0===r?void 0:r.referrer)&&(e=t.document.referrer)}while(t!==window.top);return e}catch(o){return window.document.referrer}}()}catch(n){}if(t)return l(t,{decodeSearchAsString:!0})}var e;return window.location}var k=function(){function t(t){if(!o)for(o=!0;t=r.shift();)t()}function e(){(document.addEventListener||"load"===window.event.type||"complete"===document.readyState)&&(n(),t())}function n(){document.addEventListener?(document.removeEventListener("DOMContentLoaded",e),window.removeEventListener("load",e)):(document.detachEvent("onreadystatechange",e),window.detachEvent("onload",e))}var r=[],o=!1;if("complete"===document.readyState||"loading"!==document.readyState&&!document.documentElement.doScroll)window.setTimeout(t);else if(document.addEventListener)document.addEventListener("DOMContentLoaded",e),window.addEventListener("load",e);else{document.attachEvent("onreadystatechange",e),window.attachEvent("onload",e);var i=!1;try{i=null==window.frameElement&&document.documentElement}catch(a){}i&&i.doScroll&&function r(){if(!o){try{i.doScroll("left")}catch(a){return void window.setTimeout(r,50)}n(),t()}}()}return function(t){_(t)&&(o?t():r.push(t))}}();function x(t,e,n,r){void 0===r&&(r="");var o=document.createElement("IFRAME");return o.width=""+t,o.height=""+e,o.marginWidth=o.marginHeight=o.frameBorder="0",o.scrolling="no",o.setAttribute("hspace","0"),o.setAttribute("vspace","0"),o.setAttribute("allowtransparency","true"),o.style.display="block",o.style.margin="0 auto",o.style.border="none",o.style.overflow="hidden",t&&e||(o.style.display="none"),n&&(o.src=n),r&&o.setAttribute("sandbox",r),o}function M(t){var e;if(t)try{e=t.contentWindow?t.contentWindow.document:t.contentDocument.document?t.contentDocument.document:t.contentDocument}catch(n){}return e}function N(t,e,n){function r(t,e){var n="iframe"===this.tagName.toLowerCase()?this:this.firstChild,r=M(n);r&&((!e||e>9)&&n.removeAttribute("src"),r.open("text/html","replace"),r.write(t),r.close())}if(t&&"iframe"===t.tagName.toLowerCase()){e=e.replace(/\\x3c/g,"<");try{var o;if(M(t))return void(o=t,r).call(o,e,n);throw new Error}catch(l){var i=Date.now(),a=t,s=a.width,c=a.height,d=a.parentNode;window.IGAWorks.HeaderBidding.maps[i]=r.bind(d,e,n),d.removeChild(t),t=null;var u=x(s,c);u.src="javascript:(function(){document.write('<script>document.domain=\""+document.domain+'";parent.window.IGAWorks.HeaderBidding.failover("'+i+"\");<\/script>')})();",d.innerHTML=u.outerHTML}}}function B(){for(var t=0,e=document.domain,n=e.split("."),r="__gd"+(new Date).getTime();t<n.length-1&&-1===document.cookie.indexOf(r+"="+r);)e=n.slice(-1-++t).join("."),document.cookie=r+"="+r+";domain="+e+";";return document.cookie=r+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+e+";",e}var U,L,F=(U=window.navigator.userAgent,(L=/(?:ms|\()(ie)\s([\w\.]+)/i.exec(U)||/(trident).+rv[:\s]([\w\.]+).+like\sgecko/i.exec(U)||[]).length&&L[L.length-1]>>>0),D="https://cm.igaw.io/v1/cc",P="__igaw__adid",H={path:"/",expires:365},q={url:{sdk:"//ssp.igaw.io/sdk/js/prebid.js",json:function(t,e){return"//ssp.igaw.io/mda/"+e+".json"}},fee:0,config:{bidderTimeout:3e3,maxRequestsPerOrigin:6,timeoutBuffer:300,currency:{adServerCurrency:"USD",defaultRates:{USD:{KRW:1e3}}},userSync:{filterSettings:{all:{bidders:"*",filter:"include"}},syncDelay:1e3}},bidderConfig:{},noAd:'<div style="display:table;width:100%;height:100%;background:#000;position:absolute;left:0;top:0;cursor:pointer" onclick="window.open(\'http://www.adpopcorn.com\', \'_blank\');">\n<div style="display:table-cell;text-align:center;vertical-align:middle">\n<div style="display:inline-block">\n<b style="color:#fff">IGAWorks Header Bidding</b>\n</div>\n</div>\n</div>'},z=function(t,e){var n=void 0===e?{}:e,r=n.head,o=void 0===r?"":r,i=n.body;return'<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<title>advertisement</title>\n<style type="text/css">html,body,div,canvas,video,img,a{margin:0;padding:0;border:0}html{font-size:100%;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}body{line-height:1}a{background-color:transparent}a:focus{outline:thin dotted}a:active,a:hover{outline:0}img{border:0;border-style:none;-ms-interpolation-mode:bicubic;vertical-align:middle}canvas,video{display:inline-block;*display:inline;*zoom:1;max-width:100%}:focus{outline:0}[hidden]{display:none}</style>\n'+o+"\n</head>\n<body>\n"+(void 0===i?"":i)+"\n</body>\n</html>"},W=F&&F<=9;var G=function(t,e){void 0===t&&(t=3e3);var n=void 0===e?{}:e,r=n.onbeforerequest,o=n.oncomplete;return function(e,n,i,a){void 0===a&&(a={});try{var s,c,d=document.createElement("A"),u=w(n)?n:{onsuccess:function(){},onerror:function(){}},p=null!==(s=a.method)&&void 0!==s?s:i?"POST":"GET",f=new window[W?"XDomainRequest":"XMLHttpRequest"];if(d.href=e,_(n)&&(u.onsuccess=n),W?f.onload=function(){_(o)&&o(d.origin),u.onsuccess(f.responseText,f)}:f.onreadystatechange=function(){var t,e;4!==f.readyState||(_(o)&&o(d.origin),f.status>=200&&f.status<300||304===f.status?u.onsuccess(f.responseText,f):null===(t=(e=u).onerror)||void 0===t||t.call(e,f.statusText,f))},f.ontimeout=function(){var t,e;return null===(t=(e=u).onerror)||void 0===t?void 0:t.call(e,"error",f)},"GET"===p&&w(i)){var v=l(e,a);R(v.search,i),e=h(v)}if((null===(c=a.noCache)||void 0===c||c)&&(e=e+"?v="+Date.now()),W?f.open(p,e):f.open(p,e,!0),f.timeout=t,a.withCredentials&&(f.withCredentials=!0),"setRequestHeader"in f){var m;j(a.header,(function(t,e){f.setRequestHeader(e,t)})),a.preflight&&f.setRequestHeader("X-Requested-With","XMLHttpRequest");var g=W?"text/plain":null!==(m=a.contentType)&&void 0!==m?m:"text/plain";f.setRequestHeader("Content-Type",g)}_(r)&&r(d.origin),f.send("POST"===p&&w(i)?i:null)}catch(b){}}}(),X=function(){function t(t){this.converter=null!=t?t:g}var e=t.prototype;return e.get=function(){for(var t=this,e=arguments.length,n=Array(e),r=0;r<e;r++)n[r]=arguments[r];var o=n[0];if(!n.length||o){var i={};try{var a,s,c,d=document.cookie?document.cookie.split("; "):[];j(d,(function(e){s=e.split("="),'"'===(c=s.slice(1).join("=")).charAt(0)&&(c=c.slice(1,-1));try{if(a=s[0].replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),i[a]=(t.converter.read||t.converter)(c,a)||c.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent),o===a)return!1}catch(n){}return!0}))}catch(u){}return o?i[o]:i}},e.set=function(t,e,n){var r;n=R({path:"/"},n),("number"==typeof(r=n.expires)||w(r)&&"number"===b(r))&&(n.expires=new Date(Date.now()+864e5*n.expires)),n.expires&&(n.expires=n.expires.toUTCString()),e=this.converter.write?this.converter.write(e,t):encodeURIComponent(""+e).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=encodeURIComponent(""+t).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var o="",i="";j(n,(function(t,e){return!1===t||(o=!0===t?"":"="+t.split(";")[0],i+="; "+e+o,!0)}));try{document.cookie=t+"="+e+i}catch(a){}},e.remove=function(t,e){this.set(t,"",R(e,{expires:-1}))},t}();function V(){var e=t(["",""]);return V=function(){return e},e}function J(){var e=t(["",""]);return J=function(){return e},e}function $(){var e=t(["",""]);return $=function(){return e},e}function K(){var e=t(["",""]);return K=function(){return e},e}var Y=function(){var t=function(){function t(t){this.publisherId=t.replace(/[<>]+/g,""),this.adUnits=[],this.noAds=[],this.bidfloors=[]}var e=t.prototype;return e.request=function(){var t=this;this.__called||F&&F<=7||this.__getCookie((function(e){t.__adid=e,t.__getAdUnitsFromS3((function(e){var n,r;if(t.adUnits=null!==(n=null!==(r=e.adUnits)&&void 0!==r?r:e)&&void 0!==n?n:[],t.adUnits.length){j(t.adUnits,(function(e){j(e.bids,(function(n){if("adpopcorn"===n.bidder){var r;n.params.publisherId=t.publisherId;var o=(null!==(r=n.params.bidfloor)&&void 0!==r?r:{currency:"USD",value:0}).value;t.bidfloors.push({code:e.code,bidfloor:o}),delete n.params.bidfloor,t.noAds.push({code:e.code,script:n.params.noad}),delete n.params.noad}"criteo"===n.bidder&&delete n.params.zoneId,"appier"===n.bidder&&delete n.params.zoneId}))}));var o=t.__bidsBackHandler.bind(t);return F&&F<11?void k(o):void function(t,e,n){if(void 0===n&&(n=3e3),t){var r=document.head||document.getElementsByTagName("HEAD")[0]||document.documentElement,o=window.setTimeout((function(){return e({type:"timeout",target:i})}),n),i=document.createElement("SCRIPT"),a=!1;i.type="text/javascript",i.async=!0,i.src=t,i.charset="utf-8",i.onerror=function(t){i.onerror=null,window.clearTimeout(o),null==e||e(t)},i.onload=i.onreadystatechange=function(t){a||i.readyState&&!/loaded|complete/.test(i.readyState)||(a=!0,i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),i=null,window.clearTimeout(o),null==e||e(t))},r.insertBefore(i,r.firstChild)}}(q.url.sdk,(function(e){var n=e.type;return/error|timeout/.test(n)?void o():(window.pbjs=window.pbjs||{},window.pbjs.que=window.pbjs.que||[],void window.pbjs.que.push((function(){window.pbjs.bidderSettings=t.__getPrebidBidderSettings(),window.pbjs.setConfig(t.__getPrebidConfig()),window.pbjs.setBidderConfig(t.__getPrebidBidderConfig()),window.pbjs.addAdUnits(t.adUnits),window.pbjs.requestBids({bidsBackHandler:o})})))}))}}))}))},e.__getCookie=function(t){var e=new X,n={domain:"."+B()};"https:"==document.location.protocol&&(n.secure=!0,n.sameSite="None"),G(D,{onsuccess:function(r){try{var o=e.get(P);try{window.atob(o)}catch(d){e.remove(P)}var i=JSON.parse(r),a=[];for(var s in i)a.push(s+"="+i[s]);var c=window.btoa(a.join(";"));c!=o&&e.set(P,c,R(!0,{},H,n)),t(c)}catch(d){t("")}},onerror:function(){return t("")}},null,{contentType:"application/json",noCache:!1,withCredentials:!0})},e.__getAdUnitsFromS3=function(t){G(q.url.json(K(),this.publisherId),{onsuccess:function(e){var n=[];try{n=function(t){var e,n,r=(""+t).trim();return window.JSON&&window.JSON.parse?JSON.parse(r):r&&!r.replace(S,(function(t,r,o,i){return n&&r&&(e=0),0===e?t:(n=o||r,e+=!i-!o,"")})).trim()?Function("return "+r)():{}}(e)}catch(r){}t(n)},onerror:function(){return t([])}},null,{contentType:"application/json",noCache:!1})},e.__bidsBackHandler=function(){var t=this;if(!this.__called){this.__called=!0;var e=arguments.length&&(arguments.length<=0?void 0:arguments[0])&&!I(arguments.length<=0?void 0:arguments[0]);j(this.adUnits,(function(n){var r=n.code,o=n.mediaTypes,i=document.getElementById(r);if(!i){var a=r.indexOf("div-igaw-ad-");i=document.getElementById(a>=0?r.slice(0,a+12)+"<"+r.slice(a+12)+">":"<"+r+">")}if(!i||i.getElementsByTagName("IFRAME")>0)return!0;i.style.position="relative",i.style.display="inline-block",i.style.textAlign="center";var s=t.__getAdUnitSizeByTypes(o),c=s.width,d=s.height;if(!c||!d)return!0;var u=x(c,d);u.setAttribute("title","header bidding ad content"),u.setAttribute("sandbox","allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-scripts allow-forms allow-top-navigation-by-user-activation"),i.insertBefore(u,i.firstChild);var l,h=!1;if(e&&(l=window.pbjs.getHighestCpmBids(r)[0]))try{/<html(.+?)>/i.test(l.ad)||(l.ad=z($(),{body:l.ad})),window.pbjs.renderAd(M(u),l.adId),h=!0}catch(f){}if(!h&&(l=C(t.noAds,(function(t){return t.code===r}))[0])){var p=t.__getPassbackUrl(i,c,d);N(u,z(J(),{body:p||l.script||q.noAd}),F)}return!0}))}},e.__getAdUnitSizeByTypes=function(t){var e,n=t.banner,r=0,o=0;if(n&&(n.sizes=n.sizes||[],n.sizes.length)){var i=n.sizes[0];if("string"==typeof(e=i)||!E(e)&&w(e)&&"string"===b(e)){var a,s,c,d=i.split("x");1===d.length?(r=(a=d)[0],o=void 0===(s=a[1])?r:s):2===d.length&&(r=(c=d)[0],o=c[1])}else E(i)&&2===i.length&&(r=i[0],o=i[1])}return{width:r,height:o}},e.__getPrebidBidderSettings=function(){var e=this.bidfloors;return R(!0,{},q.bidderSettings,{standard:{bidCpmAdjustment:function(n,r){var o=r.bidder,i=r.netRevenue,a=r.adUnitCode,s=C(e,(function(t){return t.code===a}))[0],c=(s=void 0===s?{bidfloor:0}:s).bidfloor,d=n;!i&&q.fee>0&&(d*=(100-q.fee)/100);var l={bidder:o,adUnitCode:a,cpm:d,bidfloor:c,rejected:!1},h=d<c?(l.rejected=!0,"TRUE"===(u(window.location.search).pbjs_debug||"").toUpperCase()&&console.warn("%cPrebid","display: inline-block; color: #fff; background: #3b88c3; padding: 1px 4px; border-radius: 3px;","WARN:",o+"'s Bid Response for "+a+" was rejected due to floor not met",{cpm:d,bidfloor:c}),0):d;return t.bids.push(l),h}}})},e.__getPrebidConfig=function(){var t={},e=T().origin;return e&&(t.publisherDomain=e),t.appier={farm:"jp"},t.userSync={userIds:[{name:"pubCommonId",storage:{type:"cookie",name:"_pubcid",expires:365}}]},R(!0,{},q.config,t)},e.__getPrebidBidderConfig=function(){return R(!0,{},q.bidderConfig,{bidders:["adpopcorn"],config:{adpopcorn:{}}})},e.__getPassbackUrl=function(t,e,n){var r=R(!0,{type:"JX",params:{},url:""},function(t){void 0===t&&(t="{}");try{return JSON.parse(t)}catch(e){return{}}}("dataset"in t?t.dataset.passback:t.getAttribute("passback")));if(t.removeAttribute("data-passback"),!r.id)return"";var o="";return"JX"===r.type?o=function(t,e){var n=e.id,r=void 0===n?"":n,o=e.params,i=void 0===o?{}:o,a="";switch(r){case"across":if(!I(i)){var s=[],c="";for(var d in i)s.push(d+"='"+i[d]+"'");s.length&&(c='<script type="text/javascript">var '+s.join(";\nvar ")+";<\/script>"),a=c+'<script type="text/javascript" src="//adf.acrosspf.com/js/acrossadx.js"><\/script>'}}return a}(V(),r):"SX"===r.type&&(o='<iframe width="'+e+'" height="'+n+'" marginwidth="0" marginheight="0" frameborder="0" scrolling="no"\nsrc="'+decodeURIComponent(r.url||r.params.url||r.params.passback)+'"></iframe>'),o},t.Request=function(e){new t(e).request()},t.CheckAsyncScriptLoaded=function(){if(!window.IGAWorks.HeaderBidding){var t=C(document.getElementsByTagName("SCRIPT"),(function(t){var e,n,r=null!==(e=t.getAttribute("src"))&&void 0!==e?e:"",o=null!==(n=t.getAttribute("async"))&&void 0!==n?n:"false";return r.indexOf("headerbidding.js")>=0&&"false"!==o}))[0];if(t){var e=t.getAttribute("data-publisher-id");e&&this.Request(e)}}},t.GetAllBids=function(){function e(t,e){j(Object.keys(t),(function(n){j(t[n].bids,(function(t){e(n,t)}))}))}if(window.pbjs){var n=window.pbjs.getAllWinningBids(),r=[];e(window.pbjs.getBidResponses(),(function(e,o){var i=[].filter.call(t.bids,(function(t){var n=t.bidder;return t.adUnitCode===e&&n===o.bidder}))[0];r.push({msg:o.statusMessage,adUnit:e,adId:o.adId,bidder:o.bidder,size:o.width+"x"+o.height,type:o.mediaType,time:o.timeToRespond,bidfloor:i.bidfloor,originalCpm:+(i.rejected?i.cpm:o.originalCpm),cpm:o.cpm,originalCurrency:o.originalCurrency,currency:o.currency,net:o.netRevenue,rendered:!![].filter.call(n,(function(t){return t.adId===o.adId})).length})})),e(window.pbjs.getNoBids(),(function(t,e){j(Object.keys(e.mediaTypes),(function(n){var o=e.mediaTypes[n].sizes[0],i=o[0],a=void 0===i?0:i,s=o[1],c=void 0===s?0:s;r.push({msg:"no bid",adUnit:t,adId:e.bidId,bidder:e.bidder,size:a+"x"+c,type:n})}))})),r.length?console.table?console.table(r):each(r,(function(t){return console.log(t)})):console.warn("no prebid responses")}else console.warn("no 'prebid.js'")},t.failover=function(t){_(this.maps[t])&&this.maps[t]()},t}();return t.Version="1.0.3",t.bids=[],t.maps={},t}();return Y.CheckAsyncScriptLoaded(),Y}();