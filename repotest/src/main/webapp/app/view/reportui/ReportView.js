Ext.define('Buzzor.view.reportui.ReportView', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Buzzor.view.reportui.querycriteria.QueryCriteriaView',
			'Buzzor.view.reportui.datachart.DataChartViewTab',
			'Buzzor.view.reportui.datachart.DataChartViewPanel',
			'Buzzor.view.reportui.ReportViewController' ,
			'Buzzor.view.fw.MainDataPointPanel',
			'Buzzor.view.googlemaps.map.MapPanel'
			],
	xtype : 'reportview',
	controller : 'reportviewController',
	layout : 'border',
	reportWidgets :["1","2","3","4"],
	//autoScroll : true,
	//margin : '3 0 5 0',

	listeners : {
		scope : 'controller',
		afterrender : 'renderReport'
	}
});
