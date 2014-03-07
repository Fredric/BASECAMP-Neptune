Ext.define('BASECAMP.view.todolists.TodoItems', {
    extend: 'Ext.grid.Panel',
    xtype: 'todoitems',

    store: 'Todos',
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },
    columns: [
        {header: '', dataIndex: 'content', width: 200, renderer: function (v) {
            return '<b>' + v + '</b>';
        }},
        {header: '', renderer:function(v, record){

        },
            flex: 1},
        {xtype: 'datecolumn', header: '', dataIndex: 'created_at'},
        {xtype: 'datecolumn', header: '', dataIndex: 'updated_at'},
        {header: '', dataIndex: 'starred'},
        {header: '', dataIndex: 'url'}
    ]
});
