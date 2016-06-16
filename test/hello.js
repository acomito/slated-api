/*-----------------------------------------------------------------------
					PARENT DESCRIBE BLOCK
-----------------------------------------------------------------------*/
describe('Testing everything....', function () {


/*--------- CHILD DESCRIBE BLOCK #1: TypeAheadController Controller -----------*/
	
	describe('Testing the TypeAheadController Controller', function () {

	// SETUP FOR THIS DESCRIBE BLOCK #1

		// 1. instantiate variables
		var TypeAheadController, $scope, $rootScopex;

		// 2.instantiate the angular app before each 'it' block
	  	beforeEach(module('app'));

	  	beforeEach(inject(function ($rootScope) {
  			rootScope = $rootScope;
  			scope = $rootScope.$new();
		}));

	  	// 3. instantiate the angular app before each 'it' block
	  	beforeEach(inject(function ($controller) {
		    $controller('TypeAheadController', {
		      $scope: scope
		    });
		}));




	// TESTS FOR DESCRIBE BLOCK #1
																			
		it('When TypeAheadController is instantiated, $scope.searching should be false', function () {  	   	
		   	expect(scope.searching).to.be.false;
		});

		it('When TypeAheadController is instantiated, $scope.noSearchResults should be false', function () {  
		   	expect(scope.noSearchResults).to.be.false;
		});
																					
		it('When TypeAheadController is instantiated, $scope.items should be type array', function () {  
		   	expect(scope.items).to.be.a('array');
		   	expect(scope.items).to.be.instanceof(Array);
		});
																						
		it('When TypeAheadController is instantiated, $scope.items should be an empty array', function () {  
		   expect(scope.items).to.be.empty;
		});
																				



	});


/*--------- CHILD DESCRIBE BLOCK #2: [insert note here] -----------*/


});






/**/