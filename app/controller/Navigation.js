Ext.define('BASECAMP.controller.Navigation', {
    extend: 'Ext.app.Controller',

    initPaths: function () {
        var me = this;

		Path.map("#/test/{:id}").to(function(){
			Ext.Msg.alert('Test', this.params.id)

		});
         //Navigation opening a project
        Path.map("#/:project/:tab").to(function () {
            me.getController('Projects').setProjectById(parseFloat(this.params.project), function () {
                me.getController('Projects').setTab(this.params.tab);
            }, this);
        });

        //Navigation opening a modal Window
        Path.map("#/:project/:tab/:id").to(function () {
            me.getController('Projects').setProjectById(parseFloat(this.params.project), function () {
                me.getController('Projects').setTab(this.params.tab);
                me.getController(this.params.tab).openModal(this.params.id);
            }, this);
        }).exit(function(){
                me.getController(this.params.tab).closeModal();
            });




        Path.root('#');
        Path.rescue(function () {
			Ext.Msg.alert('Error', 'You are on the wrong path!')
        });
        Path.listen();
    }



});