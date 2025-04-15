"use client";
import { Card, FormGroup, InputGroup } from "@blueprintjs/core";

interface FieldGridProps {
  columns: number;
  fields: string[];
  addField: () => void;
  updateColumns: (newColumns: number) => void;
}

export default function FieldGrid({ columns, fields }: FieldGridProps) {
  const getColumnClass = (columns: number) => {
    return `grid-cols-${columns || 1}`;
  };

  return (
    <Card className="w-full">
      <div className={`grid ${getColumnClass(columns)} gap-2`}>
        {fields.map((field, index) => (
          <FormGroup
            key={index}
            label={`Field ${index + 1}`}
            labelFor={String(index)}
            helperText={`Helper text for field ${index + 1}`}
            fill={false}
            inline={false}
            className="flex-1"
          >
            <InputGroup id={String(index)} placeholder="Placeholder text" />
          </FormGroup>
        ))}
      </div>
    </Card>
  );
}