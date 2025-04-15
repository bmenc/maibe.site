"use client";
import { useState } from "react";
import { Menu } from "@/app/components/menu";
import FieldGrid from "@/app/components/FieldGrid";

export default function Home() {
  const [config, setConfig] = useState({
    fields: [] as string[],
    columns: 5,
  });
  const [editingAll, setEditingAll] = useState(false);

  const addField = () => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      fields: [...prevConfig.fields, ""],
    }));
  };

  const updateColumns = (newColumns: number) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      columns: newColumns,
    }));
  };

  const toggleAllEditButtons = () => {
    setEditingAll((prev) => !prev);
  };

  return (
    <main className="flex flex-col mt-4">
      <Menu addField={addField} updateColumns={updateColumns} toggleAllEditButtons={toggleAllEditButtons} />
      <div className="flex flex-col justify-between items-center p-4 mt-2">
        <FieldGrid 
          columns={config.columns} 
          fields={config.fields} 
          addField={addField} 
          updateColumns={updateColumns} 
          editingAll={editingAll} 
        />
      </div>
    </main>
  );
}
