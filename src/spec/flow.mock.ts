'use strict';

export default  {
  id:"mockFlow",
  version: "1",
  transitions: [{
    from:"start",
    to:'state-1',
    condition: undefined
  },{
    from:"state-1",
    to:'state-2',
    condition: undefined
  },{
    from:"state-2",
    to:'state-3',
    condition: 'scope.exampleStateVarNumber == 3'
  },{
    from:"state-2",
    to:'state-4',
    condition: 'scope.exampleStateVarNumber == 4'
  }]
}
