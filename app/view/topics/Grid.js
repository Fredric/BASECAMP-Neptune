Ext.define('BASECAMP.view.topics.Grid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.topicsgrid',
    store: 'Topics',
    cls: 'topicsgrid',
    selModel: {
        type: 'rowmodel',
        mode: 'MULTI'
    },
    columns: [
        {header: 'Topic', dataIndex: 'title', width: 200, renderer: function (v) {
            return '<b>' + v + '</b>';
        }},
        {header: '', dataIndex: 'excerpt', flex: 1},
        {xtype: 'datecolumn', header: '', dataIndex: 'created_at'},
        {xtype: 'datecolumn', header: '', dataIndex: 'updated_at'}

    ],
    initComponent: function () {

        this.callParent();
        this.on('itemclick', function (view, record) {
            this.fireEvent('onSelectTopic', this, record);
        }, this);
    }

});

