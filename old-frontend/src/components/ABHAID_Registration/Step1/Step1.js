import React from 'react';
import './Step1.css';
const Step1 = ({ aadharNumber, changeAadharNumber, iAgree, handleSubmit, setIAgree }) => {
  return (
    <div className='Stage-1'>
      <form onSubmit={handleSubmit}>
        <label>
          Enter Aadhar Number:
          <input
            type="text"
            value={aadharNumber}
            onChange={changeAadharNumber}
            placeholder="XXXX XXXX XXXX"
            maxLength={14}
          />
        </label>
        <p className="TermsAndConditionsTitle">TermsAndConditions</p>
        <div className='TermsAndConditions'>
          I hereby declare that I am volutuntarily sharing my Aadhaar number and demographic information issued by UIDAL, with National Health Authority (NHA) for the sole purpose of creation of ABHA number. I understand that my ABHA number can be used and shared for purposes as may be notified by ABDM from time to time including provision of healthcare services. Further, I am aware that my personal identifiable information Name, Address, Age, Date of Birth, Gender and Photographs may be made available to the entities working in the National Digital Health Ecosystem (NDHE) which intern also includes stakeholders and entities such as healthcare professionas (e.g. doctors), facilities (e.g. hospitals, laboratories) and data fiduciaries (e.g. health programmes), which are registered with or linked to the Ayushman Bharat Digital Mission (ABDM) and various processes there under. I authorize NHA to
        </div>
        <label>
          <input
            type="checkbox"
            checked={iAgree}
            onChange={() => setIAgree(!iAgree)}
          />
          I agree
        </label>
        <br />
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default Step1;
