Ext.define('BASECAMP.store.Projects', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Project',


    listeners: {
        beforesync: function (options) {
            if (BASECAMP.getApplication().getProject()) {
                Ext.getStore('TodoLists').proxy.setExtraParam('project', BASECAMP.getApplication().getProject().getId());
            }
        }
    }

});
