import React, { useState } from 'react';
import { validateNotEmpty, validatePhone, validateMail } from '../helpers/ValidateForm';
import { initialValidationText } from '../helpers/InitialObjects';
import axios from "axios";

const LeadForm = () => {

  const [formFields, setFormFields] = useState ({ name: '', company: '', phone: '', email: '', terms: false });
  const [validationText, setValidationText] = useState(initialValidationText())

  // Handle changes in input fields:
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "terms") {
      value = e.target.checked;
    }
    setFormFields({ ...formFields, [name]: value });
  };

  // Handle click on download button:
  const download = () => {
    if (!validateForm()) {
      return;
    }
    else {
      sendFormData();
    }
  };

  const sendFormData = () => {
    axios.request({
      method: 'POST',
      url: 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/data',
      data: {
        name: formFields.name,
        company_name: formFields.company,
        email: formFields.email,
        phone: formFields.phone
      },
      headers: {
        'Content-Type':'application/json',
        'x-api-key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM'
      }
    }).then((response) => {
      if (response.data.id === 2) {
        // redirect
        window.location.href = "https://joonko.co/";
      } else if (response.data.id === 1) {
        // continue
        getPdfLink(response.data.id);
      }
      console.log( 'response: ', response.data)
    }).catch(error => {
      console.log('response error: ', error);
      window.location.href = "https://joonko.co/";
    });
  }

  const getPdfLink = (id) => {
    axios.request({
      method: 'GET',
      url: 'https://u5d6gnw6aj.execute-api.us-east-1.amazonaws.com/api/file',
      params: {
        id: id
      },
      headers: {
        'Content-Type':'application/json',
        'x-api-key': 'VXUsgQ2jsq3EM30icjHA91tETkqFwtXDak07xebM'
      }
    }).then((response) => {
      console.log( 'response getPdfLink: ', response.data.link)
      window.location.href = response.data.link;
    }).catch(error => {
      console.log('response error: ', error);
      window.location.href = "https://joonko.co/";
  });
  }

  const validateForm = () => {
    setValidationText(initialValidationText());
    let isValidated = true;
    // Check every field:
      let validPhone = validatePhone(formFields.phone);
      if (!validPhone.status) { isValidated = validPhone.status; setValidationText(state => ({...state, phone: validPhone.text}))}
      let validEmail = validateMail(formFields.email)
      if (!validEmail.status) { isValidated = validEmail.status; setValidationText(state => ({...state, email: validEmail.text}))}
      let validName = validateNotEmpty(formFields.name);
      if (!validName.status) { isValidated = validName.status; setValidationText(state => ({...state, name: validName.text}))}
      let validCompany = validateNotEmpty(formFields.company)
      if (!validCompany.status) { isValidated = validCompany.status; setValidationText(state => ({...state, company: validCompany.text}))}
      let validTerms= formFields.terms; 
      if (!validTerms) { isValidated = validTerms; setValidationText(state => ({...state, terms: validTerms}))}
    // Set validationText state 
      if (!isValidated) {
        return false;
      } else {
      return true;
      }
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
          { validationText.name && <label htmlFor="name">{validationText.name}</label> }
      </div>
      <div className="input-wrapper">
          <input
            placeholder="Company name"
            id="company"
            name='company'
            value={formFields.company}
            onChange={handleChange}
          />
          { validationText.company && <label htmlFor="company">{validationText.company}</label> }
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
          { validationText.phone && <label htmlFor="phone">{validationText.phone}</label> }
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
          { validationText.email && <label htmlFor="email">{validationText.email}</label> }
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
        {}
        <label htmlFor="terms" className={`${validationText.terms ? "" : "not-valid"}`}>
          I agree to the privacy policy including for Joonko to use my contact details to contact me for marketing purposes.
        </label>
      </div>
    </section>
  )
}

export default LeadForm;
