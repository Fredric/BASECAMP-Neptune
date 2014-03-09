Ext.define('BASECAMP.controller.TodoLists', {
    extend: 'Abstract.controller.Navigation',
    views: ['todolists.Grid', 'todolists.UI', 'todolists.TodoItems'],
    models: ['TodoList', 'Todo', 'Name', 'Assignee'],
    stores: ['TodoLists', 'Todos'],
    refs: [
        {
            ref: 'UI',
            selector: 'todolists'
        },
        {
            ref: 'todolistItems',
            selector: 'todoitems'
        }
    ],
    init: function () {
        var me = this;
        me.control({
            'todolistgrid': {
                select: function (rowModel, record, index, eOpts) {
                    this.getTodolistItems().store.load({params: {id: record.getId()}});
                },

                'edit': function (editor, e) {
                    e.grid.getStore().sync();

                },
                Delete: function (store, record) {
                    store.remove(record);
                    store.sync();
                }

            },
            'todolistmodal': {
                hide: me.navigateCloseModal
            }

        });

        me.application.on('onProjectSelect', me.initUI, me);

    },
    initUI: function (project) {
        var me = this;
        if (project.get('todolists').remaining_count !== 0) {
            me.getUI().setDisabled(false);
            me.getUI().setTitle('Todolists (' + project.get('todolists').remaining_count + ')');
            me.getTodoListsStore().load({
                params: {
                    project: project.getId()
                }        });
        } else {
            me.getUI().setTitle('Todolists');
            //me.getUI().setDisabled(true);
        }

    },

    openModal: function (id) {
        var me = this;
        me.getUI().modal.show();
        Ext.ModelManager.getModel('BASECAMP.model.TodoList').load(id, {
            params: {
                project: me.application.getProject().getId()
            },
            success: function (todolist) {

                me.getUI().modal.remaining.reconfigure(todolist.remaining());
                me.getUI().modal.completed.reconfigure(todolist.completed());
            }
        });
    },
    closeModal: function () {
        var me = this;
        me.getUI().modal.close();

    }
});
