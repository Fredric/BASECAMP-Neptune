Ext.define('BASECAMP.controller.Projects', {
	extend: 'Ext.app.Controller',
	views: ['project.Selector', 'project.UI'],
	models: ['Project'],
	stores: ['Projects'],
	refs: [
		{
			ref: 'projectCombo',
			selector: 'projectselector > combo'
		},
		{
			ref: 'centerPanel',
			selector: 'viewport > #center'
		},
		{
			ref: 'projectPanel',
			selector: 'projectpanel'
		}
	],
	init: function () {
		var me = this;

		me.control({
			'projectselector > combo': {
				select: {
					fn: this.selectProjectByCombo
				},
				afterrender: function () {
					this.getStore('Projects').load();
				}
			}
			/*
			 ,
			 'projectpanel': {
			 tabchange: {
			 fn: this.navigateToTab
			 }
			 }*/,
			'projectpanel tab': {
				click: {
					fn: this.navigateToTab
				}
			}
		});
		me.getProjectsStore().on('load', function () {
			if (me.application.getProject() !== null) {
				me.getProjectCombo().setValue(me.application.getProject().getId());
			}
		});

	},
	navigateToTab: function (tabcard) {
		var me = this;
		Ext.util.History.add('/' + me.application.getProject().getId() + "/" + tabcard.card.itemId, true, true);
	},
	/**
	 * Sets Project by its id string. Returns the project object.
	 * If project with this id already is set, it just returns the project object.
	 * @param id
	 * @param callBack
	 * @param scope
	 */
	setProjectById: function (id, callBack, scope) {
		var me = this,
			app = me.application;

		if (app.getProject() === null || app.getProject().getId() !== id) {
			Ext.getBody().mask('Loading Project...')
			Ext.ModelManager.getModel('BASECAMP.model.Project').load(id, {
				success: function (project) {
					app.setProject(project);
					me.getProjectCombo().setValue(me.application.getProject().getId());
					Ext.getBody().unmask()
					callBack.call(scope, app.getProject());
				}
			});

			var dt = Ext.Date.add(new Date, Ext.Date.MONTH, -5);
			Ext.getStore('Events').load({
				params:{
					project:id,
					since:dt
				}
			})

		} else {
			callBack.call(scope, app.getProject());
		}
	},
	setTab: function (tab) {

		this.getCenterPanel().layout.setActiveItem(1);
		this.application.setTab(tab);

		if(this.isTabDisabled(tab)){
			Ext.util.History.add('/' + this.application.getProject().getId() + "/Info", true, true);
		}else{
			this.getProjectPanel().layout.setActiveItem(tab);
		}


	},
	selectProjectByCombo: function (combo, records) {
		var p = this.getProjectPanel();
		var s = p.getLayout().getActiveItem().itemId;
		Ext.util.History.add('/' + records[0].get('id') + "/" + s, true, true);
	},
	isTabDisabled:function(tab){
		if(this.getProjectPanel().getComponent(tab).disabled === true){
			return true;
		}
	}
});
