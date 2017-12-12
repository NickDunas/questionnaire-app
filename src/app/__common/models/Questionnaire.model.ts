import { Section } from './Section.model';

export interface Questionnaire {
  id: number;
  title: string;
  description: string;
  sections?: Section[];
  syncing?: boolean;
}
