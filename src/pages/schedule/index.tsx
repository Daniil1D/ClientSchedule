import React, { useState } from 'react';
import { useGetScheduleByClassIdQuery } from '../../app/services/scheduleApi';
import { Schedule } from '../../app/types';
import { CreateSchedule } from "../../components/create-schedule";

export const AllSchedules = ({ userRole }: { userRole: string }) => {
  const [selectedClass, setSelectedClass] = useState<string>('1'); // Default class selected
  const { data: schedules, isLoading, isError } = useGetScheduleByClassIdQuery(selectedClass);

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Error fetching schedules</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">All Schedules</h2>
      <div className="mb-4">
        <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700">
          Select Class:
        </label>
        <select
          id="classSelect"
          name="classSelect"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedClass}
          onChange={handleClassChange}
        >
         <option value="1">1а</option>
          <option value="2">1б</option>
          <option value="3">1в</option>
          <option value="4">2а</option>
          <option value="5">2б</option>
          <option value="6">2в</option>
          <option value="7">3а</option>
          <option value="8">3б</option>
          <option value="9">3в</option>
          <option value="10">4а</option>
          <option value="11">4б</option>
          <option value="12">4в</option>
          <option value="13">5а</option>
          <option value="14">5б</option>
          <option value="15">5в</option>
          <option value="16">6а</option>
          <option value="17">6б</option>
          <option value="18">6в</option>
          <option value="19">7а</option>
          <option value="20">7б</option>
          <option value="21">7в</option>
          <option value="22">8а</option>
          <option value="23">8б</option>
          <option value="24">8в</option>
          <option value="25">9а</option>
          <option value="26">9б</option>
          <option value="27">9в</option>
          <option value="28">10а</option>
          <option value="29">10б</option>
          <option value="30">10в</option>
          <option value="31">11а</option>
          <option value="32">11б</option>
          <option value="33">11в</option>
        </select>
      </div>
      {userRole === 'Заместитель Директора' && ( 
        <div className="mb-10 w-full flex">
          <CreateSchedule />
        </div>
      )}
      <table className="w-full border-collapse border border-black">
        <thead>
          <tr className="bg-black text-white">
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Subject</th>
            <th className="p-4 text-left">Time</th>
            <th className="p-4 text-left">Teacher</th>
          </tr>
        </thead>
        <tbody>
          {schedules && schedules.map((schedule: Schedule, index: number) => (
            <tr key={schedule.id} className={(index + 1) % 2 === 0 ? 'border-black' : ''}>
              <td className="p-4">{index + 1}</td>
              <td className="p-4">{schedule.date}</td>
              <td className="p-4">{schedule.subject.name}</td>
              <td className="p-4">{`${schedule.lessonTime.startTime}-${schedule.lessonTime.endTime}`}</td>
              <td className="p-4">{schedule.teacher.fullName}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};