Ext.define('BASECAMP.view.uploads.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.uploadsgrid',
    store: 'Uploads',
	loadMask:true,
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },
    columns: [
        {header: 'File Name', dataIndex: 'name', flex:1, renderer: function (v) {
            return '<b>' + v + '</b>';
        }},
        {header: '', dataIndex: 'created_at'},
        {header: '', dataIndex: 'updated_at'}

    ]

});

