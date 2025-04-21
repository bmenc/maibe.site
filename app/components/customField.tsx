import * as React from "react";
import { FC, useState, useEffect } from "react";
import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";

interface FormGroupProps {
  name: string;
  placeholder: string;
  label?: string;
  labelInfo?: string;
  helperText?: string;
  subLabel?: string;
  value: string;
  error?: string;
  config: {
    disabled?: boolean;
    helperText?: boolean;
    fill?: boolean;
    inline?: boolean;
    label?: boolean;
    requiredLabel?: boolean;
    subLabel?: boolean;
  };
  onStateChange?: (state: { value: string }) => void;
  inputRef?: React.Ref<HTMLInputElement>;
}

const defaultState = {
  disabled: false,
  helperText: false,
  fill: false,
  inline: true,
  label: true,
  requiredLabel: true,
  subLabel: false,
};

export const CustomField: FC<FormGroupProps> = ({
  name,
  placeholder,
  label,
  labelInfo,
  helperText,
  subLabel,
  value,
  error,
  config,
  onStateChange,
  inputRef,
}) => {
  const [state] = useState({ ...defaultState, ...config });
  const intent = error ? Intent.DANGER : Intent.NONE;

  useEffect(() => {
    if (onStateChange) onStateChange({ value });
  }, [value, onStateChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (onStateChange) {
      onStateChange({ value: newValue }); // Siempre actualiza, incluso con cadena vacía
    }
  };

  return (
    <div style={{ width: state.fill ? "inherit" : "fit-content" }}>
      <FormGroup
        label={state.label ? label : undefined}
        labelFor={name}
        labelInfo={state.requiredLabel ? labelInfo : undefined}
        helperText={state.helperText ? helperText : undefined}
        subLabel={state.subLabel ? subLabel : undefined}
        intent={intent}
      >
        <InputGroup
          id={name}
          placeholder={placeholder}
          value={value}
          inputRef={inputRef}
          onChange={handleInputChange}
          disabled={state.disabled}
          intent={intent}
        />
      </FormGroup>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  );
};