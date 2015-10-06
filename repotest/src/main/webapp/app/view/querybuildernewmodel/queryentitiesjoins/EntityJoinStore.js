Ext.define('Buzzor.view.querybuildernewmodel.queryentitiesjoins.EntityJoinStore', {
    extend: 'Ext.data.Store',
    requires:['Buzzor.view.querybuildernewmodel.queryentitiesjoins.EntityJoinModel'],
    autoSync: false,
    model: 'Buzzor.view.querybuildernewmodel.queryentitiesjoins.EntityJoinModel',
    data:[]
});
