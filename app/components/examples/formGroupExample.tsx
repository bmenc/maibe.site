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

export const FormGroupExample: FC<ExampleProps> = props => {
    const [intent, setIntent] = useState<Intent>(Intent.NONE);
    const [state, setState] = useState({
        disabled: false,
        helperText: false,
        fill: false,
        inline: false,
        label: false,
        requiredLabel: false,
        subLabel: false,
    });

    const {disabled, helperText, fill, inline, label, requiredLabel, subLabel} = state;

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
            minimal={true}
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
            <IntentSelect intent={intent} label={intentLabelInfo} onChange={setIntent} showClearButton={true} />
        </>
    );

    return (
        <Example 
            options={options} 
            {...props}>
            <Card style={{ width: fill ? "inherit" : "fit-content" }}>
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
            </Card>
        </Example>
    );
};
