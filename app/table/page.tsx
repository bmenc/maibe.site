"use client";
import { ChangeEvent, useState } from "react";
import db from "./db.json";

import * as XLSX from "xlsx";
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import download from "downloadjs";

// import { Button } from "@blueprintjs/core";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getPaginationRowModel,
  PaginationState,
} from "@tanstack/react-table";
import { Button } from "@blueprintjs/core";

type Donation = {
  address: string;
  bag_type: string;
  barrio: string;
  convoke_place_name: string;
  cp: string;
  donation_date: string;
  donation_hour: string;
  donation_number: string;
  donation_type: string;
  donor_age: string;
  donor_number: number;
  email: string;
  enable: string;
  enought_blood: string;
  extraction_type: string;
  group_rh: string;
  health_service: string;
  hf_name: string;
  home_phone: string | null;
  ife_number: string | null;
  incidents_refused: string | null;
  init_gr_rh: string | null;
  municipio: string;
  nss: string;
  phenotypes: string | null;
  sex: string;
  state: string;
  work_phone: string | null;
  offer: string;
};

const columnHelper = createColumnHelper<Donation>();

const columns = [
  columnHelper.accessor("convoke_place_name", {
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("cp", {
    header: () => "CP",
    cell: (info) => <i>{info.getValue()}</i>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("barrio", {
    header: () => "Barrio",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("donation_date", {
    header: () => "Donation Date",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("donor_age", {
    header: () => "Donor Age",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("donation_number", {
    header: () => "donation_number",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("health_service", {
    header: () => "Health Service",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("state", {
    header: () => "State",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("offer", {
    header: () => "Offer",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
];

export default function Page() {
  const sanitizedData = db.res.map((item) => ({
    ...item,
    ife_number: item.ife_number ?? null,
  })) as Donation[];

  const [data] = useState<Donation[]>(sanitizedData);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    state: { columnFilters, pagination },
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const exportToExcel = () => {
    const exportData = table.getFilteredRowModel().rows.map(({ original }) => ({
      "Lugar de convocatoria": original.convoke_place_name,
      "Código Postal": original.cp,
      Barrio: original.barrio,
      "Fecha de Donación": original.donation_date,
      "Edad del Donante": original.donor_age,
      "Número de Donación": original.donation_number,
      "Servicio de Salud": original.health_service,
      Estado: original.state,
      Oferta: original.offer,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Donaciones");

    XLSX.writeFile(wb, "donaciones.xlsx");
  };

  const exportToPDF = async () => {
    const pdfDoc = await PDFDocument.create()
    const page = pdfDoc.addPage([800, 600])
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const { height } = page.getSize()

    const fontSize = 6;
    let yPosition = height - 50;
    page.drawText("Reporte de Donaciones", {
      x: 50,
      y: yPosition,
      size: 16,
      font,
      color: rgb(0, 0, 0),
    });

    yPosition -= 20;
    const headers = [
      "Lugar de convocatoria",
      "Código Postal",
      "Barrio",
      "Fecha de Donación",
      "Edad",
      "N° Donación",
      "Servicio de Salud",
      "Estado",
      "Oferta",
    ];
    const columnWidths = [100, 50, 80, 70, 40, 60, 80, 50, 50];

    headers.forEach((header, i) => {
      page.drawText(header, {
        x: 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
        y: yPosition,
        size: fontSize,
        font,
        color: rgb(0, 0, 0),
      });
    });

    yPosition -= 15;

    table.getFilteredRowModel().rows.forEach(({ original }) => {
      const rowData = [
        original.convoke_place_name,
        original.cp,
        original.barrio,
        original.donation_date,
        original.donor_age,
        original.donation_number,
        original.health_service,
        original.state,
        original.offer,
      ].map((value) => (value ? String(value) : "N/A"));

      rowData.forEach((text, i) => {
        page.drawText(text, {
          x: 50 + columnWidths.slice(0, i).reduce((a, b) => a + b, 0),
          y: yPosition,
          size: fontSize,
          font,
          color: rgb(0, 0, 0),
        });
      });

      yPosition -= 12;
    });


    const pdfBytes = await pdfDoc.save()

    download(pdfBytes, "donaciones.pdf", "application/pdf");
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>, handler: string) => {
    console.log('handler :', handler);
    console.log('e :', e);
  }


  return (
    <div className="p-2">                                                                                                                                                                                                                                                                                                                                                                                                  
      <div className="flex gap-2 items-center">
        <div className="flex gap-2 mb-4 items-center mt-4">
          Filter:
          <input
            type="text"
            placeholder="Filter by convoke_place_name"
            className="border p-1 h-6 text-gray-500 border-gray-300 text-xs"
            value={
              (table
                .getColumn("convoke_place_name")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(e) =>
              table
                .getColumn("convoke_place_name")
                ?.setFilterValue(e.target.value)
            }
          />
        </div>
        <Button text="Excel" onClick={exportToExcel} />
        <Button text="PDF" onClick={exportToPDF} />
      </div>

      <table className="table-auto w-full text-xs border-sm">
        <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10 border-gray-300">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="border border-gray-300 min-w-[50px]"></th>
              <th className="border border-gray-300 min-w-[50px]"></th>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b border border-gray-300 justify-center items-center">
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}

          <tr className="border border-gray-300">
            <th className="border border-gray-300 min-w-[50px]"></th>
            <th className="border border-gray-300 min-w-[50px]">
              <div className="w-full h-full flex justify-center items-center">
                <input type="checkbox" name="" id="" />
              </div>
            </th>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <th key={header.id} className="p-2 border-b border border-gray-300">
                  {!header.isPlaceholder && (
                    <input
                      type="text"
                      placeholder={`Filtrar ${header.column.id}`}
                      onChange={(e) => handleFilterChange(e, header.column.id)}
                      className="w-full p-1 text-xs border border-gray-300 bg-white"
                    />
                  )}
                </th>
              ))
            )}
          </tr>
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="p-2 border-b text-xs border border-gray-300 text-end bg-gray-100 text-gray-600">{index + 1}</td>
              <td className="p-2 border-b text-xs border border-gray-300 text-end bg-gray-100 text-gray-600">
                <div className="w-full h-full flex justify-center items-center">
                  <input type="checkbox" name="" id="" />
                </div>
              </td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="p-2 border-b text-xs border border-gray-300">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td colSpan={table.getHeaderGroups()[0].headers.length + 2} className="p-2 border-t text-gray-600 bg-white border border-gray-300">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <button
                      className="border px-1 text-gray-500 border-gray-300"
                      onClick={() => table.previousPage()}
                      disabled={!table.getCanPreviousPage()}
                    >
                      {"<"}
                    </button>
                    <span>
                      Página {table.getState().pagination.pageIndex + 1} de{" "}
                      {table.getPageCount()}
                    </span>
                    <button
                      className="border px-1 text-gray-500 border-gray-300"
                      onClick={() => table.nextPage()}
                      disabled={!table.getCanNextPage()}
                    >
                      {">"}
                    </button>
                    <select
                      value={table.getState().pagination.pageSize}
                      onChange={(e) => table.setPageSize(Number(e.target.value))}
                      className="border border-gray-300"
                    >
                      {[10, 20, 30, 40, 50].map((size) => (
                        <option key={size} value={size}>
                          Mostrar {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <p>Total de registros: {table.getPrePaginationRowModel().rows.length}</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex w-full justify-between">
        <div className="flex justify-between text-xs mt-4">
        </div>
      </div>
    </div>
  );
}
