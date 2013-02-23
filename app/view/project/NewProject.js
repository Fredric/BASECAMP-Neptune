Ext.define('BASECAMP.view.project.NewProject', {
	extend: 'Ext.window.Window',
	title:'Add new Project',
	alias: 'widget.addprojectwindow',
	width: 300,
	height: 200,
	layout: 'fit',
	initComponent: function () {
		var me = this;
		me.items = [
			{
				xtype: 'form',
				bodyPadding: 8,
				items: [
					{
						xtype: 'textfield',
						allowBlank: false,
						fieldLabel: 'Project name',
						name: 'name'
					},
					{
						xtype: 'textfield',
						allowBlank: false,
						fieldLabel: 'Description',
						name: 'description'
					}
				],
				buttons: [
					{
						text: 'Create',
						formBind: true,
						handler: function () {
							me.fireEvent('onSaveNewProject', me, me.down('form').getValues());
						}
					},
					{
						text: 'Cancel',
						handler: function () {
							me.close();
						}
					}
				]
			}
		];

		me.callParent();
	}
});