import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useEditScheduleMutation, useGetScheduleByIdQuery } from '../../app/services/scheduleApi';
import { Schedule, Subject, Class, LessonTime } from '../../app/types';
import { GoBack } from "../../components/go-back";
import { useGetAllSubjectsQuery } from '../../app/services/subjectsApi'; // Импорт хука для получения списка предметов
import { useGetAllClassesQuery } from '../../app/services/classesApi'; // Импорт хука для получения списка классов
import { useGetAllLessonTimesQuery } from '../../app/services/lessonTimeApi'; // Импорт хука для получения списка времен уроков

export const EditSchedule = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [updatedData, setUpdatedData] = useState<Schedule | null>(null);
  const [editSchedule, { isLoading, isError }] = useEditScheduleMutation();
  const { data: scheduleData, error: scheduleError, isLoading: scheduleLoading } = useGetScheduleByIdQuery(id || '');

  const [subjects, setSubjects] = useState<Subject[]>([]);
  const { data: subjectsData } = useGetAllSubjectsQuery();
 
  const [classes, setClasses] = useState<Class[]>([]);
  const { data: classesData } = useGetAllClassesQuery();

  const [lessonTimes, setLessonTimes] = useState<LessonTime[]>([]);
  const { data: lessonTimesData } = useGetAllLessonTimesQuery();

  useEffect(() => {
    if (scheduleData) {
      setUpdatedData(scheduleData);
    }
  }, [scheduleData]);

  useEffect(() => {
    if (scheduleError) {
      console.error('Error fetching schedule:', scheduleError);
    }
  }, [scheduleError]);

  useEffect(() => {
    if (subjectsData) {
      setSubjects(subjectsData.subjects);
    }
    if (classesData) {
      setClasses(classesData);
    }
    if (lessonTimesData) {
      setLessonTimes(lessonTimesData);
    }
  }, [subjectsData, classesData, lessonTimesData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUpdatedData(prevData => {
      if (!prevData) return null;
      return {
        ...prevData,
        [name]: parseInt(value),
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!updatedData) return;

    try {
      await editSchedule({ scheduleId: id!, updatedData }).unwrap();
      navigate('/schedule');
    } catch (error) {
      console.error('Error editing schedule:', error);
    }
  };

  if (scheduleLoading) return <div>Loading...</div>;
  if (scheduleError) return <div>Error fetching schedule</div>;

  return (
    <div className="modal">
      <div className="modal-content">
        <GoBack />
        <h2 className="text-2xl font-bold mb-4">Edit Schedule</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="classId" className="block text-sm font-semibold">Class:</label>
            <select id="classId" name="classId" value={updatedData?.classId} onChange={handleSelectChange} className="border border-gray-300 rounded-md p-2 w-full">
              {classes.map(classItem => (
                <option key={classItem.id} value={classItem.id}>{classItem.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-semibold">Date:</label>
            <input type="date" id="date" name="date" value={updatedData?.date} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4">
            <label htmlFor="teacherId" className="block text-sm font-semibold">Teacher ID:</label>
            <input type="text" id="teacherId" name="teacherId" value={updatedData?.teacherId} onChange={handleChange} className="border border-gray-300 rounded-md p-2 w-full" />
          </div>
          <div className="mb-4"> 
            <label htmlFor="lessonTimeId" className="block text-sm font-semibold">Lesson Time:</label>
            <select id="lessonTimeId" name="lessonTimeId" value={updatedData?.lessonTimeId} onChange={handleSelectChange} className="border border-gray-300 rounded-md p-2 w-full">
              {lessonTimes.map(time => (
                <option key={time.id} value={time.id}>{time.startTime} - {time.endTime}</option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="subjectId" className="block text-sm font-semibold">Subject:</label>
            <select id="subjectId" name="subjectId" value={updatedData?.subjectId} onChange={handleSelectChange} className="border border-gray-300 rounded-md p-2 w-full">
              {subjects.map(subject => (
                <option key={subject.id} value={subject.id}>{subject.name}</option>
              ))}
            </select>
          </div>
          <button type="submit" disabled={isLoading} className="bg-blue-500 text-white px-4 py-2 rounded-md">Submit</button>
          {isError && <div>Error editing schedule</div>}
        </form>
      </div>
    </div>
  );
};
