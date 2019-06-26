const generateId = () => {
    const timestamp = (+new Date).toString(36);
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = '';
    for (let i = 0; i < 32; i++) {
        result += chars[Math.floor(Math.random() * (chars.length))];
    }
    return `${timestamp}-${result}`;
};

const readCookie = (key) => {
    const cookies = window.parent.document.cookie || '';
    return ((`; ${cookies};`).match(`; ${key}=([^¥S;]*)`) || [])[1];
};

const initDeviceId = () => {
    const idCookie = readCookie(storageName) || '',
        idStorage = localStorage.getItem(storageName) || '';
    let deviceId;

    if (idCookie.length > 8) {
        deviceId = idCookie;
    } else if (idStorage.length > 8) {
        deviceId = idStorage;
    } else {
        deviceId = initialId;
    }
    return deviceId;
};

let storageName, storageExpires, storageDomain, initialId;

export default class {
    constructor(config) {
        initialId = generateId();
        storageName = config.storageName;
        storageExpires = config.storageExpires;
        storageDomain = config.storageDomain;
        this.deviceId = initDeviceId();
        this.rootId = initialId;
    }

    setDeviceId(deviceId) {
        this.deviceId = deviceId;
        try {
            localStorage.setItem(storageName, deviceId);
        } catch (e) {
            window.parent.document.cookie
                = `${storageName}=${deviceId}; Domain=${storageDomain} ;Path=/; Max-Age=${storageExpires}; SameSite=Lax`
        }
    }
}
