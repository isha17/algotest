Ext.define('Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesStore', {
    extend: 'Ext.data.Store',
   // requires:['Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel'],
    autoSync: false,
    model: 'Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryEntitiesModel',
    data:[]
});
