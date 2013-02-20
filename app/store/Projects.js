Ext.define('BASECAMP.store.Projects', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Project',
    proxy: {
        type: 'ajax',
        url: 'resources/php/projects.php',
        reader: {
            type: 'json',
            root:'data'
        }
    }

});
