var gwSite = angular.module('gwSite', ['ui.router']);

gwSite.config(function($stateProvider, $urlRouterProvider){
	
	//$urlRouterProvider.otherwise('/404');
	$urlRouterProvider.otherwise('/');

	$stateProvider
	.state('home', {
		url: '/',
		views: {
			"top": {
				template: ""
			},
			"header": {
				templateUrl: "templates/header.html"
			},
			"container": {
				templateUrl: "templates/comic-view.html",
				controller: "HomePageCtrl"
			},
			"footer": {
				templateUrl: "templates/footer.html"
			}
		}
	})
	.state('comicarchive', {
		url: '/comics/:comic',
		views: {
			"top": {
				template: ""
			},
			"header": {
				templateUrl: "templates/header.html"
			},
			"container": {
				templateUrl: "templates/comic-detail.html",
				controller: "ComicDetailCtrl"
			},
			"footer": {
				templateUrl: "templates/footer.html"
			}
		}
	})
	.state('comicpage', {
		url: '/comics/:comic/:page',
		views: {
			"top": {
				template: ""
			},
			"header": {
				templateUrl: "templates/header.html"
			},
			"container": {
				templateUrl: "templates/comic-view.html",
				controller: "ComicViewCtrl"
			},
			"footer": {
				templateUrl: "templates/footer.html"
			}
		}
	});
});

// Retrieves the appropriate json comic chapter list based on state parameters
gwSite.controller('ComicDetailCtrl', function ($scope, $stateParams, $http){
	$scope.comic = $stateParams.comic;

	var urlStr = 'json/' + $scope.comic + 'Chapters.json';

	$http.get(urlStr).success(function(data) {
		$scope.chapters = data;
	});
});

gwSite.controller('HomePageCtrl', function ($scope, $stateParams, $http){
	$scope.comic = 'monomyth';

	var urlStr = 'json/' + $scope.comic + '.json';

	$http.get(urlStr).success(function(data) {
		// The last page should be equal to the number of objects in the data array
		$scope.lastPage = data.length;

		$scope.page = $scope.lastPage;

		var pageInt = parseInt($scope.page);

		

		var thisPage = data[pageInt-1];

		$scope.year = thisPage.year;
		$scope.month = thisPage.month;
		$scope.monthStr = monthConvert($scope.month);
		$scope.day = thisPage.day;
		$scope.authors = thisPage.authors;

		// Unless the current page is the first, the previous page will be the current page-1
		if (pageInt == 1) {
			$scope.prevPage = 1;
		} else {
			$scope.prevPage = pageInt - 1;
		}

		// The last page should be equal to the number of objects in the data array
		//$scope.lastPage = data.length;

		// Unless the current page is the last, the next page will be the current page+1
		if (pageInt == parseInt($scope.lastPage)) {
			$scope.nextPage = $scope.lastPage;
		} else {
			$scope.nextPage = pageInt + 1;
		}
	});
});

gwSite.controller('ComicViewCtrl', function ($scope, $stateParams, $http){
	$scope.comic = $stateParams.comic;
	$scope.page = $stateParams.page;

	var urlStr = 'json/' + $scope.comic + '.json';

	$http.get(urlStr).success(function(data) {
		var pageInt = parseInt($scope.page);

		var thisPage = data[pageInt-1];

		$scope.year = thisPage.year;
		$scope.month = thisPage.month;
		$scope.monthStr = monthConvert($scope.month);
		$scope.day = thisPage.day;
		$scope.authors = thisPage.authors;

		// Unless the current page is the first, the previous page will be the current page-1
		if (pageInt == 1) {
			$scope.prevPage = 1;
		} else {
			$scope.prevPage = pageInt - 1;
		}

		// The last page should be equal to the number of objects in the data array
		$scope.lastPage = data.length;

		// Unless the current page is the last, the next page will be the current page+1
		if (pageInt == parseInt($scope.lastPage)) {
			$scope.nextPage = $scope.lastPage;
		} else {
			$scope.nextPage = pageInt + 1;
		}
	});
});

// Converts an integer to the appropriate month 
function monthConvert(mInt) {

	var mStr = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December"
	];

	if ((mInt < 1) || (mInt > 12)) {
		return "N/A";
	} else {
		return mStr[mInt-1];
	}
}