
Ext.require('Ext.util.History');
//Ext.require('Ext.data.*.Json');
Ext.require('Ext.layout.container.Border');

//Ext overrides
Ext.Loader.setPath('Overrides', 'lib/overrides');
Ext.require('Overrides.data.reader.Reader');
Ext.require('Ext.grid.plugin.BufferedRendererTreeView');

Ext.Loader.setPath('Abstract', 'lib/abstract');


Ext.application({
    name: 'BASECAMP',
    autoCreateViewport: false,

    controllers: [
        'Login',
        'Navigation',
        'Projects',
		'Info',
        'TodoLists',
        'Topics',
        'Uploads',
        'Documents'
    ],

    config:{
      project:null,
      user:null,
      tab:null
    },

    launch: function () {
        Ext.util.History.init();
        this.getController('Login').checkLogin();
    },

    applyProject:function(project){
        var me = this;
        me.fireEvent('onProjectSelect', project);
        return project;
    }
});

//@require @packageOverrides
/*
Ext.application({

    name: 'BASECAMP',

    models:[
        'Document',
        'Event',
        'Name',
        'Project',
        'Todo',
        'TodoList',
        'Topic',
        'Upload',
        'User'
    ],

    views: [
        'Info.EventGrid',
        'Info.UI',
        'Login',
        'Viewport',
        'documents.Grid',
        'documents.UI',
        'project.Selector',
        'project.UI',
        'testview',
        'todolists.Grid',
        'todolists.UI',
        'todolists.Window',
        'todos.Grid',
        'topics.Grid',
        'topics.UI',
        'topics.Window',
        'uploads.Grid',
        'uploads.UI'
    ],

    stores: [
        'Documents',
        'Events',
        'Projects',
        'TodoLists',
        'Todos',
        'Topics',
        'Uploads'
    ],

    controllers: [
        'Documents',
        'Info',
        'Login',
        'Main',
        'Navigation',
        'Projects',
        'TodoLists',
        'Topics',
        'Uploads'
    ],

    autoCreateViewport: true
});
*/
