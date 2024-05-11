export interface User {
  id: string;
  email: string;
  password: string;
  name?: string;
  avatarUrl?: string;
  role: Role ;
  roleId: number;
  class?: string;
  dateOfBirth?: Date;
  createdAt: Date;
  updatedAt: Date;
  bio?: string;
  location?: string;
  posts: Post[]; 
  comments: Comment[];
  createdSchedules: Schedule[];
  schedules: Schedule[]; 
}

export interface Role {
  id: string;
  name: string;
  users: User[];
}

export interface Post {
  id: string;
  content: string;
  author: User;
  authorId: string
  createdAt: Date;
  updatedAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  user: User;
  userId: string
  post: Post;
  postId: string
  schedule: Schedule;
}

export interface Subject {
  id: string;
  name: string;
  teachers: TeacherSubject[];
  classes: ClassSubject[];
  schedules: Schedule[];
}

export interface TeacherSubject {
  subject: Subject;
  teacher: Teacher;
}

export interface ClassSubject {
  subject: Subject;
  class: Class;
}

export interface Teacher {
  id: string;
  fullName: string;
  subjects: TeacherSubject[];
}

export interface Class {
  id: string;
  name: string;
  subjects: ClassSubject[];
  schedules: Schedule[];
}

export interface Schedule {
  id: string;
  classId: number;
  date: string;
  teacherId: number;
  teacher: Teacher;
  lessonTimeId: number;
  lessonTime: LessonTime;
  subjectId: number;
  subject: Subject;
  createdBy: User;
  createdById: number;
  class: Class;
  comments: Comment[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LessonTime {
  id: string;
  lessonNumber: number;
  startTime: string;
  endTime: string;
  schedules: Schedule[]; // Добавлено поле schedules типа Schedule[]
}