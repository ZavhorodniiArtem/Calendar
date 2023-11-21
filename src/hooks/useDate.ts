import { useState, useEffect } from 'react';
import {addMonths, addYears, endOfMonth, format, isSameMonth, isToday} from 'date-fns';

const useDate = (initialDate: Date) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const formattedDate = format(selectedDate, 'd');
  const dayOfWeek = format(selectedDate, 'iiii');
  const dayOfMonth = selectedDate.getDate();
  const lastDayOfMonth = endOfMonth(selectedDate).getDate();
  const isCurrentMonth = isSameMonth(selectedDate, new Date());
  const isFutureMonth = isSameMonth(selectedDate, addMonths(new Date(), 1));
  const isFutureYear = isSameMonth(selectedDate, addYears(new Date(), 1));
  const isFutureDay = dayOfMonth > lastDayOfMonth && (isFutureMonth || isFutureYear);
  const isPastDay = selectedDate < new Date();
  const isTodayDate = isToday(selectedDate);

  useEffect(() => {
    setSelectedDate(initialDate);
  }, [initialDate]);

  return {
    selectedDate,
    formattedDate,
    dayOfWeek,
    isCurrentMonth,
    isFutureMonth,
    isFutureYear,
    isFutureDay,
    isPastDay,
    isTodayDate,
  };
};

export default useDate;