export interface CalendarDayProps {
  date: Date;
  tasks: string[];
  onAddTask: (date: Date, tasks: string[]) => void;
}
