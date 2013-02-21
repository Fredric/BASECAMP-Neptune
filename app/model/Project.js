Ext.define('BASECAMP.model.Project', {
	extend: 'Ext.data.Model',
	fields: [
		{name: 'id', type: 'float'},
		{name: 'name', type: 'string'},
		{name: 'description', type: 'string'},
		{name: 'archived', type: 'bool'},
		{name: 'created_at', type: 'date'},
		{name: 'updated_at', type: 'date'},
		{name: 'starred', type: 'bool'},
		{name: 'todolists', type: 'auto'},
		{name: 'accesses', type: 'auto'},
		{name: 'attachments', type: 'auto'},
		{name: 'calendar_events', type: 'auto'},
		{name: 'documents', type: 'auto'},
		{name: 'forwards', type: 'auto'},
		{name: 'topics', type: 'auto'},
		{name: 'creator', type: 'auto'},
		{name: 'creatorname', type: 'string', convert: function (val, rec) {
			return rec.data.creator.name
		}},
		{name: 'creatorurl', type: 'string', convert: function (val, rec) {
			return rec.data.creator.avatar_url
		}}


	],
	proxy: {
		type: 'ajax',
		url: 'resources/php/project.php',
		reader: {
			type: 'json'
		}
	},
	isOpen: function () {


	}

});