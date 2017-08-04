import { Transition } from '../model/transition';
import { Thing } from '../model/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;

  onFinish: Function;

  /*@ngInject*/
  constructor(private $state, private FormAnswerService) { }

  load(transitions, things, state, onFinish) {
    this.executionService = new ExecutionService(transitions, things, this.FormAnswerService.get());
    if (state) {
      this.executionService.go(state);
    } else {
      this.executionService.start();
    }

    this.onFinish = onFinish;
  }

  getCurrentThing() {
    return this.executionService.getCurrent();
  }

  next() {
    var current = this.executionService.getCurrent();

    this.FormAnswerService.add(current.scope);

    var nextThing = this.executionService.next();

    if (!nextThing) {
      // Tell to controller that is finished
      if (this.onFinish) {
        this.onFinish(this.FormAnswerService.get());
      }
    } else {
      this.$state.go(this.$state.current.name, { state: nextThing.key })
    }

  }

}
