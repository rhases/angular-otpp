import * as _ from 'lodash';

export class FormAnswerService {

  formAnswer: any = {};

  scope: any;
  propName: string;

  start(scope: any, propName: string) {
    this.scope = scope;
    this.propName = propName;

    //this.scope[this.propName] = _.merge(this.scope[this.propName], this.formAnswer);
  }

  get(): any {
    return this.scope[this.propName];
  }

  add(oneThingAnswer: any) {
    function mergeUsingSourceArray(objValue, srcValue) {
      if (_.isArray(objValue)) {
        return srcValue;
      }
    }
    //this.formAnswer = _.mergeWith(this.formAnswer, oneThingAnswer, mergeUsingSourceArray);
    //this.scope[this.propName] = _.mergeWith(this.scope[this.propName], this.formAnswer, mergeUsingSourceArray);
    this.scope[this.propName] = oneThingAnswer;
  }
}
