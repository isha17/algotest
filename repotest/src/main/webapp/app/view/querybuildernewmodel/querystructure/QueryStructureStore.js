Ext.define('Buzzor.view.querybuildernewmodel.querystructure.QueryStructureStore', {
    extend: 'Ext.data.Store',
    requires:['Buzzor.view.querybuildernewmodel.querystructure.QueryStructureModel'],
    autoSync: false,
    model: 'Buzzor.view.querybuildernewmodel.querystructure.QueryStructureModel',
    filters: []
  
});
