Ext.define('BASECAMP.store.AssignedTodoLists', {
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
            read: 'resources/php/todolists/assigned.php'

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
        beforeload: function (options) {
            Ext.getStore('AssignedTodoLists').proxy.setExtraParam('userid', BASECAMP.getApplication().currentUser.get('id'));
        }
    }

});
