'use strict';

export default [{
    from: "start",
    to: 'state-1'
  },
  {
    from: "state-1",
    to: 'state-2'
  },
  {
    from: "state-2",
    to: 'state-3',
    condition: 'scope.exampleStateVarNumber == 3'
  },
  {
    from: "state-2",
    to: 'state-4',
    condition: 'scope.exampleStateVarNumber == 4'
  }]
