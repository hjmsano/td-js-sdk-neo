const xhr = (url, body, timeout, callback) => {
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
    xhr.open('GET', url, true);
    xhr.timeout = timeout;
    xhr.withCredentials = true;
    xhr.send(body);
    return true;
};

const generateDestination = () => {
    const timestamp = (+new Date).toString(10),
        protocol = (document.location && document.location.protocol === 'https:') ? 'https:' : 'https:';
    return `${protocol}//${config.endpoint}/js/v3/event/${config.database}/${config.table}?api_key=${config.writeKey}&modified=${timestamp}&data=`;
};

let config, status = true;

export default class {
    constructor(obj) {
        config = obj;
    }

    emit(payload) {
        payload['td_client_id'] = config.deviceId;
        let body = btoa(JSON.stringify(payload));
        let url = generateDestination();
        url += encodeURIComponent(body);
        url += '&callback=none';

        if ('sendBeacon' in navigator && typeof navigator.sendBeacon === 'function' && status === true) {
            try {
                status = navigator.sendBeacon(url);
            } catch (error) {
                status = false;
            }
            if (!status) {
                if ('fetch' in window[config.target] && typeof window[config.target].fetch === 'function') {
                    const controller = new AbortController();
                    const signal = controller.signal;
                    const option = {
                        signal,
                        method: 'GET',
                        cache: 'no-store',
                        keepalive: true
                    };
                    setTimeout(() => controller.abort(), config.timeout);
                    window[config.target].fetch(url, option);
                } else {
                    xhr(url, body, config.timeout);
                }
            }
        } else {
            xhr(url, body, config.timeout);
        }
    }
}

