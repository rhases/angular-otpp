const angular = require('angular');

import PizzaForm  from './pizza.form';

export class MainController {

  formAnswer: any = { oldProperty: 'from controller' };
  form: any = PizzaForm;

  /*@ngInject*/
  constructor(private $window) {
  }

  finish() {
    this.$window.alert("Seu pedido já está sendo processado!!!");
  }

  each(thing, model) {
    console.log("Finish the thing" + thing.key, thing);
    console.log("The model now is:", model);
  }
}
