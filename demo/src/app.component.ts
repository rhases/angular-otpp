const angular = require('angular');

import { Thing }  from 'angular-otpp';
import { Transition }  from 'angular-otpp';
import PizzaForm  from './pizza.form';

export class MainController {

  formAnswer: any;
  form: any = PizzaForm;

  /*@ngInject*/
  constructor(FormAnswerService, private $window) {
    this.formAnswer = FormAnswerService.get();
  }

  finish() {
    this.$window.alert("Seu pedido já está sendo processado!!!");
  }
}
