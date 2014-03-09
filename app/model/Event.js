Ext.define('BASECAMP.model.Event', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'float'},
        {name: 'summary', type: 'string'},
        {name: 'created_at', type: 'date'},
        {name: 'updated_at', type: 'date'},
        {name: 'creator', type: 'string', mapping: 'creator.name'},
        {name: 'creatoricon', type: 'string', mapping: 'creator.avatar_url'}
    ]

});

