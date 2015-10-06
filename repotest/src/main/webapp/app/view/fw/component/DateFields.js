Ext.define('Buzzor.view.fw.component.DateFields',{
	extend:'Ext.form.Date',
	xtype:'datefields',
	
	getValue:function()
	{
		debugger;
		if(this.value)
			return this.value.getTime();
	}
});