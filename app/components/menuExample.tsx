"use client";

import * as React from "react";

import { Button, NumericInput } from "@blueprintjs/core";

export function MenuExample({ addField, updateColumns }: { addField: (field: string) => void; updateColumns: (columns: number) => void }) {
    return (
        <div className="flex justify-between gap-1 w-full p-1">
            <div className="flex gap-1">
                <Button icon="new-text-box" text="New text box" onClick={() => addField("textBox")} />
                <NumericInput
                    min={1}
                    max={6}
                    placeholder="Columns"
                    onValueChange={(value) => updateColumns(value)}
                />
            </div>
            <div className="flex items-center gap-2">

                <Button icon="download" text="Download tsx" />
            </div>
        </div>
    );
}
