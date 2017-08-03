import { Transition } from '../components/transition';
import { Thing } from '../components/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;
  $state: any;

  model: any;

  onfinish: Function;

  static $inject = ['$state'];
  constructor($state) {
    this.$state = $state;
  }

  load(transitions, things, model, state, onfinish) {
    this.model = model;
    this.onfinish = onfinish;
    this.executionService = new ExecutionService(transitions, things, model);
    if (state) {
      this.executionService.go(state);
    } else {
      this.executionService.start();
    }
  }

  getCurrentThing() {
    return this.executionService.getCurrent();
  }

  next() {
    var current = this.executionService.getCurrent();

    this.model = _.merge(this.model, current.scope);

    var nextThing = this.executionService.next();

    if (!nextThing) {
      // Tell to controller that is finished
      if (this.onfinish) {
        this.onfinish(this.model);
      }
    } else {
      this.$state.go(this.$state.current.name, { state: nextThing.key })
    }

  }

}
