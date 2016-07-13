var mainForm = angular.module('mainForm', ['ui.bootstrap']);

mainForm.controller('GlobalLoggingLevelController', ['$scope', function($scope){
	$scope.loggingLevelsData = {
  		loggingLevelOptions: [
			{value: 'error', label: 'Error'},
			{value: 'warn', label: 'Warn'},
			{value: 'info', label: 'Info'},
			{value: 'debug', label: 'Debug'}
		],
		selectedLoggingLevel: {value: 'warn', label: 'Warn'}
  	 };
}]);

mainForm.controller('AddServiceController', ['$scope', function($scope){
	$scope.serviceData = {
		serviceRepeatSelect: null,
  		serviceOptions: [
			{value: 'scaleio', label: 'EMC ScaleIO'},
			{value: 'isilon', label: 'EMC Isilon'},
			{value: 'virtualbox', label: 'Oracle VirtualBox'}
		]
  	 };
}]);

mainForm.controller('AddServiceButtonController', ['$scope', '$rootScope', function($scope, $rootScope){
	  	$rootScope.services = [];
  
		$scope.addNewService = function() {
			if ($scope.services.length >= 1){
				alert('Only 1 Service Supported At This Time.');
			} else {
				var serviceType = $scope.$parent.serviceData.serviceRepeatSelect
				if ( serviceType !== null) {
					var newServiceNo = $scope.services.length+1;
					if (serviceType == 'scaleio'){
						$scope.services.push({
							"id":newServiceNo,
							"type": serviceType,
							"insecure" : true,
							"thinOrThick" : "ThinProvisioned"
						});
					} else if (serviceType == 'isilon'){
						$scope.services.push({
							"id":newServiceNo,
							"type": serviceType
						});
					} else if (serviceType == 'virtualbox'){
						$scope.services.push({
							"id":newServiceNo,
							"type": serviceType,
							"endpoint": "http://127.0.0.1:18083",
							"tls": false,
							"volumePath": "$HOME/VirtualBox/Volumes",
							"controllerName": "SATA"
						});
					} 
				}
			}
		};
		
		/* NOT USED YET
		$scope.removeService = function() {
			var lastItem = $scope.choices.length-1;
			$scope.choices.splice(lastItem);
		};
		*/
}]);

mainForm.filter('kvFilter', function(){
	return function (objects){
		var allKeys = []
		angular.forEach(objects, function (value, key) {
				allKeys.push(key);
            })
		return allKeys;
	};
});

mainForm.filter('emptyKvFilter', function(){
  	return function (objects){
  		var filteredObject = {};
  		angular.forEach(objects, function (value, key) {
  			if (value) filteredObject[key] = value;
  		});
  		return filteredObject;
  	};
});

mainForm.filter('noLogging', function(){
	return function (arrays){
		var allKeysArray = [];
		angular.forEach(arrays, function (x) {
			if (x.substring(0, 4) == "libS" && x != 'libSmainLoggingLevel') {
				allKeysArray.push(x);
			}
		})
		return allKeysArray;
	};
});

mainForm.filter('multiStringFilter', function(){
	return function (input, searchText, AND_OR) {
        var returnArray = [],
            // Split on single or multi space
            splitext = searchText.toLowerCase().split(/\s+/),
            // Build Regexp with Logical AND using "look ahead assertions"
            regexp_and = "(?=.*" + splitext.join(")(?=.*") + ")",
            // Build Regexp with logicial OR
            regexp_or = searchText.toLowerCase().replace(/\s+/g, "|"),
            // Compile the regular expression
            re = new RegExp((AND_OR == "AND") ? regexp_and : regexp_or, "i");

        for (var x = 0; x < input.length; x++) {
            if (re.test(input[x])) returnArray.push(input[x]);
        }
        /* View what the 2 regular expression look like
        console.log(regexp_or);
        console.log(regexp_and);*/
        return returnArray;
    }
})

mainForm.directive('yamlConfiguration', function(){
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		 scope: true, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE',
		//template: 'My services: {{services}}<br>My Logging Level: {{loggingLevelsData.selectedLoggingLevel.value}} </br>',
		 templateUrl: 'output/yaml.html',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($rootScope, $scope, iElm, iAttrs, controller) {
			//console.log($rootScope);
		}
	};
});

$(document).ready(function(){
	$("#output").sticky({topSpacing:100});
});
