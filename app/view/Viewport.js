Ext.define('BASECAMP.view.Viewport', {
    extend: 'Ext.Viewport',

    layout: {
        type: 'fit'
    },
    config: {
        items:[
            {
                xtype:'project_ui'
            }
        ]
    }
});

