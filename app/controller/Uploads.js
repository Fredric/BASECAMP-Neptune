Ext.define('BASECAMP.controller.Uploads', {
	extend: 'Ext.app.Controller',
	views: ['uploads.Grid', 'uploads.UI'],
	models: ['Upload'],
	stores: ['Uploads'],
	refs: [
		{
			ref: 'uploadsUI',
			selector: 'uploads'
		}
	],
	init: function () {
		this.application.on('onProjectSelect', this.initUI, this);
	},
	initUI: function (project) {
		if (project.get('attachments').count) {
			this.getUploadsUI().setDisabled(false);
			this.getUploadsUI().setTitle('Files (' + project.get('attachments').count + ')');
			this.loadUploads(project);

		} else {
			this.getUploadsUI().setTitle('Files');
			this.getUploadsUI().setDisabled(true);
		}
	},
	loadUploads: function (project) {
		this.getUploadsStore().load({
			params: {
				project: project.get('id')
			}
		});
	}
});
