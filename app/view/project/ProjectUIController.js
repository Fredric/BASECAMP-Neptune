Ext.define('BASECAMP.view.project.ProjectUIController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.project_ui_controller',

    init:function(){
      var me = this;
        this.getReferences().projectCombo.getStore().load();
    },

    selectProject: function (combo, records) {

        var s = this.getReferences().tabPanel.getLayout().getActiveItem().itemId;

        Ext.util.History.add('/' + records[0].get('id') + "/" + s, true, true);

    },
    createProject: function () {
        Ext.create('BASECAMP.view.project.NewProject').show();

    }
});
