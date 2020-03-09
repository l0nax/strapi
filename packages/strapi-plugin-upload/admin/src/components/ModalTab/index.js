/**
 *
 * ModalTab
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import getTrad from '../../utils/getTrad';
import Wrapper from './Wrapper';
import Padded from '../Padded';
import IntlText from '../IntlText';
import Flex from '../Flex';
import Count from './Count';

const ModalTab = ({ isDisabled, label, to, isActive, onClick, count }) => {
  const handleClick = e => {
    if (isDisabled) {
      e.preventDefault();

      return;
    }

    onClick(to);
  };

  return (
    <Padded right size="lg">
      <Wrapper isActive={isActive} isDisabled={isDisabled} onClick={handleClick}>
        <Flex>
          <IntlText
            id={getTrad(`modal.nav.${label}`)}
            textTransform="uppercase"
            fontWeight={isActive ? 'bold' : 'semiBold'}
            color={isActive ? 'mediumBlue' : 'grey'}
          />
          {typeof count === 'number' && <Count count={count} />}
        </Flex>
      </Wrapper>
    </Padded>
  );
};

ModalTab.defaultProps = {
  isActive: false,
  isDisabled: false,
  onClick: () => {},
  count: null,
};

ModalTab.propTypes = {
  to: PropTypes.string.isRequired,
  isActive: PropTypes.bool,
  isDisabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  count: PropTypes.number,
};

export default ModalTab;
