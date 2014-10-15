angular
	.module('status', [])
	.service('statusService', [function () {
		/*this.statuses = [];
		this.setStatus = function (statusName, position) {
			var status;
			for (var i; i < this.statuses.length; i++) {
				if (this.statuses[i].name == statusName) {
					status = this.statuses[i];
						if (position == false) {
							this.statuses.splice(i, 1);
						}
					break;
				}
			}
			if (position == true && !status) {
				this.statuses.push({name:statusName});
			}
		}*/

		this.statuses = {};
		this.setStatus = function (statusName, flag) {
			if (flag && !this.statuses[statusName]) {
				this.statuses[statusName] = {name:statusName};
			} else if (!flag && this.statuses[statusName]) {
				delete this.statuses[statusName];
			}
		}
	}])
	.controller('statusController', ['$scope', 'statusService', function ($scope, statusService) {
		$scope.statuses = statusService.statuses;
	}])