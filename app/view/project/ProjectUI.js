Ext.define('BASECAMP.view.project.ProjectUI', {
    extend      : 'Ext.panel.Panel',
    alias       : 'widget.project_ui',
    requires    : ['Ext.layout.container.Border'],
    controller  :'project_ui_controller',
    config      : {
                    project: null
                },
    layout      :'border',

    items:      [

        {
           region: 'north',
           xtype:'toolbar',
            height:100,
           items:[
               {
                   xtype: 'projectselectorcombo',
                   reference:'projectCombo',
                   width: 400,
                   labelAlign:'top',
                   listeners:{
                       select:'selectProject'
                   }

               },
               '->',
               {
                   xtype: 'button',
                   iconCls: 'icon-plus-alt',
                   text: 'New Project',
                   scale: 'medium',
                   handler: 'createProject'
               }

           ]
        },
        {
            xtype: 'tabpanel',
            reference:'tabPanel',
            flex:1,
            region: 'center',
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
        }

    ]

});