import UUID from 'uuid/v4';

const readCookie = (key) => {
    const cookies = window.parent.document.cookie || '';
    return ((`; ${cookies};`).match(`; ${key}=([^¥S;]*)`)||[])[1];
};

const initDeviceId = () => {
    const idCookie = readCookie(storageKey) || '';
    const idStorage = localStorage.getItem(storageKey) || '';
    let deviceId;

    if(idCookie.length > 8){
        deviceId = idCookie;
    }else if(idStorage.length > 8){
        deviceId = idStorage;
    }else{
        const timestamp = (+new Date).toString(36);
        deviceId = `${timestamp}-${initialId}`;
        isNewId = true;
    }
    return deviceId;
};

let cookieDomain;
let storageKey;
let initialId;
let isNewId = false;

export default class {
    constructor(config){
        initialId = UUID().replace(/-/g, '');
        storageKey = `${config.prefix}-id`;
        cookieDomain = config.cookieDomain;
        this.deviceId = initDeviceId();
        this.rootId = `${this.deviceId}${initialId}`;
        this.isNewId = isNewId;
        console.log(this.isNewId);
    }

    setDeviceId(deviceId){
        this.deviceId = deviceId;
        try {
            localStorage.setItem(storageKey, deviceId);
        }catch (e) {}
        window.parent.document.cookie
            = `${storageKey}=${deviceId}; Domain=${cookieDomain}; Path=/; Max-Age=31536000; SameSite=Lax`
    }
}
