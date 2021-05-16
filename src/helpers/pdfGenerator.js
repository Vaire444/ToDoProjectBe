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
      styles: { fillColor: [255, 0, 0] },
      startY,
      didDrawPage(HookData) {
        return HookData.table;
      },
    });
    startY = table.lastAutoTable.finalY + 16;
  }
  

    doc.text("Total", startX, startY);
    startY += 5;

    doc.autoTable({
      columnStyles: { 0: { halign: 'center', fillColor: [0, 255, 0], } },
       // Cells in first column centered and green
      margin: { top: 10 },
      head: [['Task', 'Total']],
      body: [        
        ['Todo', todoLenght],
        ['Done', doneLenght],
       ],
    })
   
  

  res.setHeader(
    "Content-Disposition",
    'filename="' + encodeURIComponent(`TODO.pdf`) + '"'
  );
  res.setHeader("Content-Type", "application/pdf");
  res.end(doc.output(), "binary");
};
