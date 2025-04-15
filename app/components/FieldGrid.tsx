"use client";
import { useState } from "react";
import { Button, Card, FormGroup, InputGroup, EditableText, HTMLSelect } from "@blueprintjs/core";

interface FieldGridProps {
  columns: number;
  fields: string[];
  addField: () => void;
  updateColumns: (newColumns: number) => void;
  editingAll: boolean;
}

export default function FieldGrid({ columns, fields, editingAll }: FieldGridProps) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [fieldTypes, setFieldTypes] = useState<string[]>(fields.map(() => "input"));

  const getColumnClass = (columns: number) => {
    const columnClasses: { [key: number]: string } = {
      1: "grid-cols-1",
      2: "grid-cols-2",
      3: "grid-cols-3",
      4: "grid-cols-4",
      5: "grid-cols-5",
      6: "grid-cols-6",
    };
    return columnClasses[columns] || "grid-cols-1";
  };

  const handleFieldTypeChange = (index: number, newType: string) => {
    const updatedFieldTypes = [...fieldTypes];
    updatedFieldTypes[index] = newType;
    setFieldTypes(updatedFieldTypes);
  };

  return (
    <Card className="w-full">
      <div className={`grid ${getColumnClass(columns)} gap-2`}>
        {fields.map((field, index) => (
          <FormGroup
            key={index} 
            label={
              editingIndex === index || editingAll ? (
                <EditableText
                  selectAllOnFocus={true}
                  value={`Label ${index + 1}`}
                  onChange={() => {}}
                  className="w-full border-2 p-1 rounded-sm border-gray-300 shadow-inner" 
                />
              ) : (
                `Label ${index + 1}`
              )
            }
            labelFor={String(index)}
            helperText={
              editingIndex === index || editingAll ? `Edit text for field ${index + 1}` : undefined
            }
            fill={false}
            inline={false}
            className={`flex-1 ${editingAll ? "border p-2 rounded-sm shadow-sm" : ""}`}
          >
            {editingIndex === index || editingAll ? (
              <>
                <EditableText
                  selectAllOnFocus={true}
                  value={`Placeholder`}
                  onChange={() => {}}
                  className="w-full border-2 p-1 rounded-sm border-gray-300 shadow-inner" 
                />
                <HTMLSelect
                  fill
                  options={["input", "checkbox", "radio"]}
                  value={fieldTypes[index]}
                  onChange={(e) => handleFieldTypeChange(index, e.target.value)}
                  className="mt-2"
                />
              </>
            ) : (
              <InputGroup id={String(index)} fill />
            )}
            {editingAll || editingIndex === index ? (
              <Button
                text={editingIndex === index ? "Save" : "Edit"}
                intent={editingIndex === index ? "success" : "none"}
                aria-label={editingIndex === index ? "save" : "edit"}
                fill
                className="mt-2"
                onClick={() => setEditingIndex(editingIndex === index ? null : index)}
              />
            ) : null}
          </FormGroup>
        ))}
      </div>
    </Card>
  );
}