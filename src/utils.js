export default class {
    getPerformanceInfo() {
        let timing = window.performance.timing,
            interactive = timing.domInteractive - timing.domLoading,
            dcl = timing.domContentLoadedEventStart - timing.domLoading,
            complete = timing.domComplete - timing.domLoading;
        return {
            interactive: interactive >= 0 ? interactive : undefined,
            dcl: dcl >= 0 ? dcl : undefined,
            complete: complete >= 0 ? complete : undefined
        };
    }

    getClientInfo(targetWindow) {
        const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
        return {
            viewportHeight: window[targetWindow].innerHeight,
            viewportWidth: window[targetWindow].innerWidth,
            screenHeight: window[targetWindow].screen.height,
            screenWidth: window[targetWindow].screen.width,
            screenOrientation: orientation
        };
    }

    getMediaInfo(element) {
        if (element) {
            return {
                src: element.src,
                currentTime: Math.round(element.currentTime * 10) / 10,
                duration: Math.round(element.duration * 10) / 10,
                playedPercent: Math.round(element.currentTime / element.duration * 1000) / 10,
                attr: {
                    type: element.type || undefined,
                    width: element.clientWidth || undefined,
                    height: element.clientHeight || undefined,
                    muted: element.muted || false,
                    defaultMuted: element.defaultMuted || false,
                    autoplay: element.autoplay || false,
                    playerId: element.playerId || undefined,
                    dataset: element.dataset
                }
            };
        } else {
            return false;
        }
    }

    getVisibility(targetElement, targetWindow) {
        let textLength = 0, targetRect = {};
        try {
            targetRect = targetElement.getBoundingClientRect();
            textLength = targetElement.innerText.length;
        } catch (e) {
            targetRect = {};
        }

        const viewportHeight = window[targetWindow].innerHeight;
        const documentHeight = window[targetWindow].document.documentElement.scrollHeight;
        const documentIsVisible = window[targetWindow].document.visibilityState || 'unknown';
        const documentVisibleTop = 'pageYOffset' in window[targetWindow] ?
            window[targetWindow].pageYOffset :
            (window[targetWindow].document.documentElement || window[targetWindow].document.body.parentNode || window[targetWindow].document.body).scrollTop;
        const documentVisibleBottom = documentVisibleTop + viewportHeight;
        const targetHeight = targetRect.height;
        const targetMarginTop = targetRect.top <= 0 ? 0 : targetRect.top;
        const targetMarginBottom = (targetRect.bottom - viewportHeight) * -1 <= 0 ? 0 : (targetRect.bottom - viewportHeight) * -1;
        const documentScrollUntil = documentVisibleBottom;
        const documentScrollRate = documentVisibleBottom / documentHeight;

        let targetVisibleTop = null, targetVisibleBottom = null, isInView = false;

        if (targetRect.top >= 0 && targetRect.bottom > viewportHeight && targetRect.top >= viewportHeight) {
            // pre
            targetVisibleTop = null;
            targetVisibleBottom = null;
            isInView = false;
        } else if (targetRect.top >= 0 && targetRect.bottom > viewportHeight && targetRect.top < viewportHeight) {
            // top
            targetVisibleTop = 0;
            targetVisibleBottom = viewportHeight - targetRect.top;
            isInView = true;
        } else if (targetRect.top < 0 && targetRect.bottom > viewportHeight) {
            // middle
            targetVisibleTop = targetRect.top * -1;
            targetVisibleBottom = targetVisibleTop + viewportHeight;
            isInView = true;
        } else if (targetRect.top >= 0 && targetRect.bottom <= viewportHeight) {
            // all in
            targetVisibleTop = 0;
            targetVisibleBottom = targetHeight;
            isInView = true;
        } else if (targetRect.top < 0 && targetRect.bottom >= 0 && targetRect.bottom <= viewportHeight) {
            // bottom
            targetVisibleTop = targetHeight + targetRect.top;
            targetVisibleBottom = targetHeight;
            isInView = true;
        } else if (targetRect.top < 0 && targetRect.bottom < 0) {
            // post
            targetVisibleTop = null;
            targetVisibleBottom = null;
            isInView = false;
        } else {
            isInView = false;
        }
        return {
            dHeight: documentHeight,
            dIsVisible: documentIsVisible,
            dVisibleTop: documentVisibleTop,
            dVisibleBottom: documentVisibleBottom,
            dScrollUntil: documentScrollUntil,
            dScrollRate: documentScrollRate,
            tHeight: targetHeight,
            tVisibleTop: targetVisibleTop,
            tVisibleBottom: targetVisibleBottom,
            tMarginTop: targetMarginTop,
            tMarginBottom: targetMarginBottom,
            tScrollUntil: targetVisibleBottom,
            tScrollRate: (targetVisibleBottom / targetHeight),
            tViewableRate: ((targetVisibleBottom - targetVisibleTop) / targetHeight),
            tIsInView: isInView,
            tLength: textLength
        };
    }

    queryMatch(selector, target, targetFlag = 'data-trackable') {
        let element, category = 'button', p = [];
        if (target.nodeType === 3) {
            target = target.parentNode;
        }
        while (target && target !== window.parent.document) {
            let matches = (target.matches || target.msMatchesSelector || function () {
                return false;
            }).bind(target);
            if (target.hasAttribute(targetFlag)) {
                p.unshift(target.getAttribute(targetFlag));
            }
            if (!element && matches(selector)) {
                if (target.tagName.toLowerCase() === 'a') {
                    category = 'link';
                } else {
                    category = target.tagName.toLowerCase();
                }
                element = target;
            }
            target = target.parentNode;
        }
        if (element && p.length > 0) {
            return {
                element: element,
                category: category,
                path: p.join('>')
            };
        } else {
            return false;
        }
    }

    mergeObj(objArray) {
        let obj = {};
        for (let i = 0; i < objArray.length; i++) {
            for (let k in objArray[i]) {
                if (typeof objArray[i][k] === 'object' && objArray[i][k] !== null && !Array.isArray(objArray[i][k])) {
                    obj[k] = obj[k] ? this.mergeObj([obj[k], objArray[i][k]]) : objArray[i][k];
                } else if (Array.isArray(objArray[i][k])) {
                    obj[k] = obj[k] ? obj[k].concat(objArray[i][k]) : objArray[i][k];
                } else {
                    obj[k] = objArray[i][k];
                }
            }
        }
        return obj;
    }

    parseUrl(url) {
        let query, result = {}, parser = document.createElement('a');
        if (url) {
            parser.href = url;
            query = parser.search.slice(1).split('&').reduce((obj, val) => {
                let pair = val.split('=');
                obj[pair[0]] = pair[1];
                return obj;
            }, {});
            result = {
                protocol: parser.protocol,
                hostname: parser.hostname,
                port: parser.port,
                pathname: parser.pathname,
                search: parser.search,
                hash: parser.hash,
                query: query
            }
        }
        return result;
    }

    parseMeta(elements) {
        let result = {};
        for (let i = 0; i < elements.length; i++) {
            let key = elements[i].getAttribute('name');
            let val = elements[i].getAttribute('content');
            if (key && val) {
                result[key] = val;
            }
        }
        return result;
    }
}