import 'tailwindcss/tailwind.css';
import {format} from 'date-fns';
import useDateCalculations from './hooks/useDateCalculations';
import useLocalStorage from './hooks/useLocalStorage';
import CalendarDay from './components/calendarDay/CalendarDay';

const App = () => {
  const {
    selectedDate,
    daysInMonth,
    addMonths,
    addYears,
    format: formatDate
  } = useDateCalculations(new Date());
  const [tasks, setTasks] = useLocalStorage<{ [key: string]: string[] }>('tasks', {});

  const addTask = (date: Date, updatedTasks: string[]) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [format(date, 'yyyy-MM-dd')]: updatedTasks,
    }));
  };

  const handleNextMonth = () => addMonths(1);
  const handlePrevMonth = () => addMonths(-1);
  const handleNextYear = () => addYears(1);
  const handlePrevYear = () => addYears(-1);

  return (
    <div className="flex flex-col py-6 px-20">
      <div className="flex justify-center items-center">
        <button className="mr-3" onClick={handlePrevYear}>&lt;&lt;</button>
        <button className="mr-3" onClick={handlePrevMonth}>&lt;</button>
        <div className="text-xl font-bold">
          {formatDate(selectedDate, 'MMMM yyyy')}
        </div>
        <button className="ml-3" onClick={handleNextMonth}>&gt;</button>
        <button className="ml-3" onClick={handleNextYear}>&gt;&gt;</button>
      </div>
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {
          daysInMonth.map((day, index) => (
            <CalendarDay
              key={index}
              date={day}
              tasks={tasks[format(day, 'yyyy-MM-dd')] || []}
              onAddTask={addTask}
            />
          ))
        }
      </div>
    </div>
  );
};

export default App;
