!function(){Object.freeze(["",""]);var t='div[class*="iwm_ba"][data-ad]',e={isArray:function(t){return"[object Array]"===Object.prototype.toString.call(t)},domReady:function(t){for(var e=[],n=arguments.length-1;n-- >0;)e[n]=arguments[n+1];"loading"!==document.readyState?t.apply(window,e):document.addEventListener("DOMContentLoaded",function(){return t.apply(window,e)})},uuid:function(){var t=+new Date;return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var n=(t+16*Math.random())%16|0;return t=Math.floor(t/16),("x"==e?n:3&n|8).toString(16)})},create:function(t,e){void 0===e&&(e={});var n=document.createElement(t);for(var r in e)n[r]=e[r];return n},createIframe:function(){var t=this.create("iframe",{marginWidth:0,marginHeight:0,frameBorder:0,scrolling:"no"});return t.setAttribute("allowtransparency","true"),t.setAttribute("allowfullscreen","true"),t},event:{add:function(t,e,n){t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n},remove:function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=null}}},n=function(t){this.e=t||e.create("div"),this.h={}};n.prototype.on=function(t,n){for(var r=0,i=e.isArray(t)?t:t.split(/[, ]/g);r<i.length;r+=1){var a=i[r];this.h[a]=this.h[a]||[],this.h[a].push(n),e.event.add(this.e,a,n)}return this},n.prototype.once=function(t,e){var n,r,i,a;return this.on(t,(n=this,r=t,i=e,a=!1,function t(){for(var e=[],o=arguments.length;o--;)e[o]=arguments[o];n.off(r,t),a||(a=!0,i.apply(n,e))}))},n.prototype.off=function(t,n){for(var r=0,i=e.isArray(t)?t:t.split(/[, ]/g);r<i.length;r+=1)for(var a=i[r],o=this.h[a].length;--o;)this.h[a][o]===n&&(this.h[a].splice(o,1),e.event.remove(this.e,a,n));return this};var r,i=function(t){0===this.init(t)&&(this.setStatus(2),this.createIframe())};i.prototype.init=function(t){this.e=t,this.uuid=e.uuid(),this.status=this.attr("ad-status")||0,this.setContainerStyle();try{this.data=JSON.parse(this.attr("ad").replace(/\'/g,'"')),this.attr("ad",!0),this.pbUrl=this.pbAttr("url"),this.pbType=this.pbAttr("type"),this.pbUrl&&this.pbType&&(this.iwm_pb={type:this.pbType,url:escape(this.pbUrl),w:""+t.style.width,h:""+t.style.height},this.pbAttr("url",!0),this.pbAttr("type",!0))}catch(t){this.status=1}return this.status},i.prototype.createIframe=function(){var t=this.i=e.createIframe();new n(t).once("load",function(){this.updateContent(),this.setStatus(3)}.bind(this)),this.setContentStyle(),this.e.appendChild(t)},i.prototype.setContainerStyle=function(){var t=this.e.style;t.border="none",t.margin=t.padding=0,t.position="relative",t.backgroundColor="transparent",null!=this.attr("ad-center")&&(this.attr("ad-center",!0),t.display="block",t.margin="0 auto")},i.prototype.setContentStyle=function(){var t=this.e,e=this.i,n=t.style.width,r=t.style.height;e.width=n,e.height=r,e.style.position="absolute",e.style.left=e.style.top=0,e.style.width=n+"px",e.style.height=r+"px"},i.prototype.setStatus=function(t){this.e.setAttribute("data-ad-status",this.status=t)},i.prototype.attr=function(t,e){return void 0===e&&(e=!1),this.e[(e?"remove":"get")+"Attribute"]("data-"+t)},i.prototype.pbAttr=function(t,e){return void 0===e&&(e=!1),this.e[(e?"remove":"get")+"Attribute"]("pb"+t)},i.prototype.updateContent=function(){var t=this.uuid,e=function(){var e,n,r,i=this.i.contentWindow,a=i.document,o=document.createElement("meta");o.name="referrer",o.content="no-referrer-when-downgrade",document.getElementsByTagName("head")[0]&&document.getElementsByTagName("head")[0].appendChild(o),i.uuid=t,a.body&&a.body.firstChild||(/firefox/i.test(navigator.userAgent)?a.open("text/html","replace"):a.open(),a.write((e={data:this.data,pURL:this.getURL()},n=e.data,r=e.pURL,'<!DOCTYPE html>\n<html lang="ko">\n<head>\n<meta charset="utf-8" />\n<meta http-equiv="X-UA-Compatible" content="IE=edge">\n<meta name="viewport" content="width=device-width, initial-scale=1">\n<meta name="referrer" content="no-referrer-when-downgrade">\n</head>\n<body>\n<script>var pgURL=\''+encodeURIComponent(r)+"'<\/script>\n<script src=\"https://tm.interworksmedia.co.kr/ads.js/"+n.id+"?pgURL="+encodeURIComponent(r)+"&r="+ +new Date+'"><\/script>\n</body>\n</html>')),i.iwm_pb=this.iwm_pb,a.close())}.bind(this);try{e()}catch(n){iwm_ba[t]=e,this.i.src="javascript:(function(){document.write('<script>try{document.domain=\""+document.domain+'";parent.window.iwm_ba["'+t+'"]();parent.window.iwm_ba["'+t+"\"]=void 0}catch(e){}<\/script>')})()"}},i.prototype.getURL=function(){var t;if(document.domain.indexOf("ad.linkprice.com")>-1){var e=document.location.href||"",n=new RegExp("[\\?&]r=([^#]*)").exec(e);t=null==n?"":unescape(n[1])}if(document.domain.indexOf("www.mediacategory.com")>-1){var r=document.location.href||"",i=new RegExp("[\\?&]from=([^#]*)").exec(r);t=null==i?"":unescape(i[1])}var a,o=window,s="",c="";do{a=o;try{s=a.location.href,c=a.document&&a.document.referrer||"",o=a.parent}catch(t){s="",o=null}}while(o&&a!=o);var d=s||c||"",h=new RegExp("[\\?&]pgURL=([^&#]*)").exec(d);return(null==h?"":unescape(h[1]))||t||window.pgURL||s||c},iwm_ba=window.iwm_ba||{},r=Array.prototype.slice.call(document.querySelectorAll(t)),e.domReady(function(){for(var t=0,e=r;t<e.length;t+=1){var n=e[t];new i(n)}})}();
