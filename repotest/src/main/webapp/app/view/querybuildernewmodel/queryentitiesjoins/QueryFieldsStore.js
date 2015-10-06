Ext.define('Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsStore', {
    extend: 'Ext.data.Store',
    requires:['Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsModel'],
    autoSync: false,
    model: 'Buzzor.view.querybuildernewmodel.queryentitiesjoins.QueryFieldsModel',
    filters: []
  
});
