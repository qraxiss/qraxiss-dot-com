import { DatePicker } from "@/components/shared/form/Datepicker";

const now = new Date();

console.log(now);


const Calendar = () => {
  return (
    <div className="max-w-xs">
      <DatePicker isCalendar defaultValue={now} />
    </div>
  );
};

export { Calendar };
