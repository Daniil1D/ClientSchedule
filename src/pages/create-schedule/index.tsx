import React from 'react';
import { CreateSchedule } from '../../components/create-schedule';

export const CreateSchedulePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Добавление нового расписания</h2>
      <CreateSchedule />
    </div>
  );
};