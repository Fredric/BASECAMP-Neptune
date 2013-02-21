Ext.define('BASECAMP.store.TodoLists', {
	extend: 'Ext.data.Store',
	model: 'BASECAMP.model.TodoList',
	sorters: [
		{property: 'position', direction: 'ASC'}
	],
	autoSync: false,
	proxy: {
		type: 'ajax',
		batchActions: false,
		api: {
			create: 'resources/php/todolists/create.php',
			read: 'resources/php/todolists/read.php',
			update: 'resources/php/todolists/update.php',
			destroy: 'resources/php/todolists/destroy.php'
		},
		reader: {
			type: 'json'
		},
		writer: {
			type: 'json',
			encode: true,
			root: 'data',
			batch: false
		}
	},
	listeners: {
		beforesync: function (options) {
			Ext.getStore('TodoLists').proxy.setExtraParam('project', BASECAMP.getApplication().getProject().getId());
		}
	}

});
