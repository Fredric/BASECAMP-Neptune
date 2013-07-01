

Ext.define('BASECAMP.Application', {
    name: 'BASECAMP',
    requires:[
        'Ext.util.History',

        'Overrides.*',
        'Abstract.*'
    ],
    extend: 'Ext.app.Application',

    views: [
        // TODO: add views here
    ],

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
    },

    stores: [
        // TODO: add stores here
    ]
});
