/**
 * 
 */
Ext.define('Buzzor.view.searchengine.search.ReportChartView',{
	extend : 'Ext.panel.Panel',
	xtype: 'reportChartView',
	margin:'5 5 0 0',
	chartJson : null,
	border:1,
	requires: ['Buzzor.view.searchengine.search.ReportChartController'],
	
	controller:'reportChartController',
	
	initComponent : function() {
		
		
	  this.listeners = {
			  scope:'controller',
			  afterrender : 'onAfterrender'/*function( me, record, index, eOpts )
				{
					alert("Selected");	
				}*/
		},

		this.callParent();
	}
});