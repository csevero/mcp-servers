import type {
  StatusObject,
  User,
  TaskCustomField,
  Attachment,
  List,
  CustomField,
  TaskComment,
} from "./entities.js";

export type GetTaskByCustomIdOutput = {
  id: string;
  custom_id: string;
  custom_item_id: number;
  name: string;
  text_content: string;
  description: string;
  status: StatusObject;
  orderindex: string;
  date_created: string;
  date_updated: string;
  date_closed: string | null;
  date_done: string | null;
  archived: boolean;
  creator: User;
  assignees: User[];
  group_assignees: any[];
  watchers: User[];
  checklists: any[];
  tags: any[];
  parent: string;
  top_level_parent: string;
  priority: any;
  due_date: any;
  start_date: any;
  points: any;
  time_estimate: any;
  time_spent: number;
  custom_fields: TaskCustomField[];
  attachments: Attachment[];
  list: List;
};

export type GetCustomFieldsOutput = {
  fields: CustomField[];
};

export type GetTaskCommentsOutput = {
  comments: TaskComment[];
};
