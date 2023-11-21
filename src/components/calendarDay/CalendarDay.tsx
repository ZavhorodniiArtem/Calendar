import React, {useState} from 'react';
import {RiDeleteBinLine} from 'react-icons/ri';
import useDate from '../../hooks/useDate';
import {CalendarDayProps} from "@/components/calendarDay/types/types";

const CalendarDay = ({date, tasks, onAddTask}: CalendarDayProps) => {
  const {
    formattedDate,
    dayOfWeek,
    isFutureDay,
    isCurrentMonth,
    isTodayDate,
    isPastDay,
  } = useDate(date);
  const [newTask, setNewTask] = useState('');
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);

  const isEditing = editingTaskIndex !== null;
  const buttonText = isEditing ? 'Save' : 'Add';

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      let updatedTasks: string[];

      if (isEditing) {
        updatedTasks = [...tasks];
        updatedTasks[editingTaskIndex] = newTask;
      } else {
        updatedTasks = [...tasks, newTask];
      }

      onAddTask(date, updatedTasks);
      setEditingTaskIndex(null);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index: number) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    onAddTask(date, updatedTasks);
  };

  const handleDoubleClick = (index: number) => {
    setNewTask(tasks[index]);
    setEditingTaskIndex(index);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className={`border p-2 w-40 h-60 flex flex-col ${isTodayDate && 'bg-green-100'} ${!isTodayDate && isPastDay && 'opacity-50 cursor-not-allowed'}`}>
      <div
        className={`mb-1 text-lg font-bold ${isFutureDay && !isCurrentMonth && 'text-gray-400'}`}>
        {formattedDate} {dayOfWeek}
      </div>
      <div className={`flex-grow overflow-auto`}>
        {tasks.map((task, index) => (
          <div key={index} className="relative">
            <div
              className="bg-gray-200 p-1 mb-1 cursor-pointer"
              onDoubleClick={() => handleDoubleClick(index)}
            >
              {task}
            </div>
            <RiDeleteBinLine
              className="absolute top-2 right-2 cursor-pointer text-red-500"
              onClick={() => handleDeleteTask(index)}
            />
          </div>
        ))}
      </div>
      {!isPastDay && (
        <div>
          <input
            type="text"
            className="p-1 border rounded-md w-full mb-2"
            placeholder="Add task"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className={`p-1 ${isEditing ? 'bg-blue-500' : 'bg-green-500'} text-white rounded-md w-full`}
            onClick={handleAddTask}
          >
            {buttonText}
          </button>
        </div>
      )}
      {isTodayDate && (
        <div className="text-lg text-green-700">Today has come!</div>
      )}
      {isPastDay && (
        <div className="text-sm text-gray-500">
          {isTodayDate ? null : "Cannot add tasks to past days"}
        </div>
      )}
    </div>
  );
};

export default CalendarDay;