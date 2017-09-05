const angular = require('angular');

import PizzaForm  from './pizza.form';

export class MainController {

  formAnswer: any = { oldProperty: 'from controller' };
  form: any = PizzaForm;

  /*@ngInject*/
  constructor(private $window) {
  }

  start() {
    console.log("Start the form");
  }

  finish() {
    this.$window.alert("Seu pedido já está sendo processado!!!");
  }

  startThing(thing, model) {
    console.log("Start the thing " + thing.key, thing);
  }

  finishThing(thing, model) {
    console.log("Finish the thing " + thing.key, thing);
    console.log("The model now is:", model);
  }
}
