import React from 'react';

import { PageFooter } from 'strapi-helper-plugin';
import ListEmpty from '../ListEmpty';
import List from '../List';
import useDataManager from '../../hooks/useDataManager';
import Filters from '../Filters';
import SortPicker from '../SortPicker';
import Padded from '../Padded';
import Flex from '../Flex';
import SelectAll from '../SelectAll';
import Wrapper from './Wrapper';
import { generatePageFromStart, generateStartFromPage } from '../../containers/HomePage/utils';

const BrowseAssets = () => {
  const {
    onFileSelectionChange,
    setParam,
    removeFilter,
    files,
    pagination,
    filters,
    sort,
    selectedFiles,
  } = useDataManager();

  const handleChangeParams = ({ target: { name, value } }) => {
    setParam({ name, value });
  };

  const handleChangeListParams = ({ target: { name, value } }) => {
    if (name.includes('_page')) {
      handleChangeParams({
        target: { name: '_start', value: generateStartFromPage(value, pagination._limit) },
      });
    } else {
      handleChangeParams({ target: { name: '_limit', value } });
    }
  };

  const handleDeleteFilter = index => {
    removeFilter(index);
  };

  if (files.length === 0) {
    return <ListEmpty numberOfRows={2} onClick={() => console.log('open upload modal')} />;
  }

  const limit = parseInt(pagination._limit, 10) || 10;
  const start = parseInt(pagination._start, 10) || 0;

  const paginationParams = {
    _limit: limit,
    _page: generatePageFromStart(start, limit),
  };

  return (
    <Wrapper top size="sm">
      <Padded top bottom>
        <Flex flexWrap="wrap">
          <SelectAll />
          <Padded left size="sm" />
          <SortPicker onChange={handleChangeParams} value={sort} />
          <Padded left size="sm" />
          <Filters onChange={handleChangeParams} onClick={handleDeleteFilter} filters={filters} />
        </Flex>
      </Padded>
      <List data={files} onChange={onFileSelectionChange} selectedItems={selectedFiles} />
      <Padded left right>
        <PageFooter
          context={{ emitEvent: () => {} }}
          count={50}
          onChangeParams={handleChangeListParams}
          params={paginationParams}
        />
      </Padded>
    </Wrapper>
  );
};

export default BrowseAssets;
