(function () {
    // Cut the mustard
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {
        Treasure.config({
            endpoint: 'in.treasuredata.com',
            writeKey: 'hogehoge',
            database: 'your_db',
            table: 'destination_table',
            eventName: 'TreasureRecurringEvent',
            eventFrequency: 250,
            prefix: 'treasure',
            targetWindow: 'self',
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

        Treasure.init({
            user:{
                userId: '',
                userStatus: '',
                userAttr: {},
            },
            context:{
                contentId: '',
                contentHeadline: '',
                contentStatus: '',
                contentAttr: {},
                pageAttr: {},
            },
            campaign:{
                campaignCode: Treasure.getQueryVal('cid'),
                campaignName: Treasure.getQueryVal('utm_campaign'),
                campaignSource: Treasure.getQueryVal('utm_source'),
                campaignMedium: Treasure.getQueryVal('utm_medium'),
                campaignTerm: Treasure.getQueryVal('utm_term'),
                campaignContent: Treasure.getQueryVal('utm_content'),
            },
            customAttr: {}
        });

        Treasure.trackPage();
    }
}());
