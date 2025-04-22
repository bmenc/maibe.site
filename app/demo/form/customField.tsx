import * as React from "react";
import { FC, useState, useEffect } from "react";
import { FormGroup, InputGroup, Intent, ControlGroup, HTMLSelect, Button } from "@blueprintjs/core";
import InputMask from "react-input-mask";

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
  onStateChange?: (state: { value: string; touched?: boolean }) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  type?: string;
  options?: { label: string; value: string }[];
  onClear?: () => void;
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
  type = "text",
  options,
  onClear,
}) => {
  const [state] = useState({ ...defaultState, ...config });
  const [touched, setTouched] = useState(false);
  const intent = error ? Intent.DANGER : Intent.NONE;

  useEffect(() => {
    if (onStateChange) onStateChange({ value });
  }, [value, onStateChange]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const newValue = e.target.value;
    if (onStateChange) {
      onStateChange({ value: newValue, touched: true });
    }
  };

  const handleBlur = () => {
    setTouched(true);
    if (onStateChange) {
      onStateChange({ value, touched: true });
    }
  };

  const shouldShowError = state.requiredLabel && touched && value === "";

  return (
    <div style={{ width: state.fill ? "inherit" : "fit-content" }}>
      <FormGroup
        label={state.label ? label : undefined}
        labelFor={name}
        labelInfo={state.requiredLabel ? labelInfo : undefined}
        helperText={state.helperText ? helperText : undefined}
        subLabel={state.subLabel ? subLabel : undefined}
        intent={intent}
        style={{ marginBottom: "2px" }}
      >
        {type === "select" ? (
          <ControlGroup fill={state.fill}>
            <HTMLSelect
              id={name}
              value={value}
              onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLSelectElement>)}
              onBlur={handleBlur}
              fill={true}
              style={{
                width: "200px",
                border: shouldShowError ? "1px solid red" : undefined,
              }}
            >
              <option value="">{placeholder}</option>
              {options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </HTMLSelect>
            {onClear && (
              <Button
                aria-label="Clear"
                icon="cross"
                onClick={() => onClear()}
                disabled={!value}
              />
            )}
          </ControlGroup>
        ) : type === "phone" ? (
          <InputMask
            mask="99-99-99-99-99"
            maskChar={null}
            value={value}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
            onBlur={handleBlur}
            disabled={state.disabled}
          >
            {(inputProps) => (
              <InputGroup
                {...inputProps}
                id={name}
                placeholder={placeholder}
                inputRef={inputRef}
                intent={intent}
                style={{
                  color: "#1d1d1d",
                  width: "200px",
                  border: shouldShowError ? "1px solid red" : undefined,
                }}
              />
            )}
          </InputMask>
        ) : type === "postalCode" ? (
          <InputMask
            mask="99999"
            maskChar={null}
            value={value}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLInputElement>)}
            onBlur={handleBlur}
            disabled={state.disabled}
          >
            {(inputProps) => (
              <InputGroup
                {...inputProps}
                id={name}
                placeholder={placeholder}
                inputRef={inputRef}
                intent={intent}
                style={{
                  color: "#1d1d1d",
                  width: "200px",
                  border: shouldShowError ? "1px solid red" : undefined,
                }}
              />
            )}
          </InputMask>
        ) : (
          <InputGroup
            id={name}
            placeholder={placeholder}
            value={value}
            inputRef={inputRef}
            onChange={handleInputChange}
            onBlur={handleBlur}
            disabled={state.disabled}
            intent={intent}
            type={type || "text"} 
            style={{color: "#1d1d1d", width: "200px"}}
          />
        )}
      </FormGroup>
      {error && <span className="text-red-700 text-xs">{error}</span>}
    </div>
  );
};