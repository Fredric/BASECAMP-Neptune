Ext.define('BASECAMP.store.Todos', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Todo',

    listeners: {
        beforeload: function (options) {
            Ext.getStore('Todos').proxy.setExtraParam('project', BASECAMP.getApplication().getProject().getId());
        }
    }

});
