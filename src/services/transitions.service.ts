import { Transition } from '../model/transition';


export class TransitionsService {

  current: string;
  transitions: Transition[];
  scope: any;

  /*@ngInject*/
  constructor(transitions: Transition[], scope: any) {
    this.transitions = transitions;
    this.scope = scope;
  }

  getStartThing(): string {
    return this.nextThingKeyFromCurrentKey("start");
  }

  getNextThing(): string {
    return this.nextThingKeyFromCurrentKey(this.current);
  }


  nextThingKeyFromCurrentKey(currentKey: string): string {
    this.current = this.nextThingFromCurrentKey(currentKey).to;
    return this.current;
  }

  nextThingFromCurrentKey(currentKey: string): Transition {
    var nextArr = this.transitions
      .filter((transition) => {
        return (transition.from === currentKey)
      })
      .filter((transition) => {
        if (!transition.condition) {
          return true;
        } else {
          return this.evaluate(this.scope, transition.condition)
        }
      })

    if (nextArr.length === 0) {
      throw Error('no destination state found from "' + currentKey + '" state');
    }
    if (nextArr.length > 1) {
      throw Error('more then one destination state found from "' + currentKey + '" state');
    }
    let currentThing = nextArr[0];
    if (!!currentThing.skip 
        && this.evaluate(this.scope, currentThing.skip)){
      return this.nextThingFromCurrentKey(currentThing.to);
    } else {
      return currentThing;
    }
  }

  go(thingKey: string): string {
    this.current = thingKey;
    return thingKey;
  }

  evaluate(scope, condition): boolean {
    var result: boolean = false;
    try {
      result = function(scope) {
        result = eval('(' + condition + ')');
        return result;
      } (this.scope);
    } catch (err) {
      console.log('undefined variable when evaluating condition')
    }
    return result;
  }

}
