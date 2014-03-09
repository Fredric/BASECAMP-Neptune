Ext.define('BASECAMP.view.Viewport', {
    extend: 'Ext.Viewport',
    requires: ['Ext.layout.container.Border'],
    layout: {
        type: 'border'
    },
    config: {
        items: [
            {
                region: 'north',
                xtype: 'projectselector'
            },
            {
                xtype: 'container',
                region: 'center',
                itemId: 'center',
                layout: 'card',
                items: [
                    {xtype: 'container'},
                    {
                        xtype: 'projectpanel',
                        region: 'center',
                        margins: '10 10 10 10',
                        flex: 1
                    }
                ]
            }


        ]
    }
});