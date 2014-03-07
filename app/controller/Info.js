Ext.define('BASECAMP.controller.Info', {
    extend: 'Abstract.controller.Navigation',
    views: ['Info.UI', 'Info.EventGrid'],
    models: ['Event'],
    stores: ['Events'],
    refs: [
        {
            ref: 'UI',
            selector: 'info #body'
        }
    ],
    init: function () {
        var me = this;

        me.application.on('onProjectSelect', this.initUI, this);
    },
    initUI: function (project) {
        var me = this;
        me.getUI().update(project.data);

    }
});
