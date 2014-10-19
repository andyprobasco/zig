angular
	.module('zigApp')
	.directive("tooltip", function () {
    return {
        link: function (scope, element, attrs) {

            angular.element(element).on("mouseover", function () {
                angular.element(this).append('<span class="tooltip">'+ attrs.tooltip +"</span>");
            });
            
            angular.element(element).on("mouseout", function () {
                angular.element(this.querySelector(".tooltip")).remove();
            });
            
            scope.$on("$destroy", function () {
                angular.element(element).off("mouseover");
                angular.element(element).off("mouseout");                
            });
        }
    };
});