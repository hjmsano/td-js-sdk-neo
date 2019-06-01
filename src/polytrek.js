import Emitter from './emitter';
import Queue from './queue';
import Events from './events';
import IDM from './idm';

const sdkName = process.env.SDK_NAME || 'JS';
const sdkVersion = process.env.SDK_VERSION || '0.0.1';

const mergeObj = (objArray) => {
    let obj = {};
    for (let i = 0; i < objArray.length; i++) {
        for (let k in objArray[i]) {
            if (typeof objArray[i][k] === 'object' && objArray[i][k] !== null && !Array.isArray(objArray[i][k])) {
                obj[k] = obj[k] ? mergeObj([obj[k], objArray[i][k]]) : objArray[i][k];
            } else if (Array.isArray(objArray[i][k])) {
                obj[k] = obj[k] ? result[k].concat(objArray[i][k]) : objArray[i][k];
            } else {
                obj[k] = objArray[i][k];
            }
        }
    }
    return obj;
};

const getClientInfo = () => {
    const timestamp = new Date();
    const orientation = screen.orientation || screen.mozOrientation || screen.msOrientation;
    return {
        timezone: timestamp.getTimezoneOffset() / 60 * -1,
        timestamp: timestamp.toISOString(),
        viewport_height: window.parent.innerHeight,
        viewport_width: window.parent.innerWidth,
        screen_height: window.parent.screen.height,
        screen_width: window.parent.screen.width,
        layout: orientation
    };
};

const transmit = () => {
    emitter.emit(queue.queue);
};

let idm;
let emitter;
let queue;

export default class Polytrek {
    constructor() {
        this.dataModel = {};
    }

    init(config, dataModel) {
        idm = new IDM({
            prefix: config.prefix
        });
        emitter = new Emitter({
            endpoint: config.endpoint,
            method: config.method,
            apiKey: config.apiKey,
            sdkName: sdkName,
            sdkVersion: sdkVersion,
            prefix: config.prefix,
            cookieDomain: config.cookieDomain,
            deviceId: idm.deviceId
        });
        queue = new Queue();
        this.dataModel = dataModel;
    }

    trackAction(action = 'unknown', category = 'unknown', eventContext = {}, immediate = false) {
        const meta = {
            action: action,
            category: category,
            root_id: idm.rootId,
            client: getClientInfo()
        };
        const record = mergeObj([
            this.dataModel,
            eventContext,
            meta
        ]);

        queue.queue.push(record);

        if (immediate) {
            transmit();

            // remove records from queue

        }

        if (idm.isNewId) {
            emitter.getDeviceId((result)=>{
                idm.setDeviceId(result);
            });
        }else{
            idm.setDeviceId(idm.deviceId);
        }
    }

    trackPage(eventContext = {}) {
        this.trackAction('view', 'page', eventContext, true);
    };


}
