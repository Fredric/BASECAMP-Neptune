Ext.define('BASECAMP.view.project.uploads.UI', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.uploads',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    items: [
        {
            flex: 1,
            xtype: 'uploadsgrid'
        }


    ]
});