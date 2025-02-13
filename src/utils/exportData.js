import { createObjectCsvWriter } from "csv-writer";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import fs from "fs";

export const exportToCSV = async (data, filename) => {
  const csvWriter = createObjectCsvWriter({
    path: filename,
    header: Object.keys(data[0]).map((key) => ({ id: key, title: key })),
  });

  await csvWriter.writeRecords(data);
  return filename;
};

export const exportToExcel = async (data, filename) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = Object.keys(data[0]).map((key) => ({ header: key, key: key }));
  worksheet.addRows(data);

  await workbook.xlsx.writeFile(filename);
  return filename;
};

export const exportToPDF = async (data, filename) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filename);

    doc.pipe(stream);

    data.forEach((item, index) => {
      if (index > 0) doc.addPage();
      Object.entries(item).forEach(([key, value]) => {
        doc.text(`${key}: ${value}`);
      });
    });

    doc.end();

    stream.on("finish", () => resolve(filename));
    stream.on("error", reject);
  });
};
