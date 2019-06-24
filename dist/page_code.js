(function () {
    // Cut the mustard
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {
        Polytrek.config({
            endpoint: 'stat.example.com',
            apiKey: '2ee204330a7b2701a6bf413473fcc486',
            eventName: 'PolytrekRecurringEvent',
            eventFrequency: 250,
            prefix: 'polytrek',
            targetWindow: 'self',
            method: 'POST',
            timeout: 4000,
            options: {
                unload: {
                    enable: true
                },
                clicks: {
                    enable: true,
                    targetAttr: 'data-trackable'
                },
                scroll: {
                    enable: true,
                    threshold: 2,
                    granularity: 20,
                    unit: 'percent'
                },
                read: {
                    enable: true,
                    threshold: 2,
                    granularity: 20,
                    target: window.document.getElementById('article')
                },
                media: {
                    enable: true,
                    heartbeat: 5
                }
            }
        });

        Polytrek.init({
            user:{
                userId: '',
                userStatus: '',
                userAttr: {},
            },
            context:{
                pageTitle: window.parent.document.title,
                contentId: '',
                contentHeadline: '',
                contentStatus: '',
                contentAttr: {},
                pageAttr: {},
            },
            campaign:{
                campaignCode: Polytrek.getQueryVal('cid'),
                campaignName: Polytrek.getQueryVal('utm_campaign'),
                campaignSource: Polytrek.getQueryVal('utm_source'),
                campaignMedium: Polytrek.getQueryVal('utm_medium'),
                campaignTerm: Polytrek.getQueryVal('utm_term'),
                campaignContent: Polytrek.getQueryVal('utm_content'),
            },
            customAttr: {}
        });

        Polytrek.trackPage();
    }
}());
