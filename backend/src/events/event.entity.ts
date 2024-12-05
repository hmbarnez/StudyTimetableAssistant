import { ClassEntity } from '../models/class.entity';
import { ExamEntity } from '../models/exam.entity';
import { TaskEntity } from '../models/task.entity';

export class EventEntity {
  subjectName: string;
  startingDate: string;
  startingTime: string;
  endingDate: string;
  endingTime: string;
  type: 'class' | 'exam' | 'task'; // Type of event

  // Depending on the type, only one of these will be populated
  class?: ClassEntity;    // Optional: Only if type is 'class'
  exam?: ExamEntity;      // Optional: Only if type is 'exam'
  task?: TaskEntity;      // Optional: Only if type is 'task'

  eventDays?: string[];
  taskStudy?: boolean
}
