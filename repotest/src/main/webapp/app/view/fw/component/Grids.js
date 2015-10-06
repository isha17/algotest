Ext.define('Buzzor.view.fw.component.Grids',{
	extend:'Ext.grid.Panel',
	xtype:'grids',
	
	getValues:function()
	{
		debugger;
		var data = [];
		var gridStoreData = this.getStore().getData().items;
		if(gridStoreData && gridStoreData.length>0)
		{
			for (var x = 0; x < gridStoreData.length; x++) {
				data.push(gridStoreData[x].data);
			}
		}
		return data;
	}
});