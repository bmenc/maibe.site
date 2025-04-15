"use client";
import * as React from "react";
import { Button, NumericInput } from "@blueprintjs/core";

export function Menu({ addField, updateColumns, toggleAllEditButtons }: { 
    addField: (field: string) => void; 
    updateColumns: (columns: number) => void; 
    toggleAllEditButtons: () => void; 
}) {
    return (
        <div className="flex justify-between gap-1 w-full px-4">
            <div className="flex gap-1">
                <Button icon="new-text-box" text="New field" onClick={() => addField("textBox")} />
                <Button icon="edit" aria-label="edit" onClick={toggleAllEditButtons} />
                <NumericInput
                    min={1}
                    max={6}
                    placeholder="Columns"
                    onValueChange={(value) => updateColumns(value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <Button icon="download" text="Download" />
            </div>
        </div>
    );
}
