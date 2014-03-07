Ext.define('BASECAMP.model.Todo', {
    extend: 'Ext.data.Model',
    requires: [
        'Ext.data.association.HasOne'
    ],
    fields: [
        {name: 'id', type: 'float'},
        {name: 'content', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'archived', type: 'bool'},
        {name: 'created_at', type: 'date'},
        {name: 'updated_at', type: 'date'},
        {name: 'starred', type: 'bool'},
        {name: 'url', type: 'string'},
        {name: 'todolist_id', type: 'float'},

    ],
    associations: [
        {
            type: 'hasOne',
            model: 'Assignee',
            associationKey: 'assignee'

        }
    ],
    proxy: {
        type: 'rest',
        url: 'resources/php/todolists/todosByTodolist.php',
        reader: {
            type: 'json',
            root: 'todos.remaining'
        }
    }

});

