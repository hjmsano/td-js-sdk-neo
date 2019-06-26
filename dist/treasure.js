!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";function o(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}n.r(t);var r,a=function(e,t,n,o){var r=new XMLHttpRequest;return"function"==typeof o&&(r.onreadystatechange=function(){if(4===r.readyState&&200===r.status){var e;try{e=JSON.parse(r.response)}catch(e){return e}o.call(null,e)}}),r.open("GET",e,!0),r.timeout=n,r.withCredentials=!0,r.send(t),!0},i=!0,c=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),r=t}var t,n,c;return t=e,(n=[{key:"emit",value:function(e){e.td_client_id=r.deviceId;var t,n=btoa(JSON.stringify(e)),o=(t=(+new Date).toString(10),document.location&&document.location.protocol,"".concat("https:","//").concat(r.endpoint,"/js/v3/event/").concat(r.database,"/").concat(r.table,"?api_key=").concat(r.writeKey,"&modified=").concat(t,"&data="));if(o+=encodeURIComponent(n),"sendBeacon"in navigator&&"function"==typeof navigator.sendBeacon&&!0===i){try{i=navigator.sendBeacon(o)}catch(e){i=!1}if(!i)if("fetch"in window[r.target]&&"function"==typeof window[r.target].fetch){var c=new AbortController,d={signal:c.signal,method:"GET",cache:"no-store",keepalive:!0};setTimeout(function(){return c.abort()},r.timeout),window[r.target].fetch(o,d)}else a(o,n,r.timeout)}else a(o,n,r.timeout)}}])&&o(t.prototype,n),c&&o(t,c),e}();function d(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var u={},l=0,s=function(){function e(t){var n,o;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e);try{n=new CustomEvent(t.eventName)}catch(e){(n=window.parent.document.createEvent("CustomEvent")).initCustomEvent(t.eventName,!1,!1,{})}window.parent.requestAnimationFrame=window.parent.requestAnimationFrame||window.parent.mozRequestAnimationFrame||window.parent.webkitRequestAnimationFrame,function e(){if(window.parent.requestAnimationFrame(e),o)return!1;o=setTimeout(function(){window.parent.dispatchEvent(n),o=null},t.eventFrequency)}()}var t,n,o;return t=e,(n=[{key:"addListener",value:function(e,t,n,o){return e.addEventListener(t,n,o),u[l]={element:e,type:t,listener:n,capture:o},l++}},{key:"removeListener",value:function(e){if(e in u){var t=u[e];t.element.removeEventListener(t.type,t.listener,t.capture)}}}])&&d(t.prototype,n),o&&d(t,o),e}();function f(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var m,p,v=function(){for(var e=(+new Date).toString(36),t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",n="",o=0;o<32;o++)n+=t[Math.floor(Math.random()*t.length)];return"".concat(e,"-").concat(n)},w=function(){var e,t,n,o=(e=m,t=window.parent.document.cookie||"",("; ".concat(t,";").match("; ".concat(e,"=([^¥S;]*)"))||[])[1]||""),r=localStorage.getItem(m)||"";return o.length>8?n=o:r.length>8?n=r:(n=p,h=!0),n},h=!1,g=function(){function e(t){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),p=v(),m="".concat(t.prefix,"-id"),this.deviceId=w(),this.rootId=p,this.isNewId=h}var t,n,o;return t=e,(n=[{key:"setDeviceId",value:function(e){this.deviceId=e;try{localStorage.setItem(m,e)}catch(t){window.parent.document.cookie="".concat(m,"=").concat(e,"; Path=/; Max-Age=31536000; SameSite=Lax")}}}])&&f(t.prototype,n),o&&f(t,o),e}();function y(e){return(y="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function b(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var k=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e)}var t,n,o;return t=e,(n=[{key:"getPerformanceInfo",value:function(){var e=window.performance.timing,t=e.domInteractive-e.domLoading,n=e.domContentLoadedEventStart-e.domLoading,o=e.domComplete-e.domLoading;return{interactive:t>=0?t:void 0,dcl:n>=0?n:void 0,complete:o>=0?o:void 0}}},{key:"getClientInfo",value:function(e){var t=screen.orientation||screen.mozOrientation||screen.msOrientation;return{viewportHeight:window[e].innerHeight,viewportWidth:window[e].innerWidth,screenHeight:window[e].screen.height,screenWidth:window[e].screen.width,screenOrientation:t}}},{key:"getMediaInfo",value:function(e){return!!e&&{src:e.src,currentTime:Math.round(10*e.currentTime)/10,duration:Math.round(10*e.duration)/10,playedPercent:Math.round(e.currentTime/e.duration*1e3)/10,attr:{type:e.type||void 0,width:e.clientWidth||void 0,height:e.clientHeight||void 0,muted:e.muted||!1,defaultMuted:e.defaultMuted||!1,autoplay:e.autoplay||!1,playerId:e.playerId||void 0,dataset:e.dataset}}}},{key:"getVisibility",value:function(e,t){var n=0,o={};try{o=e.getBoundingClientRect(),n=e.innerText.length}catch(e){o={}}var r=window[t].innerHeight,a=window[t].document.documentElement.scrollHeight,i=window[t].document.visibilityState||"unknown",c="pageYOffset"in window[t]?window[t].pageYOffset:(window[t].document.documentElement||window[t].document.body.parentNode||window[t].document.body).scrollTop,d=c+r,u=o.height,l=o.top<=0?0:o.top,s=-1*(o.bottom-r)<=0?0:-1*(o.bottom-r),f=d,m=d/a,p=null,v=null,w=!1;return o.top>=0&&o.bottom>r&&o.top>=r?(p=null,v=null,w=!1):o.top>=0&&o.bottom>r&&o.top<r?(p=0,v=r-o.top,w=!0):o.top<0&&o.bottom>r?(v=(p=-1*o.top)+r,w=!0):o.top>=0&&o.bottom<=r?(p=0,v=u,w=!0):o.top<0&&o.bottom>=0&&o.bottom<=r?(p=u+o.top,v=u,w=!0):o.top<0&&o.bottom<0?(p=null,v=null,w=!1):w=!1,{dHeight:a,dIsVisible:i,dVisibleTop:c,dVisibleBottom:d,dScrollUntil:f,dScrollRate:m,tHeight:u,tVisibleTop:p,tVisibleBottom:v,tMarginTop:l,tMarginBottom:s,tScrollUntil:v,tScrollRate:v/u,tViewableRate:(v-p)/u,tIsInView:w,tLength:n}}},{key:"queryMatch",value:function(e,t){var n,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"data-trackable",r="button",a=[];for(3===t.nodeType&&(t=t.parentNode);t&&t!==window.parent.document;){var i=(t.matches||t.msMatchesSelector||function(){return!1}).bind(t);t.hasAttribute(o)&&a.unshift(t.getAttribute(o)),!n&&i(e)&&(r="a"===t.tagName.toLowerCase()?"link":t.tagName.toLowerCase(),n=t),t=t.parentNode}return!!(n&&a.length>0)&&{element:n,category:r,path:a.join(">")}}},{key:"mergeObj",value:function(e){for(var t={},n=0;n<e.length;n++)for(var o in e[n])"object"!==y(e[n][o])||null===e[n][o]||Array.isArray(e[n][o])?Array.isArray(e[n][o])?t[o]=t[o]?t[o].concat(e[n][o]):e[n][o]:t[o]=e[n][o]:t[o]=t[o]?this.mergeObj([t[o],e[n][o]]):e[n][o];return t}},{key:"parseUrl",value:function(e){var t,n={},o=document.createElement("a");return e&&(o.href=e,t=o.search.slice(1).split("&").reduce(function(e,t){var n=t.split("=");return e[n[0]]=n[1],e},{}),n={protocol:o.protocol,hostname:o.hostname,port:o.port,pathname:o.pathname,search:o.search,hash:o.hash,query:t}),n}},{key:"parseMeta",value:function(e){for(var t={},n=0;n<e.length;n++){var o=e[n].getAttribute("name"),r=e[n].getAttribute("content");o&&r&&(t[o]=r)}return t}}])&&b(t.prototype,n),o&&b(t,o),e}();function M(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}var I,L,S,T,A,C,O,N,_="0.0.1",j=new Date,E={media:[]},P=new Date,x=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.dataModel={td_version:_,td_charset:(document.characterSet||document.charset||"-").toLowerCase(),td_language:(window.navigator&&(window.navigator.language||window.navigator.browserLanguage)||"-").toLowerCase(),td_color:window.screen?window.screen.colorDepth+"-bit":"-",td_title:document.title,td_user_agent:window.navigator.userAgent}}var t,n,o;return t=e,(n=[{key:"config",value:function(e){I=e,C=new k,S=new g({prefix:I.prefix,target:I.targetWindow}),T=new c({endpoint:I.endpoint,writeKey:I.writeKey,database:I.database,table:I.table,method:I.method,timeout:I.timeout,prefix:I.prefix,deviceId:S.deviceId,rootId:S.rootId,target:I.targetWindow}),L=I.targetWindow,O=C.parseUrl(window[L].document.location.href),N=C.parseMeta(window[L].document.getElementsByTagName("meta")),this.dataModel.td_url=window[L].document.location.href,this.dataModel.td_host=O.hostname,this.dataModel.td_path=O.pathname,this.dataModel.td_referrer=window[L].document.referrer,this.dataModel.td_description=N.description}},{key:"init",value:function(e){this.dataModel=C.mergeObj([this.dataModel,e]),I.eventName&&I.eventFrequency&&void 0===A&&(A=new s({eventName:I.eventName,eventFrequency:I.eventFrequency})),"performance"in window[L]&&("interactive"===window[L].document.readyState||"complete"===window[L].document.readyState?this.trackAction("rum","page",{}):this.trackPerformance(L)),I.options&&I.options.unload&&I.options.unload.enable&&this.trackUnload(L),I.options&&I.options.scroll&&I.options.scroll.enable&&this.trackScroll(I.options.scroll.granularity,I.options.scroll.threshold,I.options.scroll.unit,I.eventName),I.options&&I.options.read&&I.options.read.enable&&this.trackRead(I.options.read.granularity,I.options.read.threshold,I.options.read.target,I.eventName),I.options&&I.options.clicks&&I.options.clicks.enable&&this.trackClicks(I.options.clicks.targetAttr),I.options&&I.options.media&&I.options.media.enable&&this.trackMedia(I.options.media.heartbeat)}},{key:"trackAction",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"unknown",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"unknown",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=new Date,r=C.mergeObj([this.dataModel,n,{action:e,category:t,client:C.getClientInfo(L),performance:C.getPerformanceInfo(),sinceInitMs:o.getTime()-j.getTime(),sincePrevMs:o.getTime()-P.getTime()}]);P=o,T.emit(r),S.setDeviceId(S.deviceId)}},{key:"trackPage",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};this.trackAction("view","page",e)}},{key:"trackPerformance",value:function(){var e=this;A.removeListener(E.performance),E.performance=A.addListener(window[L].document,"DOMContentLoaded",function(){e.trackAction("rum","page",{})},!1)}},{key:"trackUnload",value:function(){var e,t=this;e="onbeforeunload"in window[L]?"beforeunload":"onpagehide"in window[L]?"pagehide":"unload",A.removeListener(E.unload),E.unload=A.addListener(window[L],e,function(){t.trackAction("unload","page",{})},!1)}},{key:"trackClicks",value:function(e){var t=this;A.removeListener(E.click),E.click=A.addListener(window[L].document.body,"click",function(n){var o=e||"data-trackable",r=C.queryMatch('a, button, input, [role="button"]',n.target,o),a=null;r&&(a=r.element,t.trackAction("click",r.category,{click:{tag:a.tagName,id:a.id||void 0,class:a.className||void 0,path:r.path||void 0,link:a.href||void 0,attr:a.dataset||void 0}}))},!1)}},{key:"trackScroll",value:function(e,t,n,o){var r=this,a=e||20,i=100/a,c=1e3*t||2e3,d={},u=0,l=0,s="percent";A.removeListener(E.scroll),E.scroll=A.addListener(window[L],o,function(){"hidden"!==(d=C.getVisibility(null,L)).dIsVisible&&"prerender"!==d.dIsVisible&&("percent"===n?u=Math.floor(d.dScrollRate*i)*a:(u=d.dScrollUntil,s="pixel"),("percent"===s&&u>l&&u>=0&&u<=100||"pixel"===s&&u>l&&u>=a)&&setTimeout(function(){u>l&&(r.trackAction("scroll","page",{scroll:{pageHeight:d.dHeight,depth:u,unit:s}}),l="percent"===s?u:u+a)},c))},!1)}},{key:"trackRead",value:function(e,t,n,o){var r=this;if(n){var a=e||20,i=100/a,c=1e3*t||2e3,d={},u=0,l=0;A.removeListener(E.read),E.read=A.addListener(window[L],o,function(){"hidden"!==(d=C.getVisibility(n,L)).dIsVisible&&"prerender"!==d.dIsVisible&&d.tIsInView&&(u=Math.floor(d.tScrollRate*i)*a)>l&&u>=0&&u<=100&&setTimeout(function(){u>l&&(r.trackAction("read","content",{read:{targetHeight:d.tHeight,textLength:d.tLength,readRate:u}}),l=u)},c)},!1)}}},{key:"trackMedia",value:function(){for(var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,n=["play","pause","ended"],o={},r=0;r<n.length;r++)A.removeListener(E.media[n[r]]),E.media[n[r]]=A.addListener(window[L].document.body,n[r],function(t){e.trackAction(t.type,t.target.tagName.toLowerCase(),{media:C.getMediaInfo(t.target)})},{capture:!0});A.removeListener(E.media.timeupdate),E.media.timeupdate=A.addListener(window[L].document,"timeupdate",function(n){if(o[n.target.src])return!1;o[n.target.src]=setTimeout(function(){!0!==n.target.paused&&!0!==n.target.ended&&e.trackAction(n.type,n.target.tagName.toLowerCase(),{media:C.getMediaInfo(n.target)}),o[n.target.src]=!1},1e3*t)},{capture:!0})}},{key:"getQueryVal",value:function(e){return O.query[e]?O.query[e]:""}}])&&M(t.prototype,n),o&&M(t,o),e}();window.Treasure=new x}]);