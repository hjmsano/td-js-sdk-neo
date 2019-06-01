Polytrek.init({
    endpoint: '127.0.0.1:8080',
    method: 'GET',
    apiKey: 'abc123',
    prefix: 'pltk',
    cookieDomain: '127.0.0.1',
    eventName: 'polytrekRecurringEvent',
    eventFreq: 250,
    useQueue: true,
    options: {
        scroll: {},
        link: {}
    }
}, {
    user: {
        id: '1234567890',
        status: 'login',
    },
    context: {
        url: window.parent.document.location.href,
        referrer: window.parent.document.referrer,
        page_title: window.parent.document.title,

    }
});

Polytrek.trackPage({
    user: {
        permission: 'paid'
    }
});