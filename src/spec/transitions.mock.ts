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
  },
  {
    from: "state-4",
    to: 'state-5',
    skip: 'true'
  },
  {
    from: "state-5",
    to: 'state-6',
    skip: 'false'
  },
  {
    from: "state-6",
    to: 'state-7',
    skip: 'false'
  }]
