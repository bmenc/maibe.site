import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { InputGroup } from '@blueprintjs/core';

export default function SimplePhoneInput() {
  const [phone, setPhone] = useState('');

  return (
    <InputMask
      mask="99-99-99-99"
      maskChar={null}
      value={phone}
      onChange={(e) => setPhone(e.target.value)}
    >
      {(inputProps) => {
        const { ...safeProps } = inputProps;
        return (
          <InputGroup
            {...safeProps}
            placeholder="Ingresa tu teléfono"
            leftIcon="phone"
          />
        );
      }}
    </InputMask>
  );
}
