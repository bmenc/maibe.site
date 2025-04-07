"use client";
/*
 * Copyright 2015 Palantir Technologies, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as React from "react";

import { Icon, InputGroup, Menu, MenuDivider, MenuItem, type Size, Button, Popover, Position } from "@blueprintjs/core";

export function MenuExample() {
    const [count, setCount] = React.useState(0);
    const [size, setSize] = React.useState<Size>("small");

    return (
        <>
            <Popover
                content={
                    <Menu size={size}>
                        <MenuItem icon="new-text-box" text="New text box" />
                        <MenuDivider />
                        <MenuItem icon="new-object" text="New object" />
                        <MenuItem icon="new-link" text="New link" />
                        <MenuDivider />
                        <MenuItem
                            icon="calculator"
                            labelElement={count}
                            onClick={() => setCount(oldCount => oldCount + 1)}
                            text="Increment"
                        />
                        <MenuItem icon="cog" labelElement={<Icon icon="share" />} text="Settings..." intent="primary" />
                        <MenuDivider title="Edit" />
                        <MenuItem icon="cut" text="Cut" label="⌘X" />
                        <MenuItem icon="duplicate" text="Copy" label="⌘C" />
                        <MenuItem icon="clipboard" text="Paste" label="⌘V" disabled={true} />
                        <MenuDivider title="Text" />
                        <MenuItem disabled={true} icon="align-left" text="Alignment">
                            <MenuItem icon="align-left" text="Left" />
                            <MenuItem icon="align-center" text="Center" />
                            <MenuItem icon="align-right" text="Right" />
                            <MenuItem icon="align-justify" text="Justify" />
                        </MenuItem>
                        <MenuItem icon="style" text="Style">
                            <MenuItem icon="bold" text="Bold" />
                            <MenuItem icon="italic" text="Italic" />
                            <MenuItem icon="underline" text="Underline" />
                        </MenuItem>
                        <MenuItem icon="asterisk" text="Miscellaneous">
                            <MenuItem icon="badge" text="Badge" />
                            <MenuItem icon="book" text="Long items will truncate when they reach max-width" />
                            <MenuItem
                                icon="edit"
                                text="Set name"
                                labelElement={<InputGroup placeholder="Item name..." size="small" />}
                                shouldDismissPopover={false}
                            />
                            <MenuItem icon="more" text="Look in here for even more items">
                                <MenuItem icon="briefcase" text="Briefcase" />
                                <MenuItem icon="calculator" text="Calculator" />
                                <MenuItem icon="dollar" text="Dollar" />
                                <MenuItem icon="dot" text="Shapes">
                                    <MenuItem icon="full-circle" text="Full circle" />
                                    <MenuItem icon="heart" text="Heart" />
                                    <MenuItem icon="ring" text="Ring" />
                                    <MenuItem icon="square" text="Square" />
                                </MenuItem>
                            </MenuItem>
                        </MenuItem>
                    </Menu>
                }
                position={Position.BOTTOM}
                transitionDuration={0}
            >
                <Button icon="menu" variant="minimal" style={{ outline: "none" }} />
            </Popover>
        </>
    );
}
