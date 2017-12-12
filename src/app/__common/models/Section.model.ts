import { Question } from './Question.model';

export interface Section {
  id: number;
  questionnaire_id?: number;
  name: string;
  order: number;
  questions: Question[];
  syncing?: boolean;
}
