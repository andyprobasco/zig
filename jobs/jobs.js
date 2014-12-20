angular
	.module('jobs', [])
	.service('jobService', [function(){

	}])
	.factory('jobFactory', ['survivorService', function(survivorService){
		var Job = function (params) {
			this.name = params.name || 'Job';
			this.currentWorkers = params.currentWorkers || 0;
			this.addWorker = addWorker;
			this.removeWorker = removeWorker;
			this.tick = tick;
			this.progress = params.progress || 0;
			this.progressNeeded = params.progressNeeded || 10;
			this.onComplete = function () {};
		}

		//var defaultJob = new Job({name:'Idle Survivors', currentWorkers:10});

		function tick() {
			this.progress += this.currentWorkers;
			if (this.progress > this.progressNeeded) {
				this.onComplete();
				this.progress = 0;
			}
		}

		function addWorker(oldJob) {
			if (!oldJob) {
				var oldJob = survivorService.idleSurvivors;
			}
			if (oldJob.currentWorkers >= 1) {
				oldJob.currentWorkers -= 1;
				this.currentWorkers += 1;
			}
		}

		function removeWorker() {
			if (this.currentWorkers > 0) {
				survivorService.idleSurvivors.currentWorkers += 1;
				this.currentWorkers -= 1;
			}
		}

		return {
			getInstance: function (params) {
				return new Job(params);
			},
		}
	}])
