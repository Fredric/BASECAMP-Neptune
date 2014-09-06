Ext.define('BASECAMP.model.Topic', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'float'},
        {name: 'title', type: 'string'},
        {name: 'excerpt', type: 'string'},
        {name: 'created_at', type: 'date'},
        {name: 'updated_at', type: 'date'}

    ],
    proxy: {
        type: 'ajax',
        url: 'resources/php/topics.php',
        reader: {
            type: 'json'
        }
    }

});

