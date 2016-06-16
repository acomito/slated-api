var SlatedAutocomplete = angular.module('app', []);

SlatedAutocomplete.controller('TypeAheadController', function($scope, slatedAPI){

	$scope.searching = false;
	$scope.items = []; 
	$scope.noSearchResults = false;

	$scope.$watch('name', 
	  	function() {

			// 1. if the search input is empty (i.e. if "$scope.name" equals "undefined"), stop this $watch function from running 
			if ($scope.name == undefined) {
				return
			}
	 		// 2. empty "cache" of the old $http/slatedAPI service call
	  		$scope.items=[]; 
			// 3. set johnny to axeing true (i.e. set searching to true) and set noSearchResults to false
	  		$scope.searching = true;
	  		// when first initialized, this is false. But after a unsuccessful search it will be true. So we have to ensure it gets set back to false when $watch fires and new search starts
	  		$scope.noSearchResults = false; 

	  		// 4. use the input field's model (held in $scope.name), to create the slated API query
	    	var url = 'http://www.slated.com/films/autocomplete/profiles/?term=' + $scope.name +'&callback=JSON_CALLBACK';

			// 5. call the slatedAPI angular service, which $http calls the slated API. This $http functionality is put in a service for easier testing (makes mocking data for testing this controller easier).
			slatedAPI.get(url).then(function(data){
				//6. if data (i.e. the $http response) is empty, (a) set '$scope.searching' to false, (b) set '$scope.noSearchResults' to true, and (c) exit this $watch function
				if (data.length == 0){
					$scope.searching = false;	
					$scope.noSearchResults = true;
					return;
				}
					//7. store the returned data into a variable called items
					$scope.items = data;
					//8. set johnny to axeing false (set searching to false)
					$scope.searching = false;	
			});
	  	}, true);

	
	$scope.onItemSelected=function(){
		console.log('selected='+this.name);
	}


});






SlatedAutocomplete.directive('typeahead', function($timeout, $sce, slatedAPI) {
  return {
    restrict: 'AEC',
    scope: {
    	// setup variables for the SlatedAutocomplete directive/component
		items: '=',
		searching: '=',
		noSearchResults: '=',
		prompt:'@',
		title: '@',
		link: '@',
		description:'@',
		img:'=',
		model: '=',
		onSelect:'&',
	},
	link:function(scope,elem,attrs){
		// FOR: handling the "selected item" a.k.a registering selection when user selects something from autocomplete dropdown
	   scope.handleSelection=function(selectedItem){
		 scope.model=selectedItem;
		 scope.current=0;
		 scope.selected=true;        
		 $timeout(function(){
			 scope.onSelect();
		  },200);
	  };
	  // FOR: setting the API response (which is a <img> tag in a string) to be injected as HTML... Note: usually a security concern unless from a trusted source
	  scope.formatHTML=function(imgString){
			return $sce.trustAsHtml(imgString);
		}

	  scope.selected=true;

	  // FOR: indexing
	  scope.isCurrent=function(item){
		 return scope.current==item;
	  };
	  scope.setCurrent=function(item){
		 scope.current=item;
	  };

	},
    templateUrl: 'search-template.html'
  }
});

// basic factory which gets called by the controller. Factory handles the $http call to Slated API. Decoupling this from the controller makes for easier testing.
SlatedAutocomplete.factory('slatedAPI', function($http) {
  return {
    get: function(url) {
      return $http.jsonp(url).then(function(resp){
      	       return resp.data;
      });
    }
  };
});




