import React, { useState } from 'react';
import './Form.css';

function Form({ addProduct }) {
  const [formData, setFormData] = useState({
    productName: '',
    CT: '',
    Rm: '',
    Dos: '',
    LT: 0.5,
    PP: 1,
    Si: '',
    So: ''
  });

  const [results, setResults] = useState({
    CA: 0,
    SS: 0,
    Qo: 0
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateResults = () => {
    const { CT, Rm, Dos, LT, PP, Si, So } = formData;
  
    let CA = parseFloat(CT) / (parseFloat(Rm) - (parseFloat(Dos) / 30.5));
    CA = Math.round(CA);
  
    let SS = CA * parseFloat(LT);
    SS = Math.round(SS);
  
    let Qo = CA * (parseFloat(LT) + parseFloat(PP)) + SS - (parseFloat(Si) + parseFloat(So));
    Qo = Math.round(Qo * 1.1);
  
    return { CA, SS, Qo };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { CA, SS, Qo } = calculateResults();
    
    addProduct({
      productName: formData.productName,
      CA,
      SS,
      Qo
    });
  
    window.scrollTo(0, 0);
  
    setFormData({
      productName: '',
      CT: '',
      Rm: '',
      Dos: '',
      LT: 0.5,
      PP: 1,
      Si: '',
      So: ''
    });
    setResults({ CA: 0, SS: 0, Qo: 0 });

    // Show confirmation message
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000); // Hide message after 2 seconds
  };

  const clearForm = () => {
    setFormData({
      productName: '',
      CT: '',
      Rm: '',
      Dos: '',
      LT: 0.5,
      PP: 1,
      Si: '',
      So: ''
    });
    setResults({ CA: 0, SS: 0, Qo: 0 });
    window.scrollTo(0, 0);
  };

  return (
    <div className='form-div'>
      <h2>Enter Product Information</h2>
      {/* Confirmation message */}
      {showConfirmation && (
        <div className="confirmation-message">
          Product added to the table successfully!
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Product Name:
          <input type="text" name="productName" value={formData.productName} onChange={handleChange} required />
        </label>
        <br />
        <label>
          CT (Total Consumption):
          <input type="number" name="CT" value={formData.CT} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Rm (Number of Months):
          <input type="number" name="Rm" value={formData.Rm} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Dos (Days Out of Stock):
          <input type="number" name="Dos" value={formData.Dos} onChange={handleChange} required />
        </label>
        <br />
        <label>
          LT (Lead Time):
          <input type="number" name="LT" value={formData.LT} onChange={handleChange} required />
        </label>
        <br />
        <label>
          PP (Procurement Time):
          <input type="number" name="PP" value={formData.PP} onChange={handleChange} required />
        </label>
        <br />
        <label>
          Si (Quantity in Transit):
          <input type="number" name="Si" value={formData.Si} onChange={handleChange} required />
        </label>
        <br />
        <label>
          So (Stock on Hand):
          <input type="number" name="So" value={formData.So} onChange={handleChange} required />
        </label>
        <br />
        <button type="submit">Add Product</button>
        <button type="button" onClick={clearForm}>Clear Form</button>
      </form>
    </div>
  );
}

export default Form;
