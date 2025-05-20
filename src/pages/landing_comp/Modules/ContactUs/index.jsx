import React, { useState, useEffect } from "react";
import "./index.scss";
import contactUsImg from "../../assets/images/contact-us-image.png";
import arrowDownIcon from "../../assets/images/arrow-down.png";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    jobTitle: "",
    industry: "",
    companyName: "",
  });

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className='demo_container' id='contact_us_section'>
      <div className='form_wrapper'>
        <div className='form_header'>
          <h1>Complete the</h1>
          <h1>Form to Request a Demo</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className='input_row'>
            <input type='text' name='firstName' placeholder='Name' value={formData.firstName} onChange={handleChange} className='form_input' />
            <input type='text' name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} className='form_input' />
          </div>

          <div className='input_row'>
            <input type='tel' name='phone' placeholder='Phone' value={formData.phone} onChange={handleChange} className='form_input' />

            <input
              type='text'
              name='jobTitle'
              placeholder='Director of Services'
              value={formData.jobTitle}
              onChange={handleChange}
              className='form_input'
            />
          </div>

          <div className='input_row single'>
            <div className='select_wrapper'>
              <select name='industry' value={formData.industry} onChange={handleChange} className='form_select'>
                <option value='' disabled selected>
                  Industry
                </option>
                <option value='construction'>Construction</option>
                <option value='technology'>Technology</option>
                <option value='healthcare'>Healthcare</option>
                <option value='manufacturing'>Manufacturing</option>
                <option value='other'>Other</option>
              </select>
              <span className='dropdown_icon'>
                <img src={arrowDownIcon} alt='arrowDownIcon' />
              </span>
            </div>
          </div>

          <div className='input_row single'>
            <input
              type='text'
              name='companyName'
              placeholder='Company Name'
              value={formData.companyName}
              onChange={handleChange}
              className='form_input'
            />
          </div>

          <div className='button_wrapper'>
            <button type='submit' className='submit_button'>
              Request A Demo
            </button>
          </div>
        </form>
      </div>

      {!isMobile && (
        <div className='image_wrapper'>
          <img src={contactUsImg} alt='Construction professional with laptop' className='form_image' />
        </div>
      )}
    </div>
  );
};

export default ContactForm;
