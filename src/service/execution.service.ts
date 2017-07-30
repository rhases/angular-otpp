import { Flow } from '../components/flow/flow';
import { Thing } from '../components/thing';

import { FlowService } from './flow.service';
import * as _ from 'lodash';

export class ExecutionService {

  current:Thing;
  thingsMap:{ [key:string]:Thing; };
  things: Thing[];
  flow:Flow;
  scope:any;
  flowService:FlowService;

  /*@ngInject*/
  constructor(flow:Flow, things:Thing[], scope:any) {
    this.flow = flow;
    this.scope = scope;
    this.things = things;
    this.createMap(things);
    this.flowService = new FlowService(flow, scope);
  }

  createMap(things:Thing[]){
    this.thingsMap = { "start": new Thing()};
    things.forEach((thing) => {
      if(this.thingsMap[thing.key]){
        throw Error('Error inializing otpp execution. Multiple things with the same key')
      }
      this.thingsMap[thing.key] = thing;
    })
  }

  start():Thing {
    var state:string = this.flowService.start();
    return this.getThing(state);
  }

  next():Thing {
    var state = this.flowService.next();
    return this.getThing(state);
  }

  go(state:string):Thing{
    this.flowService.go( state );
    return this.getThing(state);
  }

  getCurrent():Thing{
    return this.getThing(this.flowService.current);
  }

  private getThing(state):Thing{
    var thing:Thing  = this.thingsMap[state];
    if(!thing) throw Error('OTPP: no "Thing" found for state "'+ state + '"');
    return thing;
  }
}
