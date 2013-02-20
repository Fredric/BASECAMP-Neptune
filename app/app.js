
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
    ],

    views: [
        'Main',
        'Viewport'
    ],

    stores: [
    ],

    controllers: [
        'Main'
    ],

    autoCreateViewport: true
});
*/