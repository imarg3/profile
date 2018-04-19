// It is better to wrap Javascript in a closure
(function(){
	
	var app = angular.module('ProfileApp', [])
	
	// Controllers are where we define our app's behaviour by defining functions and values
	app.controller("TabsController", ['$scope', function($scope){
		/* $scope.tabs = [{
			title : 'About',
			url : 'angular.tab.one'
		},
		{
			title : 'Experience',
			url : 'angular.tab.two'
		},
		{
			title : 'Education',
			url : 'angular.tab.three'
		},
		{
			title : 'Skills',
			url : 'angular.tab.four'
		},
		{
			title : 'MyProjects',
			url : 'angular.tab.five'
		},
		{
			title : 'Contact',
			url : 'angular.tab.six'
		}];
					
		$scope.currentTab = 'angular.tab.one';
		
		$scope.onClickTab = function(tab){
			$scope.currentTab = tab.url;
		}
		
		$scope.isActiveTab = function(tabUrl){
			return tabUrl == $scope.currentTab;
		}
		*/
		$scope.tab = 1;

		$scope.setTab = function(newTab){
			$scope.tab = newTab;
		};

		$scope.isSet = function(tabNum){
			return $scope.tab === tabNum;
		};
		
	}]);
	
	app.controller('menuController', function(){
              this.menu = tabs; // menu is the property
    });
	
	// Arrays
       var tabs = {
                       tab1 : 'About',
                       tab2 : 'Experience',
                       tab3 : 'Education',
                       tab4 : 'Skills',
                       tab5 : 'Projects',
                       tab6 : 'Contact',
                       tab7 : 'My Blogs'                      
       }
})();