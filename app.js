/*
 This file is generated and updated by Sencha Cmd. You can edit this file as
 needed for your application, but these edits will have to be merged by
 Sencha Cmd when upgrading.
 */

// DO NOT DELETE - this directive is required for Sencha Cmd packages to work.
//@require @packageOverrides

Ext.require('Ext.util.History');
//Ext.require('Ext.data.*.Json');
Ext.require('Ext.layout.container.Border');

//Ext overrides
Ext.Loader.setPath('Overrides', 'lib/overrides');
Ext.require('Overrides.data.reader.Reader');
Ext.require('Ext.grid.plugin.BufferedRendererTreeView');

Ext.Loader.setPath('Abstract', 'lib/abstract');

Ext.application({
    name: 'BASECAMP',

    extend: 'BASECAMP.Application',

    autoCreateViewport: true
});
