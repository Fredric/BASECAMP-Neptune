Ext.define('BASECAMP.view.project.todolists.UI', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.todolists',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    initComponent: function () {
        var me = this;


        me.items = [
            {
                flex: 1,
                xtype: 'todolistgrid'
            },
            {
                flex: 1,
                xtype: 'todoitems'
            }
        ];
        me.callParent();
    }

});