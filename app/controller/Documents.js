Ext.define('BASECAMP.controller.Documents', {
    extend: 'Ext.app.Controller',
    views: ['documents.Grid', 'documents.UI'],
    models: ['Document'],
    stores: ['Documents'],
    refs: [
        {
            ref: 'documentsUI',
            selector: 'documents'
        }
    ],
    init: function () {
        this.application.on('onProjectSelect', this.initUI, this);
    },
    initUI: function (project) {

        if (project.get('documents').count !== 0) {
            this.getDocumentsUI().setDisabled(false);
            this.getDocumentsUI().setTitle('Documents (' + project.get('documents').count + ')');
            this.loadDocuments(project);
        } else {
            this.getDocumentsUI().setTitle('Documents');
            this.getDocumentsUI().setDisabled(true);
        }

    },
    loadDocuments: function (project) {
        this.getDocumentsStore().load({
            params: {
                project: project.get('id')
            }
        });
    }
});
