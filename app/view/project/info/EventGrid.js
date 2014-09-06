Ext.define('BASECAMP.view.project.info.EventGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.eventgrid',
    store: 'Events',
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        trackOver: false
    },
    border: false,
    disableSelection: true,
    hideHeaders: true,
    columns: [
        {
            xtype: 'datecolumn',
            dataIndex: 'created_at'
        },
        {
            header: '',
            width: 180,
            dataIndex: '',
            renderer: function (val, meta, record) {
                return '<div class= "todolist-person"><img src="' + record.get('creatoricon') + '"><span>' + record.get('creator') + '</span></div>';

            }
        },
        {
            header: '',
            dataIndex: 'summary',
            flex: 1,
            renderer: function (v) {
                return '<b>' + v + '</b>';
            }
        }
    ]

});

