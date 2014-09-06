Ext.define('BASECAMP.store.Documents', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Document',
    sorters: [
        {property: 'position', direction: 'ASC'}
    ]

});
