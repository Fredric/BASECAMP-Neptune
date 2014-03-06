/**
 * @author Fredric Berling
 * IndexedDB Database wrapper
 *
 * **Access the indexDB database object:**
 *
 *     var db = Ext.create('Base.db.IndexedDB', {
 *          dbName: 'TestDB',
 *          storeName: 'users',
 *          keyPath: 'id'
 *     });
 *
 * **Read**
 *
 *     db.read(1, function(data, success, message, event){
 *         //Here i have the entry with id 1.
 *         console.log(data)
 *     });
 *
 * **Create**
 *
 *     db.create({
 *          id: 1,
 *          name: 'Kalle',
 *          phone: '555-99999'
 *     });
 *
 * **Update**
 *
 *     db.update({
 *          id: 1,
 *          name: 'Olle',
 *          phone: '555-99999'
 *     });
 *
 * **Destroy**
 *
 *     db.destroy(1);
 *
 * @author Fredric Berling
 */
Ext.define('XLib.db.IndexedDb', {
    extend: 'Ext.util.Observable',

    /**
     * @cfg {Number} dbVersion
     * Increment when you want to add new indexes or objectStores.
     * Defaults to 1.
     */
    dbVersion: 1,

    /**
     * @cfg {String} dbName
     * IndexedDB database name.
     * Defaults to 'MyDB'
     */
    dbName: 'MyDB',

    /**
     * @cfg {String} objectStoreName
     * IndexedDB table/objectStore name.
     * Defaults to "all"
     */
    objectStoreName: 'all',

    /**
     * @cfg {String} keyPath
     * Defines where the browser should extract the key from in the object store or index.
     * Default to "id"
     */
    keyPath: 'id',

    /**
     * @cfg {Bool} autoIncrement
     */
    autoIncrement: true,

    /**
     * @cfg {Array} indexes
     * Array with indexes configurations
     */
    indexes: [],

    /**
     * @private
     * @protected
     */
    indexedDB: window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB,

    /**
     * @private
     * @protected
     * @property {IDBDatabase}
     */
    db: undefined,

    constructor: function (config) {
        this.callParent(arguments);

        this.initConfig(config);

        this.checkDependencies();

        this.addEvents(['exception']);

        this.initialize();

        this.on('exception', function (event) {
            Ext.Msg.alert('Error', 'There was an error. See console for details')
            console.error('Indexed DB produced an error event', event);
        });
    },

    /**
     * @private
     * @protected
     */
    initialize: function () {
        var me = this,
            request = me.indexedDB.open(me.dbName, me.dbVersion),
            keyPath,
            store;

        request.onupgradeneeded = function (e) {
            var db = me.db = me.indexedDB.db = e.target.result,
                i,
                indexes = me.indexes;

            // create objectStore
            if (!db.objectStoreNames.contains(me.objectStoreName)) {
                keyPath = me.keyPath ? {keyPath: me.keyPath} : undefined;
                store = db.createObjectStore(me.objectStoreName, keyPath, me.autoIncrement);
            }

            // set indexes
            for (i in indexes) {
                if (indexes.hasOwnProperty(i)) {
                    db.objectStore.createIndex(indexes.name, indexes.field, indexes.options);
                }
            }
        };
        request.onsuccess = function (e) {
            var db = me.db = me.indexedDB.db = e.target.result;

            db.onerror = function (event) {

            };
        };
    },

    /**
     * Check if all needed config options are set
     * @private
     * @protected
     */
    checkDependencies: function () {
        var me = this;
        if (!me.indexedDB) {
            Ext.Error.raise("IndexedDB is not supported in your browser.");
        }
        if (!Ext.isString(me.dbName)){
                Ext.Error.raise("The dbName string has not been defined in your Ext.data.proxy.IndexedDB");
        }
        if (!Ext.isString(me.objectStoreName)){
            Ext.Error.raise("The objectStoreName string has not been defined in your Ext.data.proxy.IndexedDB");
        }

        return true;
    },
    /**
     * @private
     * @param type
     * @param callback
     * @param scope
     */
    getTransaction: function (type, callback, scope) {
        var me = this,
            transTypes,
            transaction;

        try {

            transTypes = {
                'rw': 'readwrite',
                'r': 'readonly',
                'vc': 'versionchange'
            };

            transaction = me.db.transaction(me.objectStoreName, type ? transTypes[type] : undefined);

        } catch (e) {

            Ext.defer(callback, 20, scope || me, [type, callback, scope]);
            return false;

        }
        return transaction;
    },

    /**
     * Fetches a single entry by id.
     * @param {Mixed} id id
     * @param {Function} callback Callback function
     * The call back returns this:
     * @param {Object} callback.data The fetched entry data.
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    read: function (id, callback, scope) {
        var me = this,
            objectStore,
            transaction = me.getTransaction('r', Ext.bind(me.read, me, [id, callback, scope])),
            data,
            request;

        if (!transaction) {
            return;
        }

        objectStore = transaction.objectStore(me.objectStoreName);
        request = objectStore.get(id);



        request.onerror = function (event) {
            me.fireEvent('exception', event);
            if (typeof callback === 'function') {
                callback.call(scope || me, {}, false, event.target.error.message);
            }
        };

        request.onsuccess = function (event) {
            data = request.result;
            if (typeof callback === 'function') {
                if (typeof data === 'undefined') {
                    callback.call(scope || me, {}, false, 'No data found for specified key');
                } else {
                    callback.call(scope || me, data, true, '');
                }
            }
        };

        transaction.oncomplete = function (event) {
        };

    },

    /**
     * Create a entry in the database.
     * @param {Object} data The data object
     * @param {Function} callback Callback function
     * The callback returns this:
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    create: function (data, callback, scope) {
        var me = this,
            i = 0,
            objectStore,
            transaction = me.getTransaction('rw', Ext.bind(me.create, me, [data, callback, scope]));

        if (!transaction) {
            return;
        }
        try {

            objectStore = transaction.objectStore(me.objectStoreName);

            if (!Ext.isArray(data)) {
                objectStore.add(data);
            } else {
                putNext();
            }


            function putNext() {
                if (i < data.length) {
                    objectStore.put(data[i]).onsuccess = putNext;
                    ++i;
                } else {   // complete
                    console.log('complete');
                }
            }

            transaction.oncomplete = function () {
                if (typeof callback === 'function') {
                    callback.call(scope || me, true, '');
                }

            };

            transaction.onerror = function (event) {
                me.fireEvent('exception', event);
                if (typeof callback === 'function') {
                    callback.call(scope || me, false, event.target.error.message);
                }
            };

        } catch (err) {

            me.fireEvent('exception', err);
            if (typeof callback === 'function') {
                console.log('error calback call soon')
                callback.call(scope || me, false, err.toString());
            }
        }
    },


    /**
     * Update a entry in the database.
     * @param {Object} data The data object
     * @param {Function} callback Callback function
     * The callback returns this:
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    update: function (data, callback, scope) {
        var me = this,
            objectStore,
            updateRequest,
            transaction = me.getTransaction('rw', Ext.bind(me.update, me, [data, callback, scope])),
            id = data[me.keyPath],
            keyRange,
            cursorRequest;

        if (!transaction) {
            return;
        }

        try {
            objectStore = transaction.objectStore(me.objectStoreName);


            var request = objectStore.put(data);

            transaction.oncomplete = function (e) {
                if (typeof callback === 'function') {
                    callback.call(scope || me, true, '');
                }
            };
            transaction.onerror = function (e) {
                me.fireEvent('exception', e);
                if (typeof callback === 'function') {
                    callback.call(scope || me, false, e.target.error.message);
                }
            };

        } catch (err) {
            me.fireEvent('exception', err);
            if (typeof callback === 'function') {
                callback.call(scope || me, false, err.toString());
            }
        }
    },

    /**
     * Destroy an entry in the database.
     * @param {Object} data The data object
     * @param {Function} callback Callback function
     * The callback returns this:
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    destroy: function (data, callback, scope) {

        var me = this,
            id,
            objectStore,
            transaction = me.getTransaction('rw', Ext.bind(me.destroy, me, [data, callback, scope]));
        if (!transaction) {
            return;
        }

        try {

            id = Ext.isObject(data) ? data[me.keyPath] : data;

            objectStore = transaction.objectStore(me.objectStoreName);

            var req = objectStore["delete"](id);

            transaction.oncomplete = function () {
                me.checkIfExists(id, function (exists) {
                    if (exists) {
                        if (typeof callback === 'function') {
                            callback.call(scope || me, false, '');
                        }
                    } else {
                        if (typeof callback === 'function') {
                            callback.call(scope || me, true, '');
                        }
                    }
                }, me);
            };

            transaction.onerror = function (event) {
                me.fireEvent('exception', event);
                if (typeof callback === 'function') {
                    callback.call(scope || me, false, event.target.error.message);
                }
            }

        } catch (err) {
            me.fireEvent('exception', err);
            if (typeof callback === 'function') {
                callback.call(scope || me, false, err.toString());
            }

        }
    },
    /**
     * Get all entries from a database store.
     * @param {Function} callback Callback function
     * The callback returns this:
     * @param {Bool} callback.dataArray An array containing all entries.
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    readAll: function (callback, scope) {
        var me = this,
            objectStore,
            transaction = me.getTransaction('r', Ext.bind(me.readAll, me, [callback, scope])),
            entries = [];

        if (!transaction) {
            return;
        }

        objectStore = transaction.objectStore(me.objectStoreName);

        var request = objectStore.openCursor();

        request.onerror = function (event) {
            me.fireEvent('exception', event);
            if (typeof callback === 'function') {
                callback.call(scope || me, [], false, event.target.error.message, event);
            }
        };

        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                entries.push(cursor.value);
                cursor["continue"]();
            } else {
                if (typeof callback === 'function') {
                    callback.call(scope || me, entries, true, '', event);
                }
            }
        };
    },

    /**
     * Destroy all entries in one go.
     * @param {Function} callback Callback function
     * The callback returns this:
     * @param {Bool} callback.success If the call failed or not.
     * @param {String} callback.message A message if the process failed.
     *
     * @param {Object} scope Callback fn scope
     */
    destroyAll: function (callback, scope) {
        var me = this,
            objectStore,
            transaction = me.getTransaction('r', Ext.bind(me.destroyAll, me, [callback, scope]));

        if (!transaction) {
            return ;
        }

        objectStore = transaction.objectStore(me.objectStoreName);

        var request = objectStore.openCursor();

        request.onerror = function (event) {
            me.fireEvent('exception');
            if (typeof callback === 'function') {
                callback.call(scope || me, false, event.target.error.message);
            }
        };

        request.onsuccess = function (event) {
            var cursor = event.target.result;
            if (cursor) {
                me.destroy(cursor.key);
                cursor["continue"]();

            } else {
                if (typeof callback === 'function') {
                    callback.call(scope || me, true, '');
                }
            }
        };
    },
    /**
     * @private
     * @protected
     * @param objectID
     * @param callback
     * @param scope
     */
    checkIfExists: function (objectID, callback, scope) {
        var me = this,
            objectStore,
            transaction = me.getTransaction('r', Ext.bind(me.checkIfExists, me, [objectID, callback, scope]));

        if (!transaction) {
            return;
        }

        objectStore = transaction.objectStore(me.objectStoreName);

        var selectRequest = objectStore.get(objectID);
        selectRequest.onsuccess = function (e) {
            if (e.target.result != null) {
                callback.call(scope || me, true);
            } else {
                callback.call(scope || me, false);

            }
        }


    },
    getCount: function ( callback, scope) {
        var me = this,
            objectStore,
            transaction = me.getTransaction('r', Ext.bind(me.getCount, me, [callback, scope]));

        if (!transaction) {
            return ;
        }

        objectStore = transaction.objectStore(me.objectStoreName);

        var selectRequest = objectStore.count();

        selectRequest.onsuccess = function (e) {
            if (e.target.result !== null) {
                callback.call(scope || me, e.target.result);
            } else {
                callback.call(scope || me, 0);
        }
        }
    }

});
