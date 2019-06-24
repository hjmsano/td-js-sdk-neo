const xhr = (url, body, method, timeout, callback) => {
    let xhr = new XMLHttpRequest();
    if (typeof callback === 'function') {
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                let obj;
                try {
                    obj = JSON.parse(xhr.response);
                } catch (e) {
                    return e;
                }
                callback.call(null, obj);
            }
        };
    }
    xhr.open(method, url, true);
    xhr.timeout = timeout;
    xhr.withCredentials = true;
    xhr.send(body);
    return true;
};

const generateDestination = (feature) => {
    const timestamp = (+new Date).toString(10),
        protocol = (document.location && document.location.protocol === 'https:') ? 'https:' : 'http:';
    return `${protocol}//${config.endpoint}/${feature}/${config.apiKey}/${config.deviceId}/1/${timestamp}/`;
};

let config, status = true;

export default class {
    constructor(obj) {
        config = obj;
    }

    emit(record) {
        let payload = {
            sdk: {
                name: config.sdkName,
                version: config.sdkVersion
            },
            beacons: [
                record
            ]
        };

        let url = generateDestination('ingest');
        let body = btoa(JSON.stringify(payload));

        if (config.method === 'GET') {
            url += `?body=${encodeURIComponent(body)}`;
            body = '';
        }

        if ('sendBeacon' in navigator && typeof navigator.sendBeacon === 'function' && status === true) {
            try {
                navigator.sendBeacon(url, body);
            } catch (error) {
                status = false;
            }
            if (status) {
                if ('fetch' in window[config.target] && typeof window[config.target].fetch === 'function') {
                    const controller = new AbortController();
                    const signal = controller.signal;
                    const option = {
                        signal,
                        method: config.method,
                        cache: 'no-store',
                        keepalive: true
                    };
                    if (config.method === 'POST') {
                        option['body'] = body;
                    }
                    setTimeout(() => controller.abort(), config.timeout);
                    window[config.target].fetch(url, option);
                } else {
                    xhr(url, body, config.method, config.timeout);
                }
            }
        } else {
            xhr(url, body, config.method, config.timeout);
        }
    }

    getDeviceId(callback) {
        let url = generateDestination('sync');
        url += `?name=${config.prefix}Id`;
        if ('fetch' in window[config.target] && typeof window[config.target].fetch === 'function' && 'AbortController' in window[config.target] && typeof window[config.target].AbortController === 'function') {
            const controller = new AbortController();
            const signal = controller.signal;
            const option = {signal, method: 'GET', cache: 'no-store', keepalive: true};
            setTimeout(() => controller.abort(), config.timeout);
            window[config.target].fetch(url, option).then((response) => {
                    return response.json();
                }
            ).then((result) => {
                callback.call(null, result.id);
            });
        } else {
            xhr(url, '', 'GET', config.timeout, (result) => {
                callback.call(null, result.id);
            });
        }
    }
}

