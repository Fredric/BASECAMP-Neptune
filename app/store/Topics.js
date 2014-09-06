Ext.define('BASECAMP.store.Topics', {
    extend: 'Ext.data.Store',
    model: 'BASECAMP.model.Topic',
    sorters: [
        {property: 'position', direction: 'ASC'}
    ]

});
