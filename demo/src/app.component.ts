const angular = require('angular');

import { Thing }  from 'angular-otpp';
import { Flow }  from 'angular-otpp';

export class MainController {
  $http;

  flow: Flow = {
    id:"mockFlow",
    version: "1",
    transitions: [{
      from:"start",
      to:'state-1',
      condition:undefined
    },{
      from:"state-1",
      to:'state-2',
      condition:undefined
    },{
      from:"state-2",
      to:'state-3',
      condition: 'scope.exampleStateVarNumber == 3'
    },{
      from:"state-2",
      to:'state-4',
      condition: 'scope.exampleStateVarNumber == 4'
    }]
  };

  things:Thing[] = [
    {
      key: 'state-1',
      title: 'Hello Wold!',
      fields: [ {
        key: 'business',
        type: 'radio',
        templateOptions: {
          label: 'Possui empresa ou MEI com CNPJ?',
          options: [ { 'name': 'Sim', 'value': 'y' }, { 'name': 'Não', 'value': 'n' } ]
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
  constructor($http) {
    this.$http = $http;

  }

  // $onInit() {
  //   this.$http.get('/api/things').then(response => {
  //     this.awesomeThings = response.data;
  //   });
  //}
  // addThing() {
  //   if (this.newThing) {
  //     this.$http.post('/api/things', { name: this.newThing });
  //     this.newThing = '';
  //   }
  // }
  //
  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  // }
}
