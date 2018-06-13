/**
 * @license
 * Copyright (c) 2014, 2018, Oracle and/or its affiliates.
 * The Universal Permissive License (UPL), Version 1.0
 */
/*
 * Your incidents ViewModel code goes here
 */
define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojknockout', 
'ojs/ojsunburst'],
 function(oj, ko, $) {
  
    function IncidentsViewModel() {
      var self = this;
        
        var handler = new oj.ColorAttributeGroupHandler();
        var unitedStates = createNode("United States", 301461533, 51425);
        
        var reg_NE = createNode("Northeast Region", 54906297, 57208);
        var reg_MW = createNode("Midwest Region", 66336038, 49932);
        var reg_SO = createNode("South Region", 110450832, 47204);
        var reg_WE = createNode("West Region", 69768366, 56171);

        var div_NE = createNode("New England", 14315257, 61511);
        var div_MA = createNode("Middle Atlantic", 40591040, 55726);
        var div_EN = createNode("East North Central", 46277998, 50156);
        var div_WN = createNode("West North Central", 20058040, 49443);
        var div_SA = createNode("South Atlantic", 57805475, 50188);
        var div_ES = createNode("East South Central", 17966553, 41130);
        var div_WS = createNode("West South Central", 34678804, 45608);
        var div_MO = createNode("Mountain", 21303294, 51504);
        var div_PA = createNode("Pacific", 48465072, 58735);
        
        addChildNodes(unitedStates, [reg_NE, reg_MW, reg_SO, reg_WE]);
        
        addChildNodes(reg_NE, [div_NE, div_MA]);
        addChildNodes(reg_MW, [div_EN, div_WN]);
        addChildNodes(reg_SO, [div_SA, div_ES, div_WS]);
        addChildNodes(reg_WE, [div_MO, div_PA]);
        
        addChildNodes(div_NE, [
            createNode("Connecticut", 3494487, 67721),
            createNode("Maine", 1316380, 46541),
            createNode("Massachusetts", 6511176, 64496),
            createNode("New Hampshire", 1315419, 63033),
            createNode("Rhode Island", 1057381, 55569),
            createNode("Vermont", 620414, 51284)        
        ]);
        
        addChildNodes(div_MA, [
            createNode("New Jersey", 8650548, 68981),
            createNode("New York", 19423896, 55233),
            createNode("Pennsylvania", 12516596, 49737)      
        ]);
        
        addChildNodes(div_EN, [
            createNode("Indiana", 6342469, 47465),
            createNode("Illinois", 12785043, 55222),
            createNode("Michigan", 10039208, 48700),
            createNode("Ohio", 11511858, 47144),
            createNode("Wisconsin", 5599420, 51569)    
        ]);
        
        addChildNodes(div_WN, [
            createNode("Iowa", 2978880, 48052),
            createNode("Kansas", 2777835, 48394),
            createNode("Minnesota", 5188581, 57007),
            createNode("Missouri", 5904382, 46005),
            createNode("Nebraska", 1772124, 47995),
            createNode("North Dakota", 639725, 45140),
            createNode("South Dakota", 796513, 44828)
        ]);
        
        addChildNodes(div_SA, [
            createNode("Delaware", 863832, 57618),
            createNode("District of Columbia", 588433, 56519),
            createNode("Florida", 18222420, 47450),
            createNode("Georgia", 9497667, 49466),
            createNode("Maryland", 5637418, 69475),
            createNode("North Carolina", 9045705, 45069),
            createNode("South Carolina", 4416867, 43572),
            createNode("Virginia", 7721730, 60316),
            createNode("West Virginia", 1811403, 37356)
        ]);
        
        addChildNodes(div_ES, [
            createNode("Alabama", 4633360, 41216),
            createNode("Kentucky", 4252000, 41197),
            createNode("Mississippi", 2922240, 36796),
            createNode("Tennessee", 6158953, 42943)
        ]);
        
        addChildNodes(div_WS, [
            createNode("Arkansas", 2838143, 38542),
            createNode("Louisiana", 4411546, 42167),
            createNode("Oklahoma", 3610073, 41861),
            createNode("Texas", 23819042, 48199)
        ]);
        
        addChildNodes(div_MO, [
            createNode("Arizona", 6324865, 50296),
            createNode("Colorado", 4843211, 56222),
            createNode("Idaho", 1492573, 46183),
            createNode("Montana", 956257, 43089),
            createNode("Nevada", 2545763, 55585),
            createNode("New Mexico", 1964860, 42742),
            createNode("Utah", 2651816, 55642),
            createNode("Wyoming", 523949, 51990) 
        ]);
        
        addChildNodes(div_PA, [
            createNode("Alaska", 683142, 64635),
            createNode("California", 36308527, 60392),
            createNode("Hawaii", 1280241, 64661),
            createNode("Oregon", 3727407, 49033),
            createNode("Washington", 6465755, 56384)
        ]);
        
        self.nodeValues = ko.observableArray([unitedStates]);
        function createNode(label, population, meanIncome) {
            return {label: label,
                    id: label,
                    value: population,
                    color: getColor(meanIncome),
                    shortDesc: "&lt;b&gt;" + label +
                      "&lt;/b&gt;&lt;br/&gt;Population: " + 
                      population+"&lt;br/&gt;Income: " + meanIncome};
        }
        
        function getColor(meanIncome) {
            if (meanIncome < 45000) // 1st quartile
                return handler.getValue('1stQuartile');
            else if (meanIncome < 49000) // 2nd quartile
                return handler.getValue('2ndQuartile');
            else if (meanIncome < 56000) // 3rd quartile
                return handler.getValue('3rdQuartile');
            else
                return handler.getValue('4thQuartile');
        }
        
        function addChildNodes(parent, childNodes) {
            parent.nodes = [];
            for (var i = 0; i < childNodes.length; i++) {
                parent.nodes.push(childNodes[i]);
            }
        }
    }

    /*
     * Returns a constructor for the ViewModel so that the ViewModel is constructed
     * each time the view is displayed.  Return an instance of the ViewModel if
     * only one instance of the ViewModel is needed.
     */
    return new IncidentsViewModel();
  }
);
