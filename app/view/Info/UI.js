Ext.define('BASECAMP.view.Info.UI', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.info',
	cls: 'projectinfo',
	overflowY:'scroll',
	overflowX:'hidden',

	initComponent: function () {
		var me = this;
		me.items = [
			{
				itemId: 'body',
				border:false,
				cls:'info',
				xtype: 'panel',
				tpl: '<div style="float:right" class= "todolist-person"><img src="{creatorurl}"><span>{creatorname}</span></div>' +
					'<h3>{name}</h3>' +
					'<div>{description}</div>'
			},
			{
				xtype: 'eventgrid'

			}

		];


		me.callParent();
	}

});
