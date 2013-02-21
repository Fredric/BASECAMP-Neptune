Ext.define('BASECAMP.store.TodoLists', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.TodoList',
    sorters: [
        {property: 'position', direction: 'ASC'}
    ],
	autoSync:false,
    proxy: {
        type: 'ajax',
		batchActions:false,
		api: {
		    create  : 'resources/php/createtodolist.php',
		    read    : 'resources/php/todolists.php',
		    update  : 'resources/php/updatetodolist.php',
		    destroy : 'resources/php/deletetodolist.php'
		},
        reader: {
            type: 'json'
        },
		writer:{
			encode:true,
			root:'data',
			batch:false
		}
    },
	listeners:{
		beforesync:function(options){
			Ext.getStore('TodoLists').proxy.setExtraParam('project',BASECAMP.getApplication().getProject().getId());
		}
	}

});
