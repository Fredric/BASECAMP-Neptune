Ext.define('BASECAMP.view.documents.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.documentsgrid',
    store: 'Documents',
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },
    columns: [
        {header: 'Document', dataIndex: 'title', flex:1, renderer: function (v) {
            return '<b>' + v + '</b>';
        }},
        {xtype:'datecolumn', header: '', dataIndex: 'created_at'},
        {xtype:'datecolumn', header: '', dataIndex: 'updated_at'}

    ]

});

