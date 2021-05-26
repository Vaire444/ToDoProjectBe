const { jsPDF } = require("jspdf");
require("jspdf-autotable");

module.exports = async function (result, res) {
  const doc = new jsPDF("p", "mm");
  const doneLenght = result.doneTasks.length;
  const todoLenght = result.todoTasks.length;

  let startX = 15;
  let startY = 20;

  const header = [
    { header: "Title", dataKey: "title" },
    { header: "Date", dataKey: "date" },
    { header: "Priority", dataKey: "priority" },
  ];

  if (result.todoTasks.length > 0) {
    doc.text("Todo", startX, startY);
    startY += 5;

    const table = doc.autoTable(header, result.todoTasks, {
      startY,
      headStyles: { fillColor: [141, 135, 5] },
      bodyStyles: { fillColor: [255, 250, 200] },
      didParseCell(Hookdata) {
        if (Hookdata.column.dataKey === "priority") {
          Hookdata.cell.text = [
            Hookdata.cell.raw.charAt(0) +
              Hookdata.cell.raw.toLowerCase().slice(1),
          ];
        }
        if (Hookdata.column.dataKey === "date" && Hookdata.cell.raw != "Date") {
          let date = new Date(Hookdata.cell.raw);
          // let today = new Date().toISOString().slice(0, 10);;
          Hookdata.cell.text = [
            date.getDate().toString().padStart(2, "0") +
              "." +
              date.getMonth().toString().padStart(2, "0") +
              "." +
              date.getFullYear(),
          ];
        }
      },
      //columnStyles: { priority: { halign: 'center', fillColor: [1, 255, 0] } },
      didDrawPage(HookData) {
        return HookData.table;
      },
    });

    startY = table.lastAutoTable.finalY + 16;
  }

  if (result.doneTasks.length > 0) {
    doc.text("Done", startX, startY);
    startY += 5;

    const table = doc.autoTable(header, result.doneTasks, {
      startY,
      headStyles: { fillColor: [141, 135, 5] },
      bodyStyles: { fillColor: [255, 250, 200] },
      didParseCell(Hookdata) {
        if (Hookdata.column.dataKey === "priority") {
          Hookdata.cell.text = [
            Hookdata.cell.raw.charAt(0) +
              Hookdata.cell.raw.toLowerCase().slice(1),
          ];
        }
        if (Hookdata.column.dataKey === "date" && Hookdata.cell.raw != "Date") {
          let date = new Date(Hookdata.cell.raw);
          Hookdata.cell.text = [
            date.getDate().toString().padStart(2, "0") +
              "." +
              date.getMonth().toString().padStart(2, "0") +
              "." +
              date.getFullYear(),
          ];
        }
      },
      didDrawPage(HookData) {
        return HookData.table;
      },
    });
    startY = table.lastAutoTable.finalY + 16;
  }

  doc.text("Total", startX, startY);
  startY += 5;

  doc.autoTable({
    headStyles: { fillColor: [141, 135, 5] },
    bodyStyles: { fillColor: [255, 250, 200] },
    head: [["Task", "Total"]],
    body: [
      ["Todo", todoLenght],
      ["Done", doneLenght],
    ],
  });

  res.setHeader(
    "Content-Disposition",
    'filename="' + encodeURIComponent(`TODO.pdf`) + '"'
  );
  res.setHeader("Content-Type", "application/pdf");
  res.end(doc.output(), "binary");
};
