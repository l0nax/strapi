import React, { useState } from 'react';
import styled from 'styled-components';
import { HeaderSearch as BaseHeaderSearch, useGlobalContext } from 'strapi-helper-plugin';

import getTrad from '../../../utils/getTrad';

const HeaderSearch = styled(BaseHeaderSearch)`
  position: relative;
  background-color: transparent;
  border-right: none;
`;

const Search = () => {
  const [value, setValue] = useState('');
  const { formatMessage } = useGlobalContext();
  const pluginName = formatMessage({ id: getTrad('plugin.name') });

  return (
    <HeaderSearch
      label={pluginName}
      onChange={e => setValue(e.target.value)}
      onClear={() => setValue(null)}
      placeholder={formatMessage({ id: getTrad('search.placeholder') })}
      name="_q"
      value={value}
    />
  );
};

export default Search;
