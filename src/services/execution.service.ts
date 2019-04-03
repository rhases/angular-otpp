import { Transition } from '../model/transition';
import { Thing } from '../model/thing';

import { TransitionsService } from './transitions.service';
import * as _ from 'lodash';

export class ExecutionService {

  current: Thing;
  thingsMap: { [key: string]: Thing; };
  things: Thing[];
  transitions: Transition[];
  scope: any;
  transitionService: TransitionsService;

  /*@ngInject*/
  constructor(transitions: Transition[], things: Thing[], scope: any) {
    this.transitions = transitions;
    this.scope = scope;
    this.things = things;
    this.createMap(things);
    this.transitionService = new TransitionsService(transitions, scope);
  }

  createMap(things: Thing[]) {
    let self = this;
    let start = things.find(thing =>  thing && thing.key === 'start');
    if(!start) {
      self.thingsMap = { "start": new Thing() };
    } else {
      self.thingsMap = { };
    }
    things.forEach((thing) => {
      if (self.thingsMap[thing.key]) {
        throw Error('Error inializing otpp execution. Multiple things with the same key')
      }
      self.thingsMap[thing.key] = thing;
    })
  }

  start(): Thing {
    var state: string = this.transitionService.getStartThing();
    return this.getThing(state);
  }

  next(): Thing {
    var state = this.transitionService.getNextThing();

    if (state == 'end')
      return undefined;

    return this.getThing(state);
  }

  go(actualThingKey: string): Thing {
    this.transitionService.go(actualThingKey);
    return this.getThing(actualThingKey);
  }

  pathTo(target){
    const transitionService = new TransitionsService(this.transitions, this.scope);
    const stepsLimit = 30;
    
    var state: string = transitionService.getStartThing();
    var states = [state];
    while(state != target && state != 'end' && stepsLimit > 0){
      state = transitionService.getNextThing()
      states.push(state);
    }
    if(state != target){
      // did not found a path
      return [];
    }
    return states;
  }
  

  getCurrent(): Thing {
    return this.getThing(this.transitionService.current);
  }

  private getThing(state): Thing {
    var thing: Thing = this.thingsMap[state];
    if (!thing) throw Error('OTPP: no "Thing" found for state "' + state + '"');
    return thing;
  }
}
