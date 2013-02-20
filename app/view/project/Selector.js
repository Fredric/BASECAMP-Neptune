Ext.define('BASECAMP.view.project.Selector', {
    extend: 'Ext.Container',
    alias: 'widget.projectselector',
    requires: ['Ext.form.field.ComboBox'],
    layout: {
        type: 'hbox'
    },
    items: [
        {
            margins: '10 10 10 10',
            width: 400,
            xtype: 'combo',
            store: 'Projects',
			emptyText:'Select Basecamp Project',
			queryMode:'local',
            displayField: 'name',
            valueField: 'id',
            listConfig: {
				cls:'projectBoundlist',
                itemTpl: '<b>{name}</b><br><span>{[Ext.String.ellipsis(values.description,30)]}</span>'
            }
        }

    ]
});
