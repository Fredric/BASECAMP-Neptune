Ext.define('BASECAMP.store.TodoLists', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.TodoList',
    sorters: [
        {property: 'position', direction: 'ASC'}
    ],
    autoSync: false,

    listeners: {
        beforesync: function (options) {
            Ext.getStore('TodoLists').proxy.setExtraParam('project', BASECAMP.getApplication().getProject().getId());
        }
    }

});
