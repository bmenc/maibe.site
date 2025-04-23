import * as React from "react";
import { FC, useState, useEffect } from "react";
import { 
  FormGroup, 
  InputGroup, 
  Intent, 
  ControlGroup, 
  HTMLSelect, 
  Button, 
  TextArea,
  MenuItem,
} from "@blueprintjs/core";
import { Suggest } from "@blueprintjs/select";
import { type ItemRenderer } from "@blueprintjs/select";
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
    // Suggest-specific props
    allowCreate?: boolean;
    closeOnSelect?: boolean;
    matchTargetWidth?: boolean;
    minimal?: boolean;
    resetOnClose?: boolean;
    resetOnQuery?: boolean;
    resetOnSelect?: boolean;
    openOnKeyDown?: boolean;
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
  // Suggest defaults
  allowCreate: false,
  closeOnSelect: true,
  matchTargetWidth: false,
  minimal: true,
  resetOnClose: false,
  resetOnQuery: true,
  resetOnSelect: false,
  openOnKeyDown: false,
};

// Create suggest component for strings
const StringSuggest = Suggest.ofType<string>();

// Item renderer for suggest
const renderItem: ItemRenderer<string> = (item, { handleClick, modifiers }) => {
  if (!modifiers.matchesPredicate) {
    return null;
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={item}
      onClick={handleClick}
      text={item}
      roleStructure="listoption"
    />
  );
};

// Render input value for suggest
const renderInputValue = (item: string) => item;

// Filter items for suggest
const filterItems = (query: string, item: string) => {
  return item.toLowerCase().includes(query.toLowerCase());
};

// No results component for suggest
const noResults = <MenuItem disabled={true} text="No hay resultados." roleStructure="listoption" />;

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
        {type === "suggest" ? (
          <StringSuggest
            items={options?.map(opt => opt.label) || []}
            itemRenderer={renderItem}
            inputValueRenderer={renderInputValue}
            onItemSelect={(item) => {
              if (onStateChange) onStateChange({ value: item, touched: true });
            }}
            itemPredicate={filterItems}
            noResults={noResults}
            inputProps={{
              placeholder,
              id: name,
              onBlur: handleBlur,
              // disabled: state.disabled,
            }}
            selectedItem={value}
            popoverProps={{
              matchTargetWidth: state.matchTargetWidth,
              minimal: state.minimal,
            }}
            closeOnSelect={state.closeOnSelect}
            resetOnClose={state.resetOnClose}
            resetOnQuery={state.resetOnQuery}
            resetOnSelect={state.resetOnSelect}
            openOnKeyDown={state.openOnKeyDown}
            createNewItemFromQuery={
              state.allowCreate 
                ? (query) => query 
                : undefined
            }
            fill={state.fill}
          />
        ) : type === "select" ? (
          <ControlGroup fill={state.fill}>
            <HTMLSelect
              id={name}
              value={value}
              onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLSelectElement>)}
              onBlur={handleBlur}
              fill={true}
              style={{
                width: "170px",
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
        ) : type === "textarea" ? (
          <TextArea
            id={name}
            placeholder={placeholder}
            value={value}
            inputRef={inputRef as React.Ref<HTMLTextAreaElement>}
            onChange={(e) => handleInputChange(e as React.ChangeEvent<HTMLTextAreaElement>)}
            onBlur={handleBlur}
            disabled={state.disabled}
            intent={intent}
            growVertically={true}
            fill={state.fill}
            style={{
              color: "#1d1d1d",
              resize: "vertical",
              width: "200px",
              border: shouldShowError ? "1px solid red" : undefined,
            }}
          />
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
            style={{
              color: "#1d1d1d", 
              width: "200px",
              border: shouldShowError ? "1px solid red" : undefined,
            }}
          />
        )}
      </FormGroup>
      {error && <span className="text-red-700 text-xs">{error}</span>}
    </div>
  );
};