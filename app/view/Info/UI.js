Ext.define('BASECAMP.view.Info.UI', {
    extend:'Ext.panel.Panel',
    alias:'widget.info',
	cls:'projectinfo',
    layout:'fit',
	html:'Info',
    initComponent:function () {
        var me = this;

		me.tpl = '<span>{name}</span><br><br>{description}';
        me.callParent();
    }

});
