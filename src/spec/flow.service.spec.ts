'use strict';

import { FlowService } from '../service/flow.service';
import mockFlow  from './flow.mock';

describe('OTPP: FlowService', function() {

  // load the directive's module and view
  // beforeEach();
  //
  var flowService:FlowService;
  var scope : any;

  beforeEach(function(){
    this.scope = {}
    this.flowService = new FlowService(mockFlow,  this.scope );
    this.flowService.start();
  });

  it('should it begin at a from "start" state', function() {
    expect(this.flowService.current).toEqual("state-1");

  });

  it('should it transit to the next state if has no condition', function() {
    expect(this.flowService.next()).toEqual("state-2");
    expect(this.flowService.current).toEqual("state-2");
  });

  it('should it fork evaluating a condition', function() {
    this.flowService.go("state-2"); //
    this.scope.exampleStateVarNumber = 3;
    this.flowService.next();
    expect(this.flowService.current).toEqual("state-3");

    this.flowService.go("state-2"); //
    this.scope.exampleStateVarNumber = 4;
    this.flowService.next();
    expect(this.flowService.current).toEqual("state-4");
  });

  // it('should it fork evaluating a condition', function() {
  //   this.flowService.next() //
  //   expect(this.flowService.next()).toEqual("state-2");
  //   expect(this.flowService.current).toEqual("state-2");
  // });



});
