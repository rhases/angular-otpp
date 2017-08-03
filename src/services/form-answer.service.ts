import * as _ from 'lodash';

export class FormAnswerService {

  formAnswer: any = {};

  scope: any;
  propName: string;

  start(scope: any, propName: string) {
    this.scope = scope;
    this.propName = propName;

    this.scope[this.propName] = _.merge(this.scope[this.propName], this.formAnswer);
  }

  get(): any {
    return this.scope[this.propName];
  }

  add(oneThingAnswer: any) {
    this.formAnswer = _.merge(this.formAnswer, oneThingAnswer);
    this.scope[this.propName] = _.merge(this.scope[this.propName], this.formAnswer);
  }

}
