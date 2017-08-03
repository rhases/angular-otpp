'use strict';

import { ExecutionService } from '../service/execution.service';
import mockTransitions  from './transitions.mock';
import mockThings  from './things.mock';


describe('OTPP: ExecutionService', function() {

  // load the directive's module and view
  // beforeEach();
  //
  var executionService:ExecutionService;
  var scope : any;

  beforeEach(function(){
    this.scope = {}
    this.executionService = new ExecutionService(mockTransitions, mockThings, this.scope );
    this.executionService.start();
  });

  it('should it begin at a from "start" state', function() {
    expect(this.executionService.getCurrent().key).toEqual("state-1");

  });

  it('should it transit to the next state if has no condition', function() {
    expect(this.executionService.next().key).toEqual("state-2");
    expect(this.executionService.getCurrent().key).toEqual("state-2");
  });

  it('should it fork evaluating a condition', function() {
    this.executionService.go("state-2"); //
    this.scope.exampleStateVarNumber = 3;
    this.executionService.next();
    expect(this.executionService.getCurrent().key).toEqual("state-3");

    this.executionService.go("state-2"); //
    this.scope.exampleStateVarNumber = 4;
    this.executionService.next();
    expect(this.executionService.getCurrent().key).toEqual("state-4");
  });

  // it('should it fork evaluating a condition', function() {
  //   this.transitionsService.next() //
  //   expect(this.transitionsService.next()).toEqual("state-2");
  //   expect(this.transitionsService.current).toEqual("state-2");
  // });



});
