import { Transition } from '../components/transition';
import { Thing } from '../components/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;
  $state: any;

  static $inject = ['$state'];
  constructor($state) {
    this.$state = $state;
  }

  load(transitions, things, model, state) {
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
    var nextThing = this.executionService.next();
    this.$state.go(this.$state.current.name, { state: nextThing.key })
  }


}
