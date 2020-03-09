import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Label, Button } from '@buffetjs/core';
import styled from 'styled-components';

import ModalStepper from '../InputModalStepper';
import CardPreview from '../CardPreview';

const Name = styled(Label)`
  display: block;
  text-transform: capitalize;
  margin-bottom: 1rem;
`;

const InputMedia = ({ label, onChange, value, name }) => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const handleClickToggleModal = () => {
    setIsModalOpen(prev => !prev);
  };

  // TODO Integration
  return (
    <>
      <Name htmlFor={name}>{label}</Name>
      <div style={{ height: '20rem', marginBottom: '2rem' }} onClick={handleClickToggleModal}>
        <CardPreview url="https://images.pexels.com/photos/20787/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" />
      </div>

      <ModalStepper isOpen={isModalOpen} onChange={onChange} onToggle={handleClickToggleModal} />
    </>
  );
};

InputMedia.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array,
  name: PropTypes.string.isRequired,
};
InputMedia.defaultProps = {
  label: '',
  value: null,
};

export default InputMedia;
