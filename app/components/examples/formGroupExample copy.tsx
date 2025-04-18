/*
 * Copyright 2018 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";
import { FC, useState, useEffect } from "react";

import {
    Card,
    Classes,
    Code,
    Divider,
    FormGroup,
    H5,
    Icon,
    InputGroup,
    Intent,
    Switch,
    Tooltip,
} from "@blueprintjs/core";
import { Example, type ExampleProps, handleBooleanChange } from "@blueprintjs/docs-theme";
import { IntentSelect } from "./common/intentSelect";

export enum FieldType {
    TEXT = "text",
    RADIO = "radio",
  }

interface FormGroupExampleProps extends ExampleProps {
    p_type?: FieldType;
    p_label?: string;
    p_disabled?: boolean;
    p_helperText?: boolean;
    p_fill?: boolean;
    p_inline?: boolean;
    p_labelVisible?: boolean;
    p_requiredLabel?: boolean;
    p_subLabel?: boolean;
}

export const FormGroupExample: FC<FormGroupExampleProps> = ({ 
    p_type = FieldType.TEXT, 
    p_label = 'Label', 
    p_disabled = false,
    p_helperText = "Helper text with details...",
    p_fill = false,
    p_inline = false,
    p_labelVisible = "",
    p_requiredLabel = "(required)",
    p_subLabel = "",
    ...props 
}) => {
    const [intent, setIntent] = useState<Intent>(Intent.NONE);
    const [state, setState] = useState({
        disabled: p_disabled ?? false,
        helperText: p_helperText ?? false,
        fill: p_fill ?? false,
        inline: p_inline ?? false,
        label: p_labelVisible ?? true,
        requiredLabel: p_requiredLabel ?? true,
        subLabel: p_subLabel ?? false,
    });

    const { disabled, helperText, fill, inline, label, requiredLabel, subLabel } = state;

    const handleSwitchChange = (key: keyof typeof state) => handleBooleanChange(
        (value: boolean) => setState(prev => ({ ...prev, [key]: value }))
    );

    const intentLabelInfo = (
        <Tooltip
            content={
                <span className={Classes.TEXT_SMALL}>
                    Applies to helper text and sub label automatically, <br />
                    but other child elements will need their own <br />
                    <Code>intent</Code> applied independently.
                </span>
            }
            placement="top"
            minimal
        >
            <span>
                Intent{" "}
                <span style={{ lineHeight: "16px", padding: 2, verticalAlign: "top" }}>
                    <Icon className={Classes.TEXT_MUTED} icon="info-sign" size={12} />
                </span>
            </span>
        </Tooltip>
    );

    const options = (
        <>
            <H5>Props</H5>
            <Switch label="Disabled" checked={disabled} onChange={handleSwitchChange("disabled")} />
            <Switch label="Fill" checked={fill} onChange={handleSwitchChange("fill")} />
            <Switch label="Inline" checked={inline} onChange={handleSwitchChange("inline")} />
            <Switch label="Show helper text" checked={helperText} onChange={handleSwitchChange("helperText")} />
            <Switch label="Show label" checked={label} onChange={handleSwitchChange("label")} />
            <Switch label="Show label info" checked={requiredLabel} onChange={handleSwitchChange("requiredLabel")} />
            <Switch label="Show sub label" checked={subLabel} onChange={handleSwitchChange("subLabel")} />
            <Divider />
            <IntentSelect intent={intent} label={intentLabelInfo} onChange={setIntent} showClearButton />
        </>
    );

    useEffect(() => {
        setState(prev => ({
            ...prev,
            ...(p_disabled !== undefined && { disabled: p_disabled }),
            ...(p_helperText !== undefined && { helperText: p_helperText }),
            ...(p_fill !== undefined && { fill: p_fill }),
            ...(p_inline !== undefined && { inline: p_inline }),
            ...(p_labelVisible !== undefined && { label: p_labelVisible }),
            ...(p_requiredLabel !== undefined && { requiredLabel: p_requiredLabel }),
            ...(p_subLabel !== undefined && { subLabel: p_subLabel }),
        }));
    }, [
        p_disabled,
        p_helperText,
        p_fill,
        p_inline,
        p_labelVisible,
        p_requiredLabel,
        p_subLabel,
    ]);

    return (
        <Example
            options={options}
            {...props}>
            <Card style={{ width: fill ? "inherit" : "fit-content" }}>
                {p_type === FieldType.TEXT ? (
                    <FormGroup
                        {...{ disabled, fill: !!fill, inline: !!inline, intent }}
                        helperText={helperText && "Helper text with details..."}
                        label={label && p_label}
                        labelFor="text-input"
                        labelInfo={requiredLabel && "(required)"}
                        subLabel={subLabel && "Label helper text with details..."}
                    >
                        <InputGroup id="text-input" placeholder="Placeholder text" disabled={disabled} intent={intent} />
                    </FormGroup>
                ) : (
                    <FormGroup
                        // {...{ disabled, fill, inline, intent }}
                        helperText={helperText && "Helper text with details..."}
                        label={label && p_label}
                        labelInfo={requiredLabel && "(required)"}
                    >
                        <Switch label="Engage the hyperdrive" disabled={disabled} />
                        <Switch label="Initiate thrusters" disabled={disabled} />
                    </FormGroup>
                )}
            </Card>
        </Example>
    );
};
