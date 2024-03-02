import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Check(){
  const [selectedDate, setSelectedDate] = useState(null);

  const handleChange = date => {
    setSelectedDate(date);
  };

  function see(e){
    console.log(selectedDate);
  }

  return (
    <div style={{position:'relative',left:'90px'}}>
      <DatePicker
        onChange={handleChange}
        selected={selectedDate}
        dateFormat="dd/MM/yyyy"
        showYearDropdown
        showMonthDropdown
        scrollableYearDropdown
        maxDate={new Date()}
        placeholderText='dd/mm/yyyy'
        yearDropdownItemNumber={15}
        isClearable
        onSelect={see}
      />
    </div>
  );
};

