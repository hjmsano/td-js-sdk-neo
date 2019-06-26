(function () {
    // Cut the mustard
    if ('querySelector' in window.parent.document &&
        'addEventListener' in window.parent
    ) {
        Treasure.config({
            endpoint: 'in.treasuredata.com',
            writeKey: 'your_write_key',
            database: 'database_name',
            table: 'destination_table',
            eventName: 'TreasureRecurringEvent',
            eventFrequency: 250,
            storageName: '_td',
            storageExpires: 63072000,
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
            user_id: '',
            user_dtatus: '',
            user_attr: {},
            content_id: '',
            content_headline: '',
            content_status: '',
            content_attr: {},
            page_attr: {},
            campaign_code: Treasure.getQueryVal('cid'),
            campaign_name: Treasure.getQueryVal('utm_campaign'),
            campaign_source: Treasure.getQueryVal('utm_source'),
            campaign_medium: Treasure.getQueryVal('utm_medium'),
            campaign_term: Treasure.getQueryVal('utm_term'),
            campaign_content: Treasure.getQueryVal('utm_content'),
            custom_attr: {}
        });

        Treasure.trackPage();
    }
}());
