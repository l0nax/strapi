import { fromJS } from 'immutable';

const initialState = fromJS({
  selectedFiles: [],
  files: [],
  pagination: {
    _limit: 10,
    _start: 0,
  },
  filters: [],
});

const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_DATA_SUCCEEDED': {
      return state.update('files', () => action.data);
    }
    case 'SET_PARAM': {
      const { name, value } = action.param;

      if (action.param.name === 'filters') {
        return state.updateIn(
          ['filters'],
          filters => filters.push(action.param.value)
        );
      }

      return state.setIn(['pagination', name], value);
    }
    case 'ON_FILE_SELECTION': {
      const { value, id } = action;

      if (value) {
        return state.update('selectedFiles', selectedFiles => {
          return selectedFiles.push(id);
        });
      }
      const index = state.get('selectedFiles').findIndex(item => item === id);

      return state.removeIn(['selectedFiles', index]);
    }
    case 'REMOVE_FILTER': {
      const { filterToRemove } = action;

      return state.removeIn(['filters', filterToRemove]);
    }
    default:
      return state;
  }
};

export default reducer;
export { initialState };
