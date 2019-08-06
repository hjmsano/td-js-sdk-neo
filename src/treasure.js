import Emitter from './emitter';
import Events from './events';
import IDM from './idm';
import Utils from './utils';

const
    sdkVersion = '0.0.2',
    initTimestamp = new Date();

let config, targetWindow, idm, emitter, events, utils, parsedUrl, parsedMeta,
    eventHandlerKeys = {media: []},
    prevTimestamp = new Date();

export default class Treasure {

    constructor() {
        this.dataModel = {
            td_version: sdkVersion,
            td_charset: (document.characterSet || document.charset || '-').toLowerCase(),
            td_language: ((window.navigator && (window.navigator.language || window.navigator.browserLanguage)) || '-').toLowerCase(),
            td_color: window.screen ? window.screen.colorDepth + '-bit' : '-',
            td_title: document.title,
            td_user_agent: window.navigator.userAgent,
            td_browser: 'td_browser',
            td_browser_version: 'td_browser_version',
            td_os: 'td_os',
            td_os_version: 'td_os_version',
            td_globl_id: 'td_global_id',
            td_ip: 'td_ip',
        };
    }

    /**
     * Configure the SDK.
     * @param  {Object} configObj Configuration variables.
     */
    config(configObj) {
        config = configObj;
        utils = new Utils();
        targetWindow = config.targetWindow;
        idm = new IDM({
            storageName: config.storageName || '_td',
            storageExpires: config.storageExpires || 63072000,
            storageDomain: config.storageDomain || utils.getDomain(window[targetWindow].document.location.hostname),
            target: targetWindow
        });
        emitter = new Emitter({
            endpoint: config.endpoint,
            writeKey: config.writeKey,
            database: config.database,
            table: config.table,
            method: config.method,
            timeout: config.timeout,
            prefix: config.prefix,
            deviceId: idm.deviceId,
            rootId: idm.rootId,
            target: targetWindow
        });
        parsedUrl = utils.parseUrl(window[targetWindow].document.location.href);
        parsedMeta = utils.parseMeta(window[targetWindow].document.getElementsByTagName('meta'));
        this.dataModel['td_url'] = window[targetWindow].document.location.href;
        this.dataModel['td_host'] = parsedUrl.hostname;
        this.dataModel['td_path'] = parsedUrl.pathname;
        this.dataModel['td_referrer'] = window[targetWindow].document.referrer;
        this.dataModel['td_description'] = parsedMeta.description;
    }

    /**
     * Initialize a page level variables.
     * @param  {Object} initialData Additional data model.
     */
    init(initialData) {

        this.dataModel = utils.mergeObj([
            this.dataModel,
            initialData
        ]);

        if (config.eventName && config.eventFrequency && typeof events === 'undefined') {
            events = new Events({
                eventName: config.eventName,
                eventFrequency: config.eventFrequency
            });
        }

        if ('performance' in window[targetWindow]) {
            if (window[targetWindow].document.readyState === "interactive" || window[targetWindow].document.readyState === "complete") {
                this.trackAction('rum', 'page', {});
            } else {
                this.trackPerformance(targetWindow);
            }
        }

        if (config.options && config.options.unload && config.options.unload.enable) {
            this.trackUnload(targetWindow);
        }

        if (config.options && config.options.scroll && config.options.scroll.enable) {
            this.trackScroll(
                config.options.scroll.granularity,
                config.options.scroll.threshold,
                config.options.scroll.unit,
                config.eventName);
        }

        if (config.options && config.options.read && config.options.read.enable) {
            this.trackRead(
                config.options.read.granularity,
                config.options.read.threshold,
                config.options.read.target,
                config.eventName);
        }

        if (config.options && config.options.clicks && config.options.clicks.enable) {
            this.trackClicks(config.options.clicks.targetAttr);
        }


        if (config.options && config.options.media && config.options.media.enable) {
            this.trackMedia(config.options.media.heartbeat);
        }
    }

    /**
     * Track an event with additional data.
     * @param  {String} action Action name.
     * @param  {String} category Category name.
     * @param  {Object} eventContext Additional data.
     */
    trackAction(action = 'unknown', category = 'unknown', eventContext = {}) {
        const now = new Date();
        const client = utils.getClientInfo(targetWindow);
        const record = utils.mergeObj([
            this.dataModel,
            eventContext,
            utils.getPerformanceInfo(),
            {
                action: action,
                category: category,
                since_init_ms: now.getTime() - initTimestamp.getTime(),
                since_prev_ms: now.getTime() - prevTimestamp.getTime(),
                td_viewport: `${client.viewport_w}x${client.viewport_h}`,
                td_screen: `${client.screen_w}x${client.screen_h}`
            }
        ]);
        prevTimestamp = now;
        emitter.emit(record);
        idm.setDeviceId(idm.deviceId);
    }

    /**
     * Track a pageview event.
     * @param  {Object} eventContext Additional data.
     */
    trackPage(eventContext = {}) {
        this.trackAction('view', 'page', eventContext);
    }

    /**
     * Add a tracker to the onload event.
     */
    trackPerformance() {
        events.removeListener(eventHandlerKeys['performance']);
        eventHandlerKeys['performance'] = events.addListener(window[targetWindow].document, 'DOMContentLoaded', () => {
            this.trackAction('rum', 'page', {});
        }, false);
    }

