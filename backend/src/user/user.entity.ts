
import { ClassEntity } from 'src/models/class.entity';
import { ExamEntity } from 'src/models/exam.entity';
import { TaskEntity } from 'src/models/task.entity';

export class UserEntity {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  type: string;
}
