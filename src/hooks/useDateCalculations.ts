import { useState } from 'react';

const useDateCalculations = (initialDate: Date) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const daysInMonth = new Array(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate())
    .fill(null)
    .map((_, index) => new Date(selectedDate.getFullYear(), selectedDate.getMonth(), index + 1));

  const addMonths = (months: number) => {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear(), prevDate.getMonth() + months, 1));
  };

  const addYears = (years: number) => {
    setSelectedDate((prevDate) => new Date(prevDate.getFullYear() + years, prevDate.getMonth(), 1));
  };

  const format = (date: Date, dateFormat: string) => {
    return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
  };

  return {
    selectedDate,
    daysInMonth,
    addMonths,
    addYears,
    format,
  };
};

export default useDateCalculations;