Ext.define('Buzzor.view.fw.frameworkController.FrameworkViewController', {
     extend: 'Ext.app.ViewController',
     /*********************Main Controller Functions*********************************/
     
     
     /** To add server calls in communication array */
     addCommunicationLog: function(response, success, compRef) {
          try {
               if (success) {
                    var responseData = Ext.JSON.decode(response.responseText);
               }
               if (compRef == null) {
                    responseObj = {
                         name: '',
                         status: response.status,
                         statusText: response.statusText,
                         success: success,
                         message: success ? responseData.response.message : 'Failed'
                    };
               } else {
                    responseObj = {
                         name: (compRef.fieldLabel != null) ? compRef.fieldLabel : compRef.title,
                         status: response.status,
                         statusText: response.statusText,
                         success: success,
                         message: success ? responseData.response.message : 'Failed'
                    };
               }
               this.view.communicationLog.push(responseObj);
          } catch (addCommunicationLogException) {}
     },

     /** To create the final json to save */
     createFinalJson : function(data){
     	if (data.id != null) {
               delete data.id;
          }
          var jsonData = {};
          for (key in data) {
               if (data[key] != null) {
                    jsonData[key] = data[key];
               }
          }
          this.modifyData(jsonData);
          return jsonData;
     },
     
     /** To remove the unwanted code from final json creation */
     modifyData: function(config) {
          if (!config) {
               return null;
          }
          for (i in config) {
               if (config[i]) {
                    config[i] = config[i].valueOf();
                    if (typeof config[i] == 'object') {
                         this.modifyData(config[i]);
                    }
               }
          }
     },
     
     
     /** To find the child in tree by property and value */
     findChild: function(node, key, value) {
          var dNode = node;
          if (node.data.bConfig != null && node.data.bConfig[key] == value) {
               return node;
          } else if (node.childNodes) {
               for (var index = 0; index < node.childNodes.length; index++) {
                    dNode = this.findChild(node.childNodes[index], key, value);
                    if (dNode) {
                         return dNode;
                    }
               }
          } else {
               return null;
          }
     },
     
    
     
     /********************************Form Controller Functions***********************************/

     /** To add the store to combo */
     assignComboData: function(component, data) {
    	  component.setValue('');	
          var storedata = Ext.JSON.decode(data);
          storedata = storedata.response.data;
          
          component.store.setData(storedata);
          component.getStore().sort('primaryDisplay', 'ASC');
     },
     
     /** To find all the combos from container and assign the data to each */ 
     assignAllComboData: function(container, itemId, data) {
          var allForms = container.up().query('form');
          for (var index = 0; index < allForms.length; index++) {
               if (allForms[index].down('#' + itemId) != null) {
                    container.controller.assignComboData(allForms[index].down('#' + itemId), data);
               }
          }
     },
     
     /** To show the window with the server call log */
     onConsoleClick: function() {
          var window = Ext.create('Buzzor.view.console.ConsoleWindow');
          var store = window.down('grid').store;
          store.loadData(this.view.communicationLog);
          window.show();
     },
     
     /** To delete the record from the grid in froms */
     onDeleteActionColumnClick: function(grid, rowIndex) {
          grid.store.removeAt(rowIndex);
          grid.refresh();
     },
     
     /** To find the records from store */
     fetchDataFromStore: function(store) {
          storeItems = store.data.items;
          obj = {};
          arr = [];
          for (counter in storeItems) {
               arr.push(storeItems[counter].data);
          }
          return obj['objArr'] = arr;
     },

     /** To remove the id from the data */ 
     removeId: function(data) {
          for (var int = 0; int < data.length; int++) {
               delete data[int]['id'];
          }
     },

     /** Crated the json object by the bindLevel setted to the components */
     createObject: function(data, dataLevel, assignValue) {
          this.removeId(assignValue);
          var dataLevels = dataLevel.split('.');
          var currentObject = data;
          for (var iterable_element in dataLevels) {
               var element = dataLevels[iterable_element];
               var elementValue = currentObject[element];
               if (currentObject[element]) {
                    currentObject = elementValue;
               } else {
                    currentObject[element] = assignValue;
                    return currentObject;
               }
          }
          return data;
     },
     
     /** To display the date in form */
     modifyFormValues: function(values, form) {
          for (var key in values) {
               if (form.down('#' + key).dataType == 'DATE' || form.down('#' + key).dataType == 'DATETIME') {
                    if (form.down('#' + key).getValue() != null) {
                         values[key] = form.down('#' + key).getValue().getTime();
                    }
               }
               if (typeof values[key] === 'object') {
                    values[key] = this.modifyFormValues(values[key], form);
               }
          }
          return values;
     },
     
      /** For the tree filter */ 
     onTriggerfieldChange: function(me) {
          debugger;
          var tree = me.up().up();
          var v;
          try {
               v = new RegExp(me.getValue(), 'i');
               tree.store.filter({
                    filterFn: function(node) {
                         var children = node.childNodes,
                              len = children && children.length,
                              visible = node.isLeaf() ? v.test(node.get('text')) : false,
                              i;
                         for (i = 0; i < len && !(visible = children[i].get('visible')); i++);
                         return visible;
                    },
                    id: 'titleFilter'
               });
          } catch (e) {
               me.markInvalid('Invalid regular expression');
          }
     },
     
     /** To check the duplicate record in local form-grid */ 
     isDuplicateRecord : function(rec1, rec2){
    	 
    	 for (key in rec1) {
             if (rec1[key] != rec2[key]) {
            	 return false;
             }
        }
    	return true;
     },
     
     /**To get all the items in view */
     getAllItems : function(items){
    	 
    	 var allItems = new Array();
    	 allItems = allItems.concat(items);
    	 
    	 for (var index = 0; index < items.length; index++) {
    		 if(items[index].items){
    			 var moreItems = this.getAllItems(items[index].items.items);
        		 allItems = allItems.concat(moreItems);
        	 }
		}
    	return allItems;
     },
     
     /**Custom getData of the form with the bindable property*/
     getDataDepricated : function(view){
    	 
    	var formValues = view.getValues();
    	var items = this.getAllItems(view.items.items);
    	
    	var finalJson = {};
    	
    	for(key in formValues){
    		var itemArr =items.filter(function(obj){ return obj.name == key});
    		
    		for (var index = 0; index < itemArr.length; index++) {
    			var bindable = itemArr[index].bindable;
    			if(bindable){
    				var val = itemArr[index].getValue();
        			finalJson[bindable] = val;
        			for(innerKey in val){
        				if(innerKey == bindable){
        					finalJson[bindable] = val[innerKey];
        				}
        			}
    			}
			}
    	}
    	return finalJson;
     },

     /** Final jsonData creation function */
      getData : function(view){
     	 
      	/*if(!view.isValid()){
      		return;
      	} */
      	 
       	var items = view.items.items;
       	var json = {};
       	for (var int = 0; int < items.length; int++) {
   			var item = items[int];
   			
   			if(item.isListPanel){
   				if(item.bindable){
   					json[item.bindable] = item.controller.getValues();
   				}else{
   					return item.controller.getValues();
   				}
   			} else {
   				var xtype = item.xtype;
   	   			
   	   			if(xtype == 'panel' ||  xtype == "fieldset" || xtype == "form"){
   	   				debugger;
   	   				var inner = this.getData(item);
   	   				if(item.bindable){
   	   					json[item.bindable] = inner;
   	   				}else{
   	   					this.addJson(json, inner);
   	   				}
   	   			}
   	   			else if(item.bindable){
   	   				if(xtype == 'textfield' || xtype == 'hiddenfield' || xtype == 'textareafield'  || xtype == 'numberfield' || xtype == 'timefield' || xtype == 'datefield' || xtype == 'combo')
   	   				{
   	   					json[item.bindable] = item.getValue();
   	   				}else if(xtype == 'checkboxsgroups' )
   	   				{
   	   					json[item.bindable] = item.getValues();
   	   				}
   	   			}
   			}
   		}
       	
       	return json;
        },
        
      
      
      addJson : function(targetJSON, src){
     	 debugger;
      	for(key in src){
      		targetJSON [key] = src[key];
      	}
      },    
      
      /** Adding tab to main tab panel */
      addTab : function (component){
    	  
    	  var tabs =  Ext.getCmp('appMainTabPanel');
    	  tabs.add(component);
    	  tabs.setActiveTab(component);
      },
      
      /** Create window */
      createWindow : function (component){
    		
    	  new Ext.Window({
 	    	   title: '', 
 	    	   bodyPadding:'7',
 	    	   layout:'fit',
 	    	   width:'75%',
 	    	   height:600,
 	    	   closeAction:'close',
 	    	   autoScroll:true,
 	    	   items:[component]
			}).show();
		}
});