/**
 * Proxy to communicate with indexedDb
 *  **Sample config**
 *
 *      proxy: {
 *          type: 'idb',
 *          dbConfig: {
 *              dbVersion: 3,
 *              dbName: 'Contractors',
 *              objectStoreName: 'all'
 *              autoIncrement: false
 *              keyPath:'id'
 *          }
 *      }
 *
 */



Ext.define('XLib.data.proxy.IndexedDb', {
    extend: 'XLib.data.proxy.BrowserDb',
    alias: 'proxy.idb',
    alternateClassName: 'Ext.data.IdbProxy',
    uses:[
        'XLib.db.IndexedDb'
    ],
    /**
     * @cfg {Object} dbConfig A config object sent to the database implementation
     * @cfg {Number} dbConfig.dbVersion The version. Increment to refresh schema.
     * @cfg {String} dbConfig.dbName The name of the IndexedDb database.
     * @cfg {String} dbConfig.objectStoreName The name of the IndexedDb store (Table).
     * @cfg {Bool} dbConfig.autoIncrement True to increment automatically.
     * @cfg {String} dbConfig.keyPath The models idProperty.
     *
     */


    /**
     * Must return a valid database wrapper supporting the API
     * @returns {IndexedDB|*}
     */

    getDatabase: function () {
        var me = this;
        return Ext.create('XLib.db.IndexedDb', me.dbConfig);
    }

});
