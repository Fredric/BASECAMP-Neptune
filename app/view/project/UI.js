Ext.define('BASECAMP.view.project.UI', {
    extend: 'Ext.tab.Panel',
    alias: 'widget.projectpanel',
    config: {
        project: null
    },
    activeTab: 0,
    plain: true,
    items: [
        {
            xtype: 'info',
            itemId: 'Info',
            title: 'Project Info'
        },
        {
            title: 'Topics',
            itemId: 'Topics',
            xtype: 'topics'

        },
        {
            title: 'TodoLists',
            itemId: 'TodoLists',
            xtype: 'todolists'
        },
        {
            title: 'Files',
            itemId: 'Files',
            xtype: 'uploads'
        },
        {
            title: 'Documents',
            itemId: 'Documents',
            xtype: 'documents'
        }

    ]
});