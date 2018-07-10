'use strict';

import { TransitionsService } from '../services/transitions.service';
import mockTransitions  from './transitions.mock';

describe('OTPP: TransitionsService', function() {

  // load the directive's module and view
  // beforeEach();
  //
  var transitionsService:TransitionsService;
  var scope : any;

  beforeEach(function(){
    this.scope = {}
    this.transitionsService = new TransitionsService(mockTransitions,  this.scope );
    this.transitionsService.getStartThing();
  });

  it('should it begin at a from "start" state', function() {
    expect(this.transitionsService.current).toEqual("state-1");

  });

  it('should it transit to the next state if has no condition', function() {
    expect(this.transitionsService.getNextThing()).toEqual("state-2");
    expect(this.transitionsService.current).toEqual("state-2");
  });

  it('should it fork evaluating a condition', function() {
    this.transitionsService.go("state-2"); //
    this.scope.exampleStateVarNumber = 3;
    this.transitionsService.getNextThing();
    expect(this.transitionsService.current).toEqual("state-3");

    this.transitionsService.go("state-2"); //
    this.scope.exampleStateVarNumber = 4;
    this.transitionsService.getNextThing();
    expect(this.transitionsService.current).toEqual("state-4");
  });

  it('should it skip if evaluating a skip to true', function () {
    this.transitionsService.go("state-4"); //
    this.transitionsService.getNextThing();
    expect(this.transitionsService.current).toEqual("state-6");
  });

});
