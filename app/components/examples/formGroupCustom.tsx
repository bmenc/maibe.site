import * as React from "react";
import { FC, useState, useEffect } from "react";
import {
    FormGroup,
    InputGroup,
    Intent,
} from "@blueprintjs/core";

interface FormGroupProps {
    initialState?: {
        disabled?: boolean;
        helperText?: boolean;
        fill?: boolean;
        inline?: boolean;
        label?: boolean;
        requiredLabel?: boolean;
        subLabel?: boolean;
    };
    onStateChange?: (state: typeof defaultState) => void;
}

const defaultState = {
    disabled: false,
    helperText: false,
    fill: false,
    inline: false,
    label: true,
    requiredLabel: true,
    subLabel: false,
};

export const FormGroupCustom: FC<FormGroupProps> = ({ initialState, onStateChange }) => {
    const [state, setState] = useState({ ...defaultState, ...initialState });
    const [intent, setIntent] = useState<Intent>(Intent.NONE);

    useEffect(() => {
        if (onStateChange) {
            onStateChange(state);
        }
    }, [state, onStateChange]);

    const { disabled, helperText, fill, inline, label, requiredLabel, subLabel } = state;

    return (
        <div style={{ width: fill ? "inherit" : "fit-content" }} >
            <FormGroup
                {...{ disabled, fill, inline, intent }}
                helperText={helperText && "Helper text with details..."}
                label={label && "Label"}
                labelFor="text-input"
                labelInfo={requiredLabel && "(required)"}
                subLabel={subLabel && "Label helper text with details..."}
            >
                <InputGroup id="text-input" placeholder="Placeholder text" disabled={disabled} intent={intent} />
            </FormGroup>
        </div>
    );
};
