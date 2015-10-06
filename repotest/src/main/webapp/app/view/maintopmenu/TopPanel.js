Ext.define('Buzzor.view.maintopmenu.TopPanel', {
	extend : 'Ext.toolbar.Toolbar',
	xtype : 'topToolbar',
	
	requires : [ 'Buzzor.view.maintopmenu.TopPanelController',
	             'Buzzor.view.maintopmenu.MenuPanel' ],
	controller : 'topToolbarController',

	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	
	margin : '0 0 5 0',
	
	style : {
		backgroundColor: "#000000"
	},
	
	items : [{
		xtype : 'image',
		padding : 1,
		width : 100,
		height : 25,
		src : 'resources/css/images/logo.png'
	}, '-', {
		xtype : 'menuPanel'
	}, '->', '-', {
		xtype : 'image',
		src : 'images/menu/search.png',
		//margin :'5 2 0 5',
		height : 20,
		width : 28,
		listeners : {
			'afterrender' : function(comp) {
				comp.getEl().on('click', function(el) {
					this.fireEvent('onSearchClick');
				}, this);
			},
			onSearchClick : 'onSearchClick'
		}
	},{
		xtype : 'image',
		src : 'images/menu/clouddrive.png',
		//margin :'5 2 0 5',
		height : 20,
		width : 28,
		listeners : {
			'afterrender' : function(comp) {
				comp.getEl().on('click', function(el) {
					this.fireEvent('onCloudClick');
				}, this);
			},
			onCloudClick : 'onCloudClick'
		}
	}, '-', {
		xtype : 'button',
		text :  'Logout',

		baseCls : 'menuPanelElement',
		cls : 'menuPanelElementInner',
				
		icon : 'resources/css/images/logout.png',
		padding : 1,
		handler : 'onLogoutClick',
		plugins : 'responsive',
		responsiveConfig : {
			tall : {
				text : "",
				tooltip : 'Logout',
			},
			wide : {
				text : 'Logout',
			}
		}
	} ]
});
