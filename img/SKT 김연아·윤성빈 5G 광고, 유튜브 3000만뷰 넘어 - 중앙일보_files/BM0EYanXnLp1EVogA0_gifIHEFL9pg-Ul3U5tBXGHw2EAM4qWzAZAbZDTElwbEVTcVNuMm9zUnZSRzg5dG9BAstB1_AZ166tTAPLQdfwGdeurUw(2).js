(function(){function k(a){var b=window;try{b.addEventListener?b.addEventListener("message",a,!1):b.attachEvent("onmessage",a)}catch(c){}}function r(a,b){var c=document.createElement("script");c.setAttribute("src",a);b&&(c.onload=b);h.parentNode.insertBefore(c,h)}function t(a,b){var c;null===b?c=a:c=a+":"+b;try{window.top.postMessage("cast.imp.joins.com:SET:"+c,"*")}catch(d){}}function u(a,b){function c(a){d&&clearTimeout(d);if(f){try{window.addEventListener?window.removeEventListener("message",f):window.detachEvent("onmessage",
f)}catch(e){}f=null}b(a)}var d=null,f=null,f=function(b){if(f){var e=23;if("string"==typeof b.data&&"cast.imp.joins.com:VAL:"==b.data.substring(0,e)){var e=b.data.substring(e),d=e.indexOf(":");0>d?(b=e,e=null):(b=e.substring(0,d),e=e.substring(d+1));a==b&&c(e)}}};k(f);d=setTimeout(function(){c(null)},1E3);try{window.top.postMessage("cast.imp.joins.com:GET:"+a,"*")}catch(v){c(null)}}function l(a,b,c,d,f){if(!m&&(m=!0,!d)){a={persona:{token:a,now:c,url:f,origin:!1},placeholder:h,insert_script:r,
set:t,get:u,rid:"nVvaMx7lQzWnzSeQci9jAg",vid:b,vt:c,click:"//cast.imp.joins.com/click/-KniJsRDtXtnnOQ2G378rLcCegfEytF60OLOLUUcHS-FpXNpbmNly0HX8BnXrq1Mo3JpZLZuVnZhTXg3bFF6V256U2VRY2k5akFno2NpZLZGVzBWQzk2bVNpaXdjcVYwMTZETmNRo3VpZLZDTElwbEVTcVNuMm9zUnZSRzg5dG9BpXJ0aW1ly0HX8Bnf_AJ0/",site:"mleZXpBYr5m9PzgksnADshZlvWKkOSnf0P935Bn0sX2Q",pref:"SR89EdhRwhxEII6KPTE8aR8JpUm5di8tQHGj6nt4AdeA",query:""};window["FW0VC96mSiiwcqV016DNcQ.cast.imp.joins.com"]=a;try{var g=[function($){ var container_id = $.placeholder.id;var param="?_cid="+$.placeholder.id+"&_uid="+$.persona.token+"&_ref="+encodeURIComponent($.persona.url); if(container_id == ""){space = document.body;}else{space = document.getElementById(container_id);}space.style.display="black";var ifrmrndr = document.createElement("iframe");ifrmrndr.setAttribute("src", "//ad.imp.joins.com/html/joongang_p/article/article@article_top_left_120x200"+param);ifrmrndr.setAttribute("height", "200px");ifrmrndr.setAttribute("width", "120px");ifrmrndr.setAttribute("name", "mliframe");ifrmrndr.setAttribute("scrolling", "no");ifrmrndr.setAttribute("frameborder", "0");ifrmrndr.setAttribute("topmargin", "0");ifrmrndr.setAttribute("leftmargin", "0");ifrmrndr.setAttribute("marginwidth", "0");ifrmrndr.setAttribute("marginheight", "0");ifrmrndr.setAttribute("allowtransparency", "true");space.appendChild(ifrmrndr);}];for(b=0;b<g.length;b++)try{g[b](a)}catch(e){}}catch(e){}}}function g(a){l("BM0EYanXnLp1EVogA0_gifIHEFL9pg-Ul3U5tBXGHw2EAM4qWzAZAbZDTElwbEVTcVNuMm9zUnZSRzg5dG9BAstB1_AZ166tTAPLQdfwGdeurUw","",1606444927938,!1,a)}function n(){if(0<p)--p,q=setTimeout(n,1E3),window.top.postMessage("cast.imp.joins.com:REQ:BM0EYanXnLp1EVogA0_gifIHEFL9pg-Ul3U5tBXGHw2EAM4qWzAZAbZDTElwbEVTcVNuMm9zUnZSRzg5dG9BAstB1_AZ166tTAPLQdfwGdeurUw","*");else{var a=window,b=!1;try{for(;a.parent.document!==a.document;)if(a.parent.document)a=a.parent;
else{b=!0;break}}catch(d){b=!0}if(b)try{try{var c=window.top.location.href;if(c)g(c);else throw 0;}catch(d){g("")}}catch(d){g("")}else g(a.location.href)}}var p=parseInt("3",10),h=document.getElementById("FW0VC96mSiiwcqV016DNcQ"),m=!1,q;k(function(a){var b=23;if("string"==typeof a.data&&"cast.imp.joins.com:RES:"==a.data.substring(0,b)&&(a=a.data.substring(b).split(":",5),5==a.length)){clearTimeout(q);var b=parseInt(a[2],10),c="true"==a[3];isNaN(b)||l(a[0],a[1],
b,c,decodeURIComponent(a[4]))}});n()})();