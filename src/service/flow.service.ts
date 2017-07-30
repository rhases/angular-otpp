import { Flow } from '../components/flow/flow';


export class FlowService {

  current:string;
  flow:Flow;
  scope:any;

  /*@ngInject*/
  constructor(flow:Flow, scope:any) {
    this.flow = flow;
    this.scope = scope;
  }

  start():string {
    return this.nextFromCurrentKey("start");
  }

  next():string {
    return this.nextFromCurrentKey(this.current);
  }

  nextFromCurrentKey(currentKey:string):string {
    var nextArr = this.flow.transitions
    .filter((transition) => {
      return (transition.from === currentKey)
    })
    .filter((transition) => {
      if(!transition.condition){
        return true;
      } else {
        return this.evaluate(this.scope, transition.condition)
      }
    })

    if(nextArr.length === 0 ){
      throw Error('no destination state found from "' + currentKey +'" state' );
    }
    if(nextArr.length > 1 ){
      throw Error('more then one destination state found from "' + currentKey +'" state' );
    }
    this.current = nextArr[0].to;
    return this.current;
  }

  go(state:string):string{
    this.current = state;
    return state;
  }

  evaluate(scope, condition):boolean{
    var result:boolean = false;
    try {
      result = function(scope){
        result =  eval('(' + condition + ')');
        return result;
      }(this.scope);
    }catch(err){
      console.log('undefined variable when evaluating condition')
    }
    return result;
  }

}
