"use client";
import { useState } from "react";
import { MenuExample } from "@/app/components/menuExample";
import { Card, FormGroup, InputGroup } from "@blueprintjs/core";

export default function Home() {
  const [fields, setFields] = useState<string[]>([]);
  const [columns, setColumns] = useState(6); // Estado para manejar las columnas

  const addField = () => {
    setFields([...fields, ""]);
  };

  const updateColumns = (newColumns: number) => {
    setColumns(newColumns);
  };

  const getColumnClass = (columns: number) => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-4";
      case 5:
        return "grid-cols-5";
      case 6:
        return "grid-cols-6";
      default:
        return "grid-cols-1";
    }
  };

  return (
    <main className="flex flex-col">
      <MenuExample addField={addField} updateColumns={updateColumns} />
      <div className="flex flex-col justify-between items-center p-4">
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
                <InputGroup
                  id={String(index)}
                  placeholder="Placeholder text"
                />
              </FormGroup>
            ))}
          </div>
        </Card>
      </div>
    </main>
  );
}
