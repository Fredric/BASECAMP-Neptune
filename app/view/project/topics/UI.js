Ext.define('BASECAMP.view.project.topics.UI', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.topics',
    layout: {
        type: 'hbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;

        me.modal = Ext.create('BASECAMP.view.project.topics.Window');

        me.items = [
            {
                flex: 1,
                xtype: 'topicsgrid'
            }
        ];

        me.callParent();
    }

});