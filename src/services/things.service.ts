import { Transition } from '../model/transition';
import { Thing } from '../model/thing';

import { ExecutionService } from './execution.service';

import * as _ from 'lodash';

export class ThingsService {

  executionService: ExecutionService;

  onFinish: Function;
  onFinishThing: Function;

  previousStates =[];

  /*@ngInject*/
  constructor(private $state, private $stateParams, private FormAnswerService) { }

  load(transitions, things, actualThingKey, onStart, onStartThing, onFinish, onFinishThing) {
    this.onFinish = onFinish;
    this.onFinishThing = onFinishThing;
    
    this.executionService = new ExecutionService(transitions, things, this.FormAnswerService.get());
    
    if (actualThingKey) {
      this.executionService.go(actualThingKey);
    } else {
      actualThingKey = this.executionService.start();

      // Tell to controller that is started
      if (onStart) {
        onStart({ model: this.FormAnswerService.get() });
      }
    }
    var current = this.executionService.getCurrent();
    this.addToStatesStack(current.key);
    //onStartThingnpm
    if (onStartThing) {
      onStartThing({ thing: current, model: this.FormAnswerService.get() });
    }
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

  back() {
    let actual = this.previousStates.pop();
    let previous = this.previousStates.pop();
    if (!previous){
      previous = 'wellcome';
    }
    var stateParams = _.merge(this.$stateParams, { thingKey: previous })
    this.$state.go(this.$state.current.name, stateParams);
  }

  addToStatesStack(state){
    let peek = this.previousStates[this.previousStates.length - 1];
    if (peek == state){
      return;
    } 
    this.previousStates.push(state); 
  }

}
