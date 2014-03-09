/**
 *  XLib.data.proxy.BrowserDb is simply a superclass for the {@link XLib.data.proxy.IndexedDb IndexedDb} proxy.
 * @private
 */
Ext.define('XLib.data.proxy.BrowserDb', {
    extend: 'Ext.data.proxy.Proxy',
    alias: 'proxy.bdb',
    alternateClassName: 'Ext.data.BdbProxy',

    /**
     * @property {database} db The database connection implementation.
     */
    db: undefined,

    constructor: function (config) {
        this.callParent(arguments);
        this.initConfig(config);
        this.initialize();
    },

    realizeRecord: function (data) {
        var model = this.getModel();
        var rec = model ? Ext.create(model, data) : data;
        this.readAssociated(rec, data);

        return  rec;
    },

    readAssociated: function (record, data) {
        var associations = record.associations.items,
            i = 0,
            length = associations.length,
            association, associationData, proxy, reader;

        for (; i < length; i++) {
            association = associations[i];
            associationData = this.getAssociatedDataRoot(data, association.associationKeyFunction || association.associationKey || association.name);

            if (associationData) {
                reader = association.getReader();
                if (!reader) {
                    proxy = association.associatedModel.getProxy();
                    // if the associated model has a Reader already, use that, otherwise attempt to create a sensible one
                    if (proxy) {
                        reader = proxy.getReader();
                    } else {
                        reader = new this.constructor({
                            model: association.associatedName
                        });
                    }
                }
                association.read(record, reader, associationData);
            }
        }
    },
    getAssociatedDataRoot: function (data, associationName) {
        if (Ext.isFunction(associationName)) {
            return associationName(data);
        }

        return data[associationName];
    },

    /**
     * Implement this function in your proxy to return a Class wich talks this language.
     */
    getDatabase: function () {
        var me = this;
        return Ext.create('XLib.db.IndexedDB', me.dbConfig);
    },

    initialize: function () {
        var me = this;
        me.db = me.getDatabase();
    },

    //inherit docs
    create: function (operation, callback, scope) {

        var records = operation.records,
            length = records.length,
            id,
            record,
            i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.db.create(record.getData(), function (success, error) {

                if (success === false) {
                    operation.setException(error);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                        return;
                    }
                }

                if (i === length && success === true) {
                    operation.setCompleted();
                    operation.setSuccessful();
                    operation.commitRecords(records);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                    }
                }

            }, this);
        }
    },

    //inherit docs
    read: function (operation, callback, scope) {
        var records = [],
            me = this,
            finishReading = function (records, success, message, event) {
                me.readCallback(operation, records, success, message);

                if (typeof callback === 'function') {
                    callback.call(scope || this, operation);
                }
            };

        //read a single record
        if (operation.id) {
            this.db.read(operation.id, finishReading, me);
        } else {
            this.db.readAll(finishReading, me);
            operation.setSuccessful();
        }
    },

    readCallback: function (operation, records, success, message) {
        var arr = [],
            me = this;

        Ext.each(records, function (record) {
            arr.push(me.realizeRecord(record));
        }, me);

        if (success) {
            operation.setSuccessful();
            operation.setCompleted();
            operation.resultSet = Ext.create('Ext.data.ResultSet', {
                records: arr,
                total: arr.length,
                loaded: true
            });
        } else {
            operation.setException(message);
        }
    },
    //inherit docs
    update: function (operation, callback, scope) {
        var records = operation.records,
            length = records.length,
            record,
            id,
            i;

        operation.setStarted();

        for (i = 0; i < length; i++) {
            record = records[i];
            this.db.update(record.getData(), function (success, error) {

                if (success === false) {
                    operation.setException(error);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                        return;
                    }
                }

                if (i === length && success === true) {
                    operation.setCompleted();
                    operation.setSuccessful();
                    operation.commitRecords(records);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                    }
                }

            }, this);
        }
    },

    //inherit docs
    destroy: function (operation, callback, scope) {
        var records = operation.records,
            length = records.length,
            record,
            i;
        for (i = 0; i < length; i++) {

            record = records[i].isModel ? records[i].getData() : records[i];

            this.db.destroy(record, function (success, error) {


                if (success === false) {
                    operation.setException(error);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                        return;
                    }
                }

                if (i === length && success === true) {
                    operation.setCompleted();
                    operation.setSuccessful();
                    operation.commitRecords(records);
                    if (typeof callback === 'function') {
                        callback.call(scope || this, operation);
                    }
                }

            }, this);
        }
    }
});
