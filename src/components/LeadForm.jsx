import React, { useState } from 'react';
import { validateNotEmpty, validatePhone, validateMail } from '../helpers/ValidateForm';

const LeadForm = () => {

  const [formFields, setFormFields] = useState ({ name: '', company: '', phone: '', email: '', terms: false });
  const [validationText, setValidationText] = useState({ name: '', company: '', phone: '', email: '', terms: false })

  // Handle changes in input fields:
  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "terms") {
    //   console.log('name: ', name, '. value: ', value)
    }
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle click on download button:
  const download = () => {
    if (!validateForm()) {
      return;
    }
    else {
      // Go to server...
    }
  };

  const validateForm = () => {
    // Check every field:
      // validatePhone(formFields.phone)
      // validateMail(formFields.email)
      // ...
    // Set validationText state 
  };

  return (
    <section className="form-lead">
      <h3>Want to get the full version?</h3>
      <h5>Fill in the form below:</h5>
      <div className="input-wrapper">
          <input
            placeholder="Full name"
            id="name"
            name='name'
            value={formFields.name}
            onChange={handleChange}
          />
          { validationText.name && <label htmlFor="name">validation text</label> }
      </div>
      <div className="input-wrapper">
          <input
            placeholder="Company name"
            id="company"
            name='company'
            value={formFields.company}
            onChange={handleChange}
          />
          { validationText.company && <label htmlFor="company">validation text</label> }
      </div>
      <div className="input-wrapper">
          <input
            type="tel"
            placeholder="Phone"
            id="phone"
            name='phone'
            value={formFields.phone}
            onChange={handleChange}
          />
          { validationText.phone && <label htmlFor="phone">validation text</label> }
      </div>
      <div className="input-wrapper">
          <input
            type="email"
            placeholder="Work email"
            id="email"
            name='email'
            value={formFields.email}
            onChange={handleChange}
          />
          { validationText.email && <label htmlFor="email">validation text</label> }
      </div>
      <button onClick={() => {download()}}>
        Download now &#62;&#62;
      </button>
      <div className="input-wrapper checkbox-wrp">
        <input
          type="checkbox"
          id="terms"
          name='terms'
          value={formFields.terms}
          onChange={handleChange}
        />
        <label htmlFor="terms" className={`${validationText.terms ? "not-valid" : ""}`}>
          I agree to the privacy policy including for Joonko to use my contact details to contact me for marketing purposes.
        </label>
      </div>
    </section>
  )
}

export default LeadForm;
