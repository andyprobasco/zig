angular
	.module('jobs', [])
	.service('jobService', [function(){

	}])
	.factory('jobFactory', ['survivorService', function(survivorService){
		var Job = function (params) {
			params = params || {};
			this.name = params.name || 'Job';
			this.currentWorkers = params.currentWorkers || 0;
			this.states = params.states || {};
			if (!this.states["Locked"]) {
				this.states["Locked"] = {
					progressNeeded: 1
				}
			}
			this.checkForUnlock = params.checkForUnlock || function () {};
			this.onWorkerUpdate = function () {};
			this.onTick = function () {};
			this.onComplete = function () {};
			this.changeState = changeState;
			this.addWorker = addWorker;
			this.removeWorker = removeWorker;
			this.tick = tick;

			this.changeState(params.defaultState || "Locked");
		}

		function tick() {
			this.onTick();
			this.progress += this.currentWorkers;
			if (this.progress > this.progressNeeded) {
				this.onComplete();
				this.progress = 0;
			}
			//
			this.checkForUnlock();
			//
		}

		function addWorker(oldJob) {
			if (!oldJob) {
				var oldJob = survivorService.idleSurvivors;
			}
			if (oldJob.currentWorkers >= 1 && this.currentWorkers < this.workerMax) {
				oldJob.currentWorkers -= 1;
				this.currentWorkers += 1;
				this.onWorkerUpdate();
			}
		}

		function removeWorker() {
			if (this.currentWorkers > 0) {
				survivorService.idleSurvivors.currentWorkers += 1;
				this.currentWorkers -= 1;
				this.onWorkerUpdate();
			}
		}

		function changeState (newState) {
			var state = this.states[newState];
			console.log('changing state to ' + newState);
			if (state) {
				clearWorkers.call(this);
				this.state = newState;
				this.onTick = state.onTick || function () {};
				this.onWorkerUpdate = state.onWorkerUpdate || function () {};
				this.onComplete = state.onComplete || function () {};
				this.progressNeeded = state.progressNeeded || 1;
				this.workerMax = state.workerMax || 5;
				this.progress = 0;

				this.onWorkerUpdate();
			} else {
				console.log("invalid state [" + newState + "] specified");
			}
		}

		function clearWorkers () {
			var oldWorkerCount = this.workerCount;
			this.workerCount = 0;
			this.onWorkerUpdate();
			this.workerCount = oldWorkerCount;
		}

		return {
			getInstance: function (params) {
				return new Job(params);
			},
		}
	}])
