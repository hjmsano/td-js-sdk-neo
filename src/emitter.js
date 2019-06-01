const xhr = (url, method, postBody = null, callback) => {
    let xhr = new XMLHttpRequest();
    if (typeof callback === 'function') {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let obj;
                try {
                    obj = JSON.parse(xhr.response);
                } catch (e) {

                }
                callback.call(null, obj);
            }
        };
    }
    xhr.open(method, url, true);
    xhr.timeout = 2000;
    xhr.withCredentials = true;
    xhr.send(postBody);
    return true;
};

const generateDestination = (feature) => {
    const timestamp = (+new Date).toString(36);
    const protocol = (document.location && document.location.protocol === 'http:') ? 'http:' : 'http:';
    return `${protocol}//${config.endpoint}/${feature}/${config.apiKey}/${config.deviceId}/1/${timestamp}`;
};

let config;
let sdkName;
let sdkVersion;
let status = true;

export default class {
    constructor(obj) {
        config = obj;
    }

    emit(payload) {
        let url = generateDestination('ingest');
        let postBody = JSON.stringify({
            sdk: {
                name: sdkName,
                version: sdkVersion
            },
            beacons: payload
        });
        if (config.method === "GET") {
            url = `${url}?data=${encodeURIComponent(postBody)}`;
            postBody = null;
        }
        if ('sendBeacon' in navigator && typeof navigator.sendBeacon === 'function' && status === true) {
            try {
                status = navigator.sendBeacon(url, postBody);
            } catch (error) {
                status = false;
            }
            if (!status) {
                xhr(url, config.method, postBody);
            }
            return true;
        } else {
            xhr(url, config.method, postBody);
            return true;
        }
    }

    getDeviceId(callback) {
        const url = generateDestination('sync');

        if ('fetch' in window.parent && typeof window.parent.fetch === 'function') {
            window.parent.fetch(url).then((response) => {
                    return response.json();
                }
            ).then((result) => {
                callback.call(null, result.id);
            });
        } else {
            xhr(url, 'GET', null, (result) => {
                callback.call(null, result.id);
            });
        }
    }
}

