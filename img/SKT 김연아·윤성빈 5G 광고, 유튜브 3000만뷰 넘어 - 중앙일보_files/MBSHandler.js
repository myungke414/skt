/*
* MBSHandler.js
* desc : 인라이플 매체 스크립트를 제어 한다. 배너, 아이커버등의 상품의 스크립트 로직을 여기서 처리 함.
* version : 1.1
* author : bnjjong
* license : 모든 소유권은 (주)Enliple이 가집니다. 무단 배포, 수정을 금지합니다.
*/

(function (global, factory) {
    if (typeof define === 'function' && define.amd) {
        define(factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        global.enlipleMBSHandler = factory();
    }
}(this, function () {

    var enlipleMBSHandler,
        VERSION = '1.1',
        scriptFileName = "MBSHandler.js",
        defaultProtocol = "https:";
    defaults = {
        isDebugMode: false
        , isSendingErrMsg: false
        , scriptDownTime: 500
        , defaultProtocol: defaultProtocol
    },
        options = {
            isDebugMode: defaults.isDebugMode
            , isSendingErrMsg: defaults.isSendingErrMsg
            , scriptDownTime: defaults.scriptDownTime
            , defaultProtocol: defaults.defaultProtocol
        },
        productTypeValues = {
            banner: 1 /* 일반 고정 배너 */
            , bannerScript: 2 /* 토스트, 엣지, 플로팅 */
            , sky: 3
            , ico: 4
            , contentBox: 5
            , hashTag: 6
            , bacon: 7
        },
        platformTypeValues = {
            web: 1
            , mobile: 2
        };


    (function () {
        var headNodes = document.getElementsByTagName("head")[0].children;
        var i = 0, length = headNodes.length;
        for (; i < length; i++) {
            if (typeof headNodes[i].nodeName !== 'undefined' &&
                headNodes[i].nodeName.toUpperCase() === "SCRIPT" &&
                headNodes[i].src.indexOf(scriptFileName) > -1) {
                options.isDebugMode = headNodes[i].src.toLowerCase().indexOf("test") > -1;
                break;
            }
        }
        if (options.isDebugMode && console.log) {
            console.log("========================");
            console.log("!!!!it is debug mode!!!!");
            console.log("========================");
        }
        if (location.protocol) {
            options.defaultProtocol = location.protocol;
            if (location.protocol !== "http:" && location.protocol !== "https:") {
                options.defaultProtocol = defaultProtocol;
            }
        }
    })();

    var appendIframeToBody = function (iframeObj) {
        if (options.isDebugMode && console.log) {
            console.log("start append iframe!!!");
        }

        var interval = setInterval(function () {
            if (!document.body) return;
            clearInterval(interval);
            document.body.appendChild(iframeObj);

            if (options.isDebugMode && console.log) {
                console.log("end append iframe!!!");
            }
        }, 25);
    };

    var appendIframeToDiv = function (iframeObj, divId) {
        document.getElementById(divId).appendChild(iframeObj);
    };

    var createIframe = function (src, width, height, isApplyDefaultAttr, onloadCallbackFn) {

        if (options.isDebugMode && console.log) {
            console.log("create iframe" + src);
        }
        var iframe = document.createElement("iframe");
        iframe.src = src;
        iframe.width = width;
        iframe.height = height;
        if (isApplyDefaultAttr) {
            setDefaultAttrOfIframe(iframe);
        }
        if (onloadCallbackFn && typeof onloadCallbackFn === 'function') {
            iframe.onload = onloadCallbackFn;
        }
        if (options.isDebugMode && console.dir && console.log) {
            console.log("iframe obj info >>>>>>>>>>>>>");
            console.dir(iframe);
        }

        return iframe;
    };

    var setDefaultAttrOfIframe = function (iframeObj) {
        iframeObj.frameBorder = 0;
        iframeObj.marginWidth = 0;
        iframeObj.marginHeight = 0;
        iframeObj.scrolling = 'no';
    };

    var setHiddenIframe = function (iframeObj) {
        iframeObj.setAttribute('style', 'height:0;width:0;border:0;border:none;visibility:hidden;');
        return iframeObj;
    };

    var importScript = function (scriptUrl, callbackFn) {
        if (options.isDebugMode && console.log) {
            console.log("script down time>>>>" + options.scriptDownTime);
            console.log("import script>>>>" + scriptUrl);
            console.dir(callbackFn);
        }
        var isScriptDownFail = false;
        var scriptTimer = setTimeout(function () {
            if (typeof callbackFn === 'function') {
                if (options.isDebugMode && console.log) {
                    console.log("timeout!! call callback!!!");
                }
                isScriptDownFail = true;
                callbackFn();
            }
        }, options.scriptDownTime);
        var head = document.getElementsByTagName("head").item(0);
        var script = document.createElement("script");
        script.src = scriptUrl;
        script.type = "text/javascript";
        script.onload = function () {
            clearTimeout(scriptTimer);
            if (isScriptDownFail) return;
            if (typeof callbackFn === 'function') {
                if (options.isDebugMode && console.log) {
                    console.log("complete to import script call callback!!!");
                }
                callbackFn();
            }
        };
        head.appendChild(script);
    };

    var printParam = function (params, msg) {
        if (options.isDebugMode && console.log) {
            console.log(msg);
            var i = 0;
            var length = params.length;
            for (; i < length; i++) {
                console.log(params[i]);
            }
            console.log("end print param!!");
        }
    };

    if (!String.prototype.startsWith) {
        String.prototype.startsWith = function (searchString, position) {
            position = position || 0;
            return this.indexOf(searchString, position) === position;
        };
    }


    var protocolValidate = function (src) {
        if (!src.startsWith("http")) {
            src = options.defaultProtocol + src;
        }
        return src;
    };

    /************************************
     Constructors
     ************************************/
    function EnlipleMBSHandler(productType, platformType, scriptNo) {
        this.productType = productType;
        this.scriptNo = scriptNo;
        this.platformType = platformType;
        if (productType === productTypeValues.banner
            || productType === productTypeValues.contentBox
            || productType === productTypeValues.hashTag) {
            this.divId = "mobonDivBanner_" + this.scriptNo;
        }
    }

    enlipleMBSHandler = function (productType, platformType, scriptNo) {
        return new EnlipleMBSHandler(productType, platformType, scriptNo);
    };

    enlipleMBSHandler.getProductTypeCode = function (name) {
        return productTypeValues[name];
    };

    enlipleMBSHandler.getPlatformTypeCode = function (name) {
        return platformTypeValues[name];
    };

    enlipleMBSHandler.getWebCode = function () {
        return platformTypeValues.web;
    };
    enlipleMBSHandler.getMobCode = function () {
        return platformTypeValues.mobile;
    };
    enlipleMBSHandler.setDebugMode = function (isDebugMode) {
        options.isDebugMode = isDebugMode;
    };

    enlipleMBSHandler.doCookieCopy = function (callbackFn) {};

    enlipleMBSHandler.doChargeCookieCopy = function (callbackFn) {};


    // 난중에 수정이 좀 필요 하겠다.
    enlipleMBSHandler.runMcover = function (adUrl) {
        printParam(arguments, "appendMCover params>>>");
        if (location.href.indexOf("#_enliple") === -1 || location.hash.indexOf("#_enliple") === -1) {
            history.pushState(null, document.title, location.href);
            history.replaceState(null, document.title, location.href + "#_enliple");
        }
        window.addEventListener('hashchange', function (e) {
            if (document.URL.indexOf("#_enliple") !== -1) {
            } else {
                setTimeout(function () {
                    location.replace(adUrl);
                }, 25);
            }
        });
    };


    EnlipleMBSHandler.prototype = {
        createBanner: function (src, width, height) {
            src = protocolValidate(src);
            printParam(arguments, "createBanner params");
            var divId = this.divId;
            appendIframeToDiv(createIframe(src, width, height, true, undefined), divId);
        },
        appendScript: function (src) {
            src = protocolValidate(src);
            printParam(arguments, "appendScript params");
            importScript(src)
        },
        appendPassBackScript: function (src, callbackFn) {
            src = protocolValidate(src);
            printParam(arguments, "appendPassBackScript params");
            importScript(src, callbackFn);
        },
        appendICover: function (src) {
            src = protocolValidate(src);
            printParam(arguments, "appendICover params");
            appendIframeToBody(createIframe(src, 0, 0, true));
        }
    };
    enlipleMBSHandler.version = VERSION;
    return enlipleMBSHandler;
}));
