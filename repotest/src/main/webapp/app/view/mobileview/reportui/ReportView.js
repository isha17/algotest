Ext.define('Buzzor.view.mobileview.reportui.ReportView', {
	extend : 'Ext.panel.Panel',
	requires : [ 'Buzzor.view.mobileview.reportui.querycriteria.QueryCriteriaView',
			'Buzzor.view.mobileview.reportui.datachart.DataChartViewTab',
			'Buzzor.view.mobileview.reportui.datachart.DataChartViewPanel',
			'Buzzor.view.mobileview.reportui.ReportViewController' ,
			'Buzzor.view.mobileview.fw.DataPointPanel',
			'Buzzor.view.mobileview.googlemaps.map.MapPanel'
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
