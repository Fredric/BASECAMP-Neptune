Ext.define('BASECAMP.view.project.Selector', {
    extend: 'Ext.toolbar.Toolbar',
    alias: 'widget.projectselector',
    requires: ['Ext.form.field.ComboBox'],
    layout: {
        type: 'hbox'
    },
    items: [
        {
            //margins: '10 10 10 10',
            width: 400,
            xtype: 'combo',
            fieldLabel:'Project',
            labelSeparator:'',
            labelAlign:'top',
            store: 'Projects',
            emptyText: 'Select Basecamp Project',
            queryMode: 'local',
            displayField: 'name',
            valueField: 'id',
            listConfig: {
                cls: 'projectBoundlist',
                itemTpl: '<b>{name}</b><br><span>{[Ext.String.ellipsis(values.description,30)]}</span>'
            }
        },
        '->',
        {
            xtype: 'button',
            iconCls: 'icon-plus-alt',
            //margins: '10 10 10 10',
            text: 'New Project',
            scale: 'medium',
            handler: function () {
                Ext.create('BASECAMP.view.project.NewProject').show();
            }
        }

    ]
});
