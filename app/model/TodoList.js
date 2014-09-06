Ext.define('BASECAMP.model.TodoList', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id', type: 'float'},
        {name: 'name', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'archived', type: 'bool'},
        {name: 'created_at', type: 'date'},
        {name: 'updated_at', type: 'date'},
        {name: 'starred', type: 'bool'},
        {name: 'url', type: 'string'},
        {name: 'completed', type: 'bool'},
        {name: 'position', type: 'float'},
        {name: 'remaining_count', type: 'float'},
        {name: 'completed_count', type: 'float'},
        {name: 'creator', type: 'string', mapping: 'creator.name'},
        {name: 'creatoricon', type: 'string', mapping: 'creator.avatar_url'},
        {name: 'completed_text', type: 'string', convert: function (v, record) {
            return '(' + record.get('completed_count') + '/' + record.get('remaining_count') + ')';
        }}
    ],
    validators: [
        {type: 'presence', field: 'name'}
    ],
    proxy: {
        type: 'ajax',
        batchActions: false,
        api: {
            create: 'resources/php/todolists/create.php',
            read: 'resources/php/todolists/read.php',
            update: 'resources/php/todolists/update.php',
            destroy: 'resources/php/todolists/destroy.php'
        },
        reader: {
            type: 'json'
        },
        writer: {
            type: 'json',
            encode: true,
            //writeRecordId:false,
            writeAllFields:true,
            rootProperty: 'data',
            batch: false
        }
    },

//    proxy: {
//        type: 'rest',
//        url: 'resources/php/todolist.php',
//        reader: {
//            type: 'json'
//        }
//    }
    /*
     associations: [
     {
     type: 'hasMany',
     model: 'BASECAMP.model.Todo',
     name: 'completed',
     foreignKey: 'todolist_id',
     associationKey: 'todos.completed' // read child data from child_groups
     },
     {
     type: 'hasMany',
     model: 'BASECAMP.model.Todo',
     name: 'remaining',

     foreignKey: 'todolist_id',
     associationKey: 'todos.remaining' // read child data from child_groups
     },
     {
     type: 'hasMany',
     model: 'BASECAMP.model.Name',
     name: 'subscribers',
     associationKey: 'subscribers' // read child data from child_groups
     }
     ]
     */
});