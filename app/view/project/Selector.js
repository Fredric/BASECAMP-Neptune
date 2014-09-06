Ext.define('BASECAMP.view.project.Selector', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.projectselectorcombo',

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

});