    /**
     * Add a tracker to the unload event.
     */
    trackUnload() {
        let unloadEvent;
        if ('onbeforeunload' in window[targetWindow]) {
            unloadEvent = 'beforeunload';
        } else if ('onpagehide' in window[targetWindow]) {
            unloadEvent = 'pagehide';
        } else {
            unloadEvent = 'unload';
        }
        events.removeListener(eventHandlerKeys['unload']);
        eventHandlerKeys['unload'] = events.addListener(window[targetWindow], unloadEvent, () => {
            this.trackAction('unload', 'page', {});
        }, false);
    }

    /**
     * Add a tracker to the click event.
     * @param  {String} targetAttr An attribution name (key) to identify trackable elements
     */
    trackClicks(targetAttr) {
        events.removeListener(eventHandlerKeys['click']);
        eventHandlerKeys['click'] = events.addListener(window[targetWindow].document.body, 'click', (clickEvent) => {
            const targetAttribute = targetAttr || 'data-trackable';
            const trackableElement = utils.queryMatch('a, button, input, [role="button"]', clickEvent.target, targetAttribute);
            let element = null;
            if (trackableElement) {
                element = trackableElement.element;
                this.trackAction('click', trackableElement.category, {
                    cl_tag: element.tagName,
                    cl_id: element.id || undefined,
                    cl_class: element.className || undefined,
                    cl_path: trackableElement.path || undefined,
                    cl_link: element.href || undefined,
                    cl_attr: element.dataset || undefined
                });
            }
        }, false);
    }

    /**
     * Start scroll observation by using custom event
     * @param  {Integer} granularity track the depth every X percent/pixels increased
     * @param  {Integer} threshold track the depth when the user stay at/over X percent/pixels for more than T seconds specified here
     * @param  {String} unit percent or pixel
     * @param  {String} eventName a target custom event to listen for dispatching observation
     */
    trackScroll(granularity, threshold, unit, eventName) {
        const each = granularity || 20;
        const steps = 100 / each;
        const limit = threshold * 1000 || 2 * 1000;
        let result = {}, currentVal = 0, prevVal = 0, scrollUnit = 'percent';
        events.removeListener(eventHandlerKeys['scroll']);
        eventHandlerKeys['scroll'] = events.addListener(window[targetWindow], eventName, () => {
            result = utils.getVisibility(null, targetWindow);
            if (result.dIsVisible !== 'hidden' && result.dIsVisible !== 'prerender') {
                if (unit === 'percent') {
                    currentVal = Math.floor(result.dScrollRate * steps) * each;
                } else {
                    currentVal = result.dScrollUntil;
                    scrollUnit = 'pixel';
                }

                if ((scrollUnit === 'percent' && currentVal > prevVal && currentVal >= 0 && currentVal <= 100)
                    || (scrollUnit === 'pixel' && currentVal > prevVal && currentVal >= each)) {
                    setTimeout(() => {
                        if (currentVal > prevVal) {
                            this.trackAction('scroll', 'page', {
                                sc_page_height: result.dHeight,
                                sc_depth: currentVal,
                                sc_unit: scrollUnit
                            });
                            prevVal = (scrollUnit === 'percent') ? currentVal : currentVal + each;
                        }
                    }, limit);
                }
            }
        }, false);
    }


    trackRead(granularity, threshold, target, eventName) {
        if (!target) {
            return;
        }
        const each = granularity || 20;
        const steps = 100 / each;
        const limit = threshold * 1000 || 2 * 1000;
        let result = {}, currentVal = 0, prevVal = 0;
        events.removeListener(eventHandlerKeys['read']);
        eventHandlerKeys['read'] = events.addListener(window[targetWindow], eventName, () => {
            result = utils.getVisibility(target, targetWindow);
            if (result.dIsVisible !== 'hidden' && result.dIsVisible !== 'prerender' && result.tIsInView) {
                currentVal = Math.floor(result.tScrollRate * steps) * each;
                if (currentVal > prevVal && currentVal >= 0 && currentVal <= 100) {
                    setTimeout(() => {
                        if (currentVal > prevVal) {
                            this.trackAction('read', 'content', {
                                rd_target_height: result.tHeight,
                                rd_text_length: result.tLength,
                                rd_rate: currentVal
                            });
                            prevVal = currentVal;
                        }
                    }, limit);
                }
            }
        }, false);
    }

    trackMedia(heartbeat = 5) {
        const targetEvents = ['play', 'pause', 'ended'];
        let flags = {};
        for (let i = 0; i < targetEvents.length; i++) {
            events.removeListener(eventHandlerKeys['media'][targetEvents[i]]);
            eventHandlerKeys['media'][targetEvents[i]] = events.addListener(window[targetWindow].document.body, targetEvents[i], (event) => {
                this.trackAction(event.type, event.target.tagName.toLowerCase(), utils.getMediaInfo(event.target));
            }, {capture: true});
        }

        events.removeListener(eventHandlerKeys['media']['timeupdate']);
        eventHandlerKeys['media']['timeupdate'] = events.addListener(window[targetWindow].document, 'timeupdate', (event) => {
            if (flags[event.target.src]) {
                return false;
            }
            flags[event.target.src] = setTimeout(() => {
                if (event.target.paused !== true && event.target.ended !== true) {
                    this.trackAction(event.type, event.target.tagName.toLowerCase(), utils.getMediaInfo(event.target));
                }
                flags[event.target.src] = false;
            }, heartbeat * 1000);
        }, {capture: true});
    }


    /**
     * Get a value for specified key name in GET parameter.
     * @param  {String} key A key name.
     * @return {String} A value for the specified key.
     */
    getQueryVal(key) {
        return parsedUrl.query[key] ? parsedUrl.query[key] : '';
    }
}
