import React, { useState, useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import {
  useGetScheduleByClassIdQuery,
  useDeleteScheduleMutation,
} from '../../app/services/scheduleApi';
import { useGetAllTeachersQuery } from '../../app/services/teacherApi';
import { useGetAllSubjectsQuery } from '../../app/services/subjectsApi';
import { useGetAllClassesQuery } from '../../app/services/classesApi';
import { useGetAllLessonTimesQuery } from '../../app/services/lessonTimeApi'; // Добавлено
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../features/user/userSlice';
import { Schedule, Subject, Teacher, Class, LessonTime } from '../../app/types'; // Обновлено

export const AllSchedules = () => {
  const [selectedClass, setSelectedClass] = useState<string>('1а');
  const {
    data: schedules,
    isLoading: isLoadingSchedules,
    isError: isErrorSchedules,
    refetch,
  } = useGetScheduleByClassIdQuery(selectedClass);
  const { data: teachersData, isLoading: isLoadingTeachers, isError: isErrorTeachers } =
    useGetAllTeachersQuery();
  const { data: subjectsData, isLoading: isLoadingSubjects, isError: isErrorSubjects } =
    useGetAllSubjectsQuery();
  const { data: classesData, isLoading: isLoadingClasses, isError: isErrorClasses } =
    useGetAllClassesQuery();
  const { data: lessonTimesData, isLoading: isLoadingLessonTimes, isError: isErrorLessonTimes } =
    useGetAllLessonTimesQuery(); // Добавлено

  const navigate = useNavigate();
  const currentUserRole = useSelector(selectUserRole);
  const [deleteScheduleMutation] = useDeleteScheduleMutation();

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleEditSchedule = (schedule: Schedule) => {
    navigate(`/editSchedule/${schedule.id}`);
  };

  const groupSchedulesByDayOfWeek = (schedules: Schedule[] | undefined) => {
    if (!schedules) return {};

    const groupedSchedules: { [date: string]: Schedule[] } = {};
    schedules.forEach((schedule) => {
      const scheduleDate = new Date(schedule.date);
      const key = scheduleDate.toISOString().split('T')[0];
      if (!groupedSchedules[key]) {
        groupedSchedules[key] = [];
      }
      groupedSchedules[key].push(schedule);
    });
    return groupedSchedules;
  };

  const handleDeleteSchedule = async (scheduleId: string) => {
    try {
      await deleteScheduleMutation(scheduleId);
      refetch();
    } catch (error) {
      console.error('Error deleting schedule:', error);
    }
  };

  useEffect(() => {
    refetch();
  }, [selectedClass, refetch]);

  if (
    isLoadingSchedules ||
    isLoadingTeachers ||
    isLoadingSubjects ||
    isLoadingClasses ||
    isLoadingLessonTimes
  ) {
    return <div>Loading...</div>;
  }

  if (
    isErrorSchedules ||
    isErrorTeachers ||
    isErrorSubjects ||
    isErrorClasses ||
    isErrorLessonTimes
  ) {
    return <div>Error fetching data</div>;
  }

  const subjects = subjectsData?.subjects?.reduce((acc, subject) => {
    acc[subject.id] = subject;
    return acc;
  }, {} as Record<number, Subject>) || {};

  const teachers = teachersData?.reduce((acc, teacher) => {
    acc[teacher.id] = teacher;
    return acc;
  }, {} as Record<number, Teacher>) || {};

  const classes = classesData?.reduce((acc, classItem) => {
    acc[classItem.id] = classItem;
    return acc;
  }, {} as Record<number, Class>) || {};

  const lessonTimes = lessonTimesData?.reduce((acc, lessonTime) => {
    acc[lessonTime.id] = lessonTime;
    return acc;
  }, {} as Record<number, LessonTime>) || {};

  const renderSchedulesByDate = (
    groupedSchedules: Record<string, Schedule[]>,
    subjects: Record<number, Subject>,
    teachers: Record<number, Teacher>,
    classes: Record<number, Class>,
    lessonTimes: Record<number, LessonTime>, // Добавлено
    currentUserRole: string,
    handleEditSchedule: (schedule: Schedule) => void
  ) => {
    return Object.entries(groupedSchedules).map(([date, schedules]) => (
      <div key={date}>
        <h3>{date}</h3>
        <table className="w-full border-collapse border border-black">
          <tbody>
            {schedules.map((schedule: Schedule, index: number) => (
              <tr key={schedule.id} className={(index + 1) % 2 === 0 ? 'border-black' : ''}>
                <td className="p-4">{index + 1}</td>
                <td className="p-4 w-2/5">{schedule.date}</td>
                <td className="p-4 w-2/5">{subjects[schedule.subjectId]?.name || 'N/A'}</td>
                <td className="p-4 w-2/5">{`${lessonTimes[schedule.lessonTimeId]?.startTime} - ${lessonTimes[schedule.lessonTimeId]?.endTime}` || 'N/A'}</td> {/* Используем время урока */}
                <td className="p-4 w-2/5">{teachers[schedule.teacherId]?.fullName || 'N/A'}</td>
                <td className="p-4 w-2/5">{classes[schedule.classId]?.name || 'N/A'}</td>

                {currentUserRole === 'Заместитель Директора' && (
                  <td className="p-4 w-2/5">
                    <button onClick={() => handleEditSchedule(schedule)}><FaEdit/></button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ));
  };

  const groupedSchedules = groupSchedulesByDayOfWeek(schedules);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Все расписания</h2>
      <div className="mb-4">
        <label htmlFor="classSelect" className="block text-sm font-medium text-gray-700">
          Выберите класс:
        </label>
        <select
          id="classSelect"
          name="classSelect"
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          value={selectedClass}
          onChange={handleClassChange}
        >
          {/* Options for selecting classes */}
          {/* Replace with your actual class options */}
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

      {/* Render schedules */}
      {renderSchedulesByDate(groupedSchedules, subjects, teachers, classes, lessonTimes, currentUserRole, handleEditSchedule)}
    </div>
  );
};
