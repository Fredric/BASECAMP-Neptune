Ext.define('BASECAMP.store.Projects', {
	extend: 'Ext.data.Store',
	model: 'BASECAMP.model.Project',
	proxy: {
		type: 'ajax',
		batchActions: false,
		api: {
			create: 'resources/php/projects/create.php',
			read: 'resources/php/projects/read.php',
			update: 'resources/php/projects/update.php',
			destroy: 'resources/php/projects/destroy.php'
		},
		reader: {
			type: 'json',
			root: 'data'
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
			if (BASECAMP.getApplication().getProject()) {
				Ext.getStore('TodoLists').proxy.setExtraParam('project', BASECAMP.getApplication().getProject().getId());
			}
		}
	}

});
