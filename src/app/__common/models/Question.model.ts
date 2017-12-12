export interface Question {
  id: number;
  section_id?: number;
  text: string;
  input_type: number;
  available_values: string;
  order: number;
  syncing?: boolean;
}
