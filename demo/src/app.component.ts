const angular = require('angular');

import { Thing }  from 'angular-otpp';
import { Transition }  from 'angular-otpp';

export class MainController {

  transitions: Transition[] = [
    {
      from: "start",
      to: 'state-1',
      condition: undefined
    }, {
      from: "state-1",
      to: 'state-2',
      condition: undefined
    }, {
      from: "state-2",
      to: 'state-3',
      condition: 'scope.exampleStateVarNumber == 3'
    }, {
      from: "state-2",
      to: 'state-4',
      condition: 'scope.exampleStateVarNumber == 4'
    }
  ];

  things: Thing[] = [
    {
      key: 'state-1',
      title: 'Hello Wold!',
      fields: [{
        key: 'business',
        type: 'radio',
        templateOptions: {
          label: 'Possui empresa ou MEI com CNPJ?',
          options: [{ 'name': 'Sim', 'value': 'y' }, { 'name': 'Não', 'value': 'n' }]
        }
      }]
    },
    {
      key: 'state-2',
      title: '',
      fields: []
    },
    {
      key: 'state-3',
      title: '',
      fields: []
    },
    {
      key: 'state-4',
      title: '',
      fields: []
    }
  ];


  /*@ngInject*/
  constructor() {}
}
