Ext.define('BASECAMP.store.Events', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Event',
    proxy: {
        type: 'ajax',
        url: 'resources/php/events.php',
        reader: {
            type: 'json',
            root: 'data'
        }
    }

});
