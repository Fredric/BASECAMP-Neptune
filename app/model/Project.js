Ext.define('BASECAMP.model.Project', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'                 , type: 'float'     },
        {name: 'name'               , type: 'string'    },
        {name: 'description'        , type: 'string'    },
        {name: 'archived'           , type: 'bool'      },
        {name: 'created_at'         , type: 'date'      },
        {name: 'updated_at'         , type: 'date'      },
        {name: 'starred'            , type: 'bool'      },
        {name: 'todolists'          , type: 'auto'      },
        {name: 'accesses'           , type: 'auto'      },
        {name: 'attachments'        , type: 'auto'      },
        {name: 'calendar_events'    , type: 'auto'      },
        {name: 'documents'          , type: 'auto'      },
        {name: 'forwards'           , type: 'auto'      },
        {name: 'topics'             , type: 'auto'      },
        {name: 'creator'            , type: 'auto'      },
        {name: 'creatorname'        , type: 'string', convert: function (val, rec) {
           // console.log(rec.data.creator)
           // return rec.data.creator.name;
        }},
        {name: 'creatorurl'         , type: 'string', convert: function (val, rec) {
           // return rec.data.creator.avatar_url;
        }}


    ],
    proxy: {
        type: 'ajax',
        batchActions: false,
        api: {
            create          : 'resources/php/projects/create.php',
            read            : 'resources/php/projects/read.php',
            update          : 'resources/php/projects/update.php',
            destroy         : 'resources/php/projects/destroy.php'
        },
        reader: {
            type            : 'json',
            rootProperty    : 'data'
        },
        writer: {
            type            : 'json',
            encode          : true,
            rootProperty    : 'data',
            batch           : false
        }
    },
    isOpen: function () {


    }

});