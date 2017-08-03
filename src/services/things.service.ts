import { Transition } from '../components/transition';
import { Thing } from '../components/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;

  onfinish: Function;

  /*@ngInject*/
  constructor(private $state, private FormAnswerService) { }

  load(transitions, things, state, onfinish) {
    this.executionService = new ExecutionService(transitions, things, this.FormAnswerService.get());
    if (state) {
      this.executionService.go(state);
    } else {
      this.executionService.start();
    }

    this.onfinish = onfinish;
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
      if (this.onfinish) {
        this.onfinish(this.FormAnswerService.get());
      }
    } else {
      this.$state.go(this.$state.current.name, { state: nextThing.key })
    }

  }

}
