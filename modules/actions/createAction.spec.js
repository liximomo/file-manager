import { createAction, unFlat } from './createAction';
import { expect } from 'chai';

describe('createAction("ACTION", unFlat(a, b, c))', function() {

  it('return the right actionCreator', function() {
    var action = createAction('ACTION', unFlat('a', 'b', 'c'));
    expect(action(1,2,3)).to.deep.equal({ type: 'ACTION', payload: { a: 1, b: 2, c: 3 } });
  });
});