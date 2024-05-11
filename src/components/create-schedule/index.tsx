import React, { useState } from 'react';
import { useCreateScheduleMutation } from '../../app/services/scheduleApi';

export const CreateSchedule = () => {
  const [classId, setClassId] = useState('');
  const [date, setDate] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [lessonTimeId, setLessonTimeId] = useState('');
  const [subjectId, setSubjectId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createSchedule] = useCreateScheduleMutation();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await createSchedule({
        classId,
        date,
        teacherId,
        lessonTimeId,
        subjectId,
      });

      // Очищаем поля после успешного создания расписания
      setClassId('');
      setDate('');
      setTeacherId('');
      setLessonTimeId('');
      setSubjectId('');
    } catch (error) {
      console.error('Error creating schedule:', error);
      setError('Error creating schedule');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
           <label htmlFor="classId" className="block text-sm font-medium text-gray-700">Class ID:</label>
          <input
            type="text"
            id="classId"
            name="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
          <input
            type="text"
            id="date"
            name="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Teacher ID:</label>
          <input
            type="text"
            id="teacherId"
            name="teacherId"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lessonTimeId" className="block text-sm font-medium text-gray-700">Lesson Time ID:</label>
          <input
            type="text"
            id="lessonTimeId"
            name="lessonTimeId"
            value={lessonTimeId}
            onChange={(e) => setLessonTimeId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="subjectId" className="block text-sm font-medium text-gray-700">Subject ID:</label>
          <input
            type="text"
            id="subjectId"
            name="subjectId"
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Schedule'}
        </button>
      </form>
    </div>
  );
};
