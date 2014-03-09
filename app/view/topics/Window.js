Ext.define('BASECAMP.view.topics.Window', {
    extend: 'Ext.Window',
    height: 300,
    width: 800,
    modal: true,
    alias: 'widget.topicsmodal',
    closeAction: 'hide',
    requires: ['Ext.form.Panel'],
    bodyStyle: 'padding:10px',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    initComponent: function () {
        var me = this;

        me.items = [
            {
                xtype: 'container',
                style: 'color:#666666',
                html: '<h1>Open Topics here</h1>'
            }
        ];

        me.buttons = [
            {
                text: 'Close',
                handler: function () {
                    me.close();
                }
            }
        ];

        me.callParent();

    }
});