/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your dashboard ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'libs/DBConnection', 'ojs/ojknockout', 'promise', 'ojs/ojtable', 'ojs/ojinputtext', 'ojs/ojbutton', 'ojs/ojarraydataprovider'],
  function (oj, ko, $,conn) {

    function DashboardViewModel() {
      var self = this;
      self.filter = ko.observable();
      var baseDeptArray = [{ Table: 'G10', BillNo: '1', KOTCount: 2, TotalAmount: 300, Print: 'P' },
      { Table: 'F20', BillNo: '2', KOTCount: 10, TotalAmount: 300, Print: 'P' },
      { Table: 'G30', BillNo: '3', KOTCount: 5, TotalAmount: 300, Print: 'P' },
      { Table: 'S40', BillNo: '4', KOTCount: 5, TotalAmount: 300, Print: 'P' },
      { Table: 'G50', BillNo: '5', KOTCount: 2, TotalAmount: 300, Print: 'P' },
      { Table: 'G60', BillNo: '6', KOTCount: 1, TotalAmount: 300, Print: 'P' },
      { Table: 'F70', BillNo: '7', KOTCount: 11, TotalAmount: 300, Print: 'P' },
      { Table: 'G80', BillNo: '8', KOTCount: 8, TotalAmount: 300, Print: 'P' },
      { Table: 'S90', BillNo: '9', KOTCount: 7, TotalAmount: 300, Print: 'P' },
      { Table: 'S10', BillNo: '10', KOTCount: 3, TotalAmount: 300, Print: 'P' }];
      function generateDeptArray(num) {
        var deptArray = [];
        var i, j, count = 0;
        for (i = 0; i < num; i++) {
          for (j = 0; j < baseDeptArray.length; j++) {
            deptArray[count] = $.extend({}, baseDeptArray[j]);
            deptArray[count].Table = deptArray[count].Table;
            deptArray[count].BillNo = deptArray[count].BillNo;
            count++;
          }
        }
        return deptArray;
      };
      self.deptArray = generateDeptArray(1);
      self.handleSizeChange = function (event) {
        if (event.detail.value == 'sizeTen') {
          self.deptArray = generateDeptArray(1);
        } else if (event.detail.value == 'sizeHundred') {
          self.deptArray = generateDeptArray(10);
        } else if (event.detail.value == 'sizeThousand') {
          self.deptArray = generateDeptArray(100);
        } else if (event.detail.value == 'sizeTenThousand') {
          self.deptArray = generateDeptArray(1000);
        }
        self.clearClick();
        self.dataprovider(new oj.ArrayDataProvider(self.deptArray, { idAttribute: 'Table' }));
      };

      self.dataprovider = new ko.observable(new oj.ArrayDataProvider(self.deptArray, { idAttribute: 'Table'}));
      self.highlightChars = [];
      self.handleValueChanged = function () {
        self.highlightChars = [];
        var filter = document.getElementById('filter').rawValue;
        if (filter.length == 0) {
          self.clearClick();
          return;
        }
        var deptArray = [];
        var i, id;
        for (i = self.deptArray.length - 1; i >= 0; i--) {
          id = self.deptArray[i].Table;
          Object.keys(self.deptArray[i]).forEach(function (field) {
            if (self.deptArray[i][field].toString().toLowerCase().indexOf(filter.toLowerCase()) >= 0) {
              self.highlightChars[id] = self.highlightChars[id] || {};
              self.highlightChars[id][field] = getHighlightCharIndexes(filter, self.deptArray[i][field]);
              if (deptArray.indexOf(self.deptArray[i]) < 0) {
                deptArray.push(self.deptArray[i]);
              }
            }
          });
        }
        deptArray.reverse();
        self.dataprovider(new oj.ArrayDataProvider(deptArray, { idAttribute: 'Table'}));

        function getHighlightCharIndexes(highlightChars, text) {
          var highlightCharStartIndex = text.toString().toLowerCase().indexOf(highlightChars.toString().toLowerCase());
          return { startIndex: highlightCharStartIndex, length: highlightChars.length };
        };
      };
      self.clearClick = function (event) {
        self.filter('');
        self.dataprovider(new oj.ArrayDataProvider(self.deptArray, { idAttribute: 'Table'}));
        self.highlightChars = [];
        document.getElementById('filter').value = "";
        return true;
      }
      self.highlightingCellRenderer = function (context) {
        var id = context.row.Table;
        var startIndex = null;
        var length = null;
        var field = null;
        if (context.columnIndex === 0) {
          field = 'Table';
        }
        else if (context.columnIndex === 1) {
          field = 'BillNo';
        }
        else if (context.columnIndex === 2) {
          field = 'KOTCount';
        }
        else if (context.columnIndex === 3) {
          field = 'TotalAmount';
        }
        else if (context.columnIndex === 4) {
          field = 'Print';
        }
        var data = context.row[field].toString();
        if (self.highlightChars[id] != null &&
          self.highlightChars[id][field] != null) {
          startIndex = self.highlightChars[id][field].startIndex;
          length = self.highlightChars[id][field].length;
        }
        if (startIndex != null &&
          length != null) {
          var highlightedSegment = data.substr(startIndex, length);
          data = data.substr(0, startIndex) + '<b>' + highlightedSegment + '</b>' + data.substr(startIndex + length, data.length - 1);
        }
        $(context.cellContext.parentElement).append(data);
      };
      self.columnArray = [{
        headerText: 'Table Name',
        renderer: self.highlightingCellRenderer
      },
      {
        headerText: 'Bill No',
        renderer: self.highlightingCellRenderer
      },
      {
        headerText: 'KOT Count',
        renderer: self.highlightingCellRenderer
      },
      {
        headerText: 'Total Amount',
        renderer: self.highlightingCellRenderer
      },
      {
        headerText: 'Print',
        renderer: self.highlightingCellRenderer
      }];
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new DashboardViewModel();
  }
);
