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
      didDrawCell(HookData){        
        // if (HookData.cell.section === 'body') {
          // console.log(HookData.cell.section)
        if(HookData.column.dataKey === 'priority'){
          function capitalizeFirstLetter(str) {
            console.log(str)
            return str.charAt(0).toUpperCase() +
            str.toLowerCase().slice(1),
            console.log(str)
        }
        let prioData = HookData.cell.text.toString() 
        capitalizeFirstLetter(prioData)
        console.log(prioData)
        console.log('prioData')

                  }
                  if(HookData.column.dataKey === 'date'){
                    function capitalizeFirstLetter(date) {
                      console.log(date)
                      return date
                  }
                  let dateData = HookData.cell.text.toString() 
                  capitalizeFirstLetter(dateData)
                  console.log(dateData)
                  console.log('dateData')
          
                            }
                // }
      },


      columnStyles:{2:{ fillColor: [255,250, 200] }},
      headStyles: { fillColor: [141, 135, 5] },
      bodyStyles: { fillColor: [255, 250, 200] },
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
      columnStyles:{2:{ fillColor: [255,250, 200] }},
      headStyles: { fillColor: [141, 135, 5] },
      bodyStyles: { fillColor: [255, 250, 200] },
      startY,
      didDrawPage(HookData) {
      console.log(HookData.table)
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
