import { Transition } from '../model/transition';
import { Thing } from '../model/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;

  onFinish: Function;
  onFinishThing: Function;

  /*@ngInject*/
  constructor(private $state, private $stateParams, private FormAnswerService) { }

  load(transitions, things, actualThingKey, onFinish, onFinishThing) {
    this.executionService = new ExecutionService(transitions, things, this.FormAnswerService.get());
    if (actualThingKey) {
      this.executionService.go(actualThingKey);
    } else {
      this.executionService.start();
    }

    this.onFinish = onFinish;
    this.onFinishThing = onFinishThing;
  }

  getCurrentThing() {
    return this.executionService.getCurrent();
  }

  next() {
    var current = this.executionService.getCurrent();
    if (this.onFinishThing) {
      this.onFinishThing({ thing: current, model: this.FormAnswerService.get() });
    }

    var nextThing = this.executionService.next();

    if (!nextThing) {
      // Tell to controller that is finished
      if (this.onFinish) {
        this.onFinish({ model: this.FormAnswerService.get() });
      }
    } else {
      var stateParams = _.merge(this.$stateParams, { thingKey: nextThing.key })
      this.$state.go(this.$state.current.name, stateParams);
    }

  }

}
