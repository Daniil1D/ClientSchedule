// Role interface
export interface Role {
  id: number;
  name: string;
}

// User interface 
export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  avatarUrl: string;
  roleId: number;
  class?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
}

// Post interface
export interface Post {
  id: number;
  content: string;
  authorId: number;
  createdAt: Date;
  updatedAt: Date;
}

// Comment interface
export interface Comment {
  id: number;
  content: string;
  userId: number;
  postId: number;
  scheduleId: number;
}

// Subject interface
export interface Subject {
  id: number;
  name: string;
}

// Teacher interface
export interface Teacher {
  id: number;
  fullName: string;
}

// Class interface
export interface Class {
  id: number;
  name: string;
}

// Schedule interface
export interface Schedule {
  id: number;
  classId: number;
  date: string;
  teacherId: number;
  lessonTimeId: number;
  subjectId: number;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;
}

// LessonTime interface
export interface LessonTime {
  id: number;
  lessonNumber: number;
  startTime: string;
  endTime: string;
}