Ext.define('Buzzor.view.databrowsercalendar.DBCalendar', {
	extend : 'Buzzor.view.databrowsercalendar.DBCalendarView',
	requires : [ 'Buzzor.view.databrowsercalendar.DBCalendarController',
	             'Buzzor.view.databrowsercalendar.DBCalendarView'],
	controller : 'databrowsercalendar',
	items : [ ],
	listeners : {
		afterrender : 'loadData',
		scope : "controller"
	}
});
