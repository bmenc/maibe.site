import { useState } from "react";

export default function PrevisualizerJSON({ data }: { data: object; }) {
  const [value] = useState(JSON.stringify(data, null, 2));

  return (
    <div className="flex flex-col gap-2">
      <pre className="bg-gray-100 p-2 rounded border">{value}</pre>
    </div>
  );
}