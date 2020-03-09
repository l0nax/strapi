import React, { useReducer, useEffect } from 'react';
import PropTypes from 'prop-types';
import { request } from 'strapi-helper-plugin';

import InputModalStepperContext from '../../contexts/InputModal/InputModalDataManager';
import getRequestUrl from '../../utils/getRequestUrl';
import init from './init';
import reducer, { initialState } from './reducer';

const InputModalStepperProvider = ({ children }) => {
  const [reducerState, dispatch] = useReducer(reducer, initialState, init);
  const { selectedFiles, files, pagination, filters } = reducerState.toJS();

  const removeFilter = index => {
    dispatch({
      type: 'REMOVE_FILTER',
      filterToRemove: index,
    });
  };

  const handleFileSelection = ({ target: { name, value } }) => {
    dispatch({
      type: 'ON_FILE_SELECTION',
      id: name,
      value,
    });
  };

  const setParam = param => {
    dispatch({
      type: 'SET_PARAM',
      param,
    });
  };

  useEffect(() => {
    fetchMediaLibFiles();
  }, []);

  const fetchMediaLibFiles = async () => {
    const requestURL = getRequestUrl('files');

    // const paramsToSend = chain(params)
    //   .omit('filters')
    //   .value();

    try {
      const data = await request(requestURL, {
        method: 'GET',
        params: {
          ...pagination,
        },
      });

      dispatch({
        type: 'GET_DATA_SUCCEEDED',
        data,
      });
    } catch (err) {
      strapi.notification.error('notification.error');
    }
  };

  return (
    <InputModalStepperContext.Provider
      value={{
        selectedFiles,
        setParam,
        pagination,
        filters,
        files,
        onFileSelectionChange: handleFileSelection,
        fetchMediaLibFiles,
        removeFilter,
      }}
    >
      {children}
    </InputModalStepperContext.Provider>
  );
};

InputModalStepperProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default InputModalStepperProvider;
