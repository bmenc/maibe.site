import * as React from "react";
import { FC, useState, useEffect } from "react";
import { FormGroup, InputGroup, Intent } from "@blueprintjs/core";

interface FormGroupProps {
  name: string;
  placeholder: string;
  helperText?: string;
  label?: string;
  labelInfo?: string;
  subLabel?: string;
  config: {
    disabled?: boolean;
    helperText?: boolean;
    fill?: boolean;
    inline?: boolean;
    label?: boolean;
    requiredLabel?: boolean;
    subLabel?: boolean;
  };
  initialState?: typeof defaultState;
  onStateChange?: (state: typeof defaultState) => void;
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

export const FormGroupCustom: FC<FormGroupProps> = ({
  name,
  placeholder,
  helperText,
  label,
  labelInfo,
  subLabel,
  config,
  initialState,
  onStateChange,
}) => {
  const [state] = useState({ ...defaultState, ...config, ...initialState });
  const intent = Intent.NONE;

  useEffect(() => {
    onStateChange?.(state);
  }, [state, onStateChange]);

  const { disabled, fill, inline } = state;

  return (
    <div style={{ width: fill ? "inherit" : "fit-content" }}>
      <FormGroup
        {...{ disabled, fill, inline, intent }}
        helperText={state.helperText ? helperText : undefined}
        label={state.label ? label : undefined}
        labelFor={name} 
        labelInfo={state.requiredLabel ? labelInfo : undefined}
        subLabel={state.subLabel ? subLabel : undefined}
      >
        <InputGroup
          id={name} 
          placeholder={placeholder}
          disabled={disabled}
          intent={intent}
        />
      </FormGroup>
    </div>
  );
};
