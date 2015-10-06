Ext.define('Buzzor.view.art.masterform.MasterFormPanel',
{
	extend :'Ext.form.Panel',
	xtype: 'masterFormPanel',
	itemId : 'masterFormPanel',
	
	requires: ['Buzzor.view.art.masterform.MasterFormModel','Buzzor.view.art.masterform.MasterFormViewModel','Buzzor.view.art.masterform.MasterFormPanelController'],

	//viewModel: 'masterFormViewModel',
	
	controller: 'masterFormPanelController'

});
	