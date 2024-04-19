import React from "react";
import { useLocation } from "react-router-dom";

export const Detailed_record = () => {
    const location = useLocation();
    // Access recordId and recordType from props
    const dta = location.state.data;
  
    // You can directly print them or use them in any way you want
    console.log("Record ID:", dta.id);
  
    // Display detailed information here
    return (
      <div>
        {/* Display detailed information here */}
        <p>Record ID: {dta}</p>
      </div>
    );
}

export default Detailed_record;
