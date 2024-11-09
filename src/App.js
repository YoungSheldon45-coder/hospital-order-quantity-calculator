import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import Form from './Components/Form';
import { Document, Packer, Table, TableRow, TableCell, Paragraph, TextRun } from "docx";
import "jspdf-autotable";
import './App.css'

function App() {
  const [products, setProducts] = useState([]);

  const addProduct = (product) => {
    setProducts([...products, product]);
  };

  // Delete product
  const deleteProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Clear all products
  const clearTable = () => {
    setProducts([]);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
  
    doc.text("Product Table", 14, 16);
  
    const tableColumns = ["Name", "CA", "SS", "Qo"];
    const tableData = products.map((product) => [
      product.productName,
      product.CA.toFixed(2),
      product.SS.toFixed(2),
      product.Qo.toFixed(2),
    ]);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableData,
      startY: 30,
    });
  
    doc.save("product-table.pdf");
  };

  // Export to Word with a table
  const exportToWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun("Product Table"), 
              ],
            }),
            new Table({
              rows: [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph("Name")],
                      borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      shading: { fill: "E4E4E4" }, // Light grey background
                      verticalAlign: "center", 
                      width: { size: 20, type: "percent" }, // Make it fit better
                    }),
                    new TableCell({
                      children: [new Paragraph("CA")],
                      borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      shading: { fill: "E4E4E4" }, // Light grey background
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [new Paragraph("SS")],
                      borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      shading: { fill: "E4E4E4" }, // Light grey background
                      verticalAlign: "center",
                    }),
                    new TableCell({
                      children: [new Paragraph("Qo")],
                      borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      shading: { fill: "E4E4E4" }, // Light grey background
                      verticalAlign: "center",
                    }),
                  ],
                }),
                ...products.map((product) =>
                  new TableRow({
                    children: [
                      new TableCell({
                        children: [new Paragraph(product.productName)],
                        borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      }),
                      new TableCell({
                        children: [new Paragraph(product.CA.toFixed(2))],
                        borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      }),
                      new TableCell({
                        children: [new Paragraph(product.Qo.toFixed(2))],
                        borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      }),
                      new TableCell({
                        children: [new Paragraph(product.SS.toFixed(2))],
                        borders: { top: { style: "single" }, bottom: { style: "single" }, left: { style: "single" }, right: { style: "single" } },
                      }),
                    ],
                  })
                ),
              ],
            }),
          ],
        },
      ],
    });
  
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'product-table.docx';
    link.click();
  };
    

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li><Link to="/">Enter Product</Link></li>
            <li><Link to="/table">View Table</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Form addProduct={addProduct} />} />
          <Route path="/table" element={<ProductTable products={products} exportToPDF={exportToPDF} exportToWord={exportToWord} deleteProduct={deleteProduct} clearTable={clearTable} />} />
        </Routes>
      </div>
    </Router>
  );
}

const ProductTable = ({ products, exportToPDF, exportToWord, deleteProduct, clearTable }) => {
  return (
    <div>
      <h2>Product Table</h2>

      {/* Scrollable container for horizontal overflow */}
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>CA</th>
              <th>SS</th>
              <th>Qo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td>{product.productName}</td>
                <td>{product.CA.toFixed(2)}</td>
                <td>{product.SS.toFixed(2)}</td>
                <td>{product.Qo.toFixed(2)}</td>
                <td>
                  <button onClick={() => deleteProduct(index)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="export-buttons">
        <button onClick={exportToPDF}>Export to PDF</button>
        <button onClick={exportToWord}>Export to Word</button>
        <button onClick={clearTable}>Clear Table</button>
      </div>
    </div>
  );
};


export default App;
