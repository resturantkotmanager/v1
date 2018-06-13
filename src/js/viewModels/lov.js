/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your lov ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 'ojs/ojbutton', 'promise', 'ojs/ojinputtext', 'ojs/ojselectcombobox',
'ojs/ojtable', 'ojs/ojdatacollection-utils', 'ojs/ojarraydataprovider'],
 function(oj, ko, $) {
  
    function LovViewModel() {
      var self = this;
      self.buttonClick = function(event){
        
        return true;
    }


    var deptArray = [{DepartmentId: 1001, DepartmentName: 'ADFPM 1001 neverending',  Type: 'Finance'},
                     {DepartmentId: 1002, DepartmentName: 'BB',  Type:'Sales'},
                     {DepartmentId: 1003, DepartmentName: 'Administration',  Type: 'HR'},
                     {DepartmentId: 1004, DepartmentName: 'Marketing', Type: 'Sales'}];
    var deptArrayObservables = deptArray.map(function(row) {
      Object.keys(row).forEach(function(attr) {
        row[attr] = ko.observable(row[attr]);
      });
      return row;
    });
    self.deptObservableArray = ko.observableArray(deptArrayObservables);
    self.dataprovider = new oj.ArrayDataProvider(self.deptObservableArray, {idAttribute: 'DepartmentId'});
    self._editRowRenderer = oj.KnockoutTemplateUtils.getRenderer('editRowTemplate', true);
    self._navRowRenderer = oj.KnockoutTemplateUtils.getRenderer('rowTemplate', true);
    self.rowRenderer = function(context)
    {
        var mode = context['rowContext']['mode'];
        var renderer;
        
        if (mode === 'edit')
        {
            self._editRowRenderer(context);
        }
        else if (mode === 'navigation')
        {
            self._navRowRenderer(context);
        }
    };
        
   
    this.beforeRowEditEndListener = function(event)
    {
       var data = event.detail;
       var rowIdx = data.rowContext.status.rowIndex;
       self.dataprovider.fetchByOffset({offset: rowIdx}).then(function(value)
       {
         var row = value['results'][0]['data'];
         var rowCopy = {};
         Object.keys(row).forEach(function(attr) {
          rowCopy[attr] = row[attr]();
         });
         $('#rowDataDump').val(JSON.stringify(rowCopy));  
       });
       if (oj.DataCollectionEditUtils.basicHandleRowEditEnd(event, data) === false) {
         event.preventDefault();
       }
    }
    $('#table').on('ojBeforeRowEditEnd', this.beforeRowEditEndListener);
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    var vm =  new LovViewModel();
    $(document).ready
  (
    function()
    {
      var element = document.getElementById('table');
      //ko.applyBindings(vm, element);
      element.addEventListener('ojBeforeRowEditEnd', vm.beforeRowEditEndListener);
    }
  );
    return vm;
  }
);
