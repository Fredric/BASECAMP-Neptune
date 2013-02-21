Ext.define('BASECAMP.view.todolists.Grid', {
	extend: 'Ext.grid.Panel',
	requires:['Ext.grid.plugin.CellEditing'],
	alias: 'widget.todolistgrid',
	store: 'TodoLists',
	selModel: {
		type: 'rowmodel',
		mode: 'MULTI'
	},
	autoScroll: true,
	border: false,
	plugins: [{ptype: 'cellediting', clicksToEdit: 1,pluginId:'cellplugin'}],
	tbar: [
		{
			text: 'Add',
			iconCls:'icon-plus-alt',
			scale: 'medium',
			handler: function () {
				this.up('todolists').fireEvent('addTodolist');
				var grid = this.up('todolistgrid')
				var newTodolist = grid.getStore().insert(0,{name:'', description:''});
				grid.getPlugin('cellplugin').startEditByPosition({row:0, column:0});
			}
		}
	],
	columns: [
		{
			header: 'List',
			xtype: 'templatecolumn',
			flex: 1,
			dataIndex:'name',
			editor:{
				xtype:'textfield',
				allowBlank:false
			},
			tpl: '<b>{name}</b>'
		},
		{
			header: '',
			dataIndex: 'description',
			editor:'textfield',
			flex: 1
		},
		{
			header: '',
			xtype: 'templatecolumn',
			width: 150,
			tpl: '<div class= "todolist-person"><img src="{creatoricon}"><span>{creator}</span></div>'
		}
	]

});

