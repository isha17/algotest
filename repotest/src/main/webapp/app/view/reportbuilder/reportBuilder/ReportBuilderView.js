Ext.define('Buzzor.view.reportbuilder.reportBuilder.ReportBuilderView', {
	extend : 'Ext.tab.Panel',
	requires : [
	            'Buzzor.view.reportbuilder.reportBuilder.ReportBuilderController',
	            'Buzzor.view.reportbuilder.reportBuilder.ReportConfigurationView',
	            'Buzzor.view.chartbuilder.viewchart.ChartMainView',
	            //'Buzzor.view.querybuildernewmodel.QueryBuilderPanel'
	            ],
	controller : 'reportBuilderController',
	xtype : 'report-builder-panel',
	margin : '3 0 0 0',
	//itemId:'rptBuilderTabPanel',  //never give itemId to tab it causes problem
	tabPosition : 'bottom',
	listeners:{
		scope:'controller',
		afterrender:'afterRender'
	},
	items :[
	        /*{
	        	title : 'Query Configuration',
	        	xtype : 'query-builder',
	        	style : 'background:#f6f6f6;',
	        },*/
	        {
				title : 'Grid Configuration',
				xtype : 'report-config',
				itemId: 'data-config',
				tabId : "data-config",
				style : 'background:#f6f6f6;',
				listeners : {
					 activate : 'loadGridConfigTab'
				}
			 },
			 {
				 title : 'Chart Configuration',
				 xtype : 'apps-chartview',
				 itemId : 'chart-main-view',
				 tabId : "chart-config",
				 style : 'background:#f6f6f6;',
				 listeners : {
					 activate : 'loadChartConfigTab'
				 }
			 }, 
			 {
				 title : 'Preview',
				 // xtype:'report-main-preview',
				 tabId : "preview",
				 style : 'background:#f6f6f6;',
				 listeners : {
					 activate : 'loadPreviewTab'
				 }
			 }]
});