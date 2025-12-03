import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
function generatePdfFromText(text, fileName = 'documento.pdf') {
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  // Metadatos
  doc.setProperties({
    title: fileName,
    subject: 'Informe PDF',
    author: 'Guillermo García Gómez',
  })
  doc.setFont('Helvetica', 'normal')
  doc.setFontSize(12)
  const margin = 40
  const maxWidth = pageWidth - margin * 2
  const lines = doc.splitTextToSize(text, maxWidth)
  let cursorY = margin
  const lineHeight = 16
  lines.forEach(line => {
    if (cursorY + lineHeight > pageHeight - margin) {
      doc.addPage()
      cursorY = margin
    }
    doc.text(line, margin, cursorY)
    cursorY += lineHeight
  })
  // Pie de página simple
  const pages = doc.getNumberOfPages()
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i)
    doc.setFontSize(10)
    doc.text(`Página ${i} de ${pages}`, pageWidth - margin, pageHeight - 20, { align: 'right' })
  }
  doc.save(fileName)
}
async function generatePdfFromHtml(element, fileName = 'captura.pdf') {
  if (!element) return
  // Capturar el elemento como imagen
  const canvas = await html2canvas(element, {
    scale: window.devicePixelRatio > 1 ? 2 : 1,
    useCORS: true,
    allowTaint: true,
    logging: false,
  })
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF('p', 'pt', 'a4')
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const imgWidth = pageWidth
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0
  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  heightLeft -= pageHeight
  while (heightLeft > 0) {
    position -= pageHeight
    pdf.addPage()
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
    heightLeft -= pageHeight
  }
  pdf.save(fileName)
}
// SIN USO
function DownloadFromText({ text, fileName = 'documento.pdf' }) {
  return (
    <button onClick={() => generatePdfFromText(text, fileName)}>Descargar PDF (texto)</button>
  )
}
function DownloadFromHtml({ targetRef, fileName = 'captura.pdf' }) {
  return (
    <button className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium w-full cursor-pointer hover:bg-indigo-700 hover:text-[17px]" onClick={() => generatePdfFromHtml(targetRef?.current, fileName)}>Descargar informe PDF</button>
  )
}
const PdfGenerator = { DownloadFromText, DownloadFromHtml }
export default PdfGenerator