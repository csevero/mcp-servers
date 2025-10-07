type StatusObject = {
  id: string;
  status: string;
  color: string;
  orderindex: number;
  type: string;
};

type User = {
  id: number;
  username: string;
  color: string;
  initials?: string;
  email: string;
  profilePicture: string | null;
};

type DropdownOption = {
  id: string;
  name?: string;
  label?: string;
  color: string | null;
  orderindex: number;
};

type TypeConfig = {
  sorting?: string;
  new_drop_down?: boolean;
  options?: DropdownOption[];
  single_user?: boolean;
  include_groups?: boolean;
  include_guests?: boolean;
  include_team_members?: boolean;
  tracking?: {
    subtasks: boolean;
    checklists: boolean;
    archived_subtasks: boolean;
    assigned_comments: boolean;
  };
  complete_on?: number;
  subtask_rollup?: boolean;
  fields?: any[];
  default?: number;
  placeholder?: string | null;
};

type CustomField = {
  id: string;
  name: string;
  type: string;
  type_config: TypeConfig;
  date_created: string;
  hide_from_guests: boolean;
  required: boolean;
  value?:
    | {
        percent_complete?: number;
      }
    | string;
  value_richtext?: string;
};

type Attachment = {
  id: string;
  date: Date;
  title: string;
  type: number;
  source: number;
  version: number;
  extension: string;
  thumbnail_small: string;
  thumbnail_medium: string;
  thumbnail_large: string;
  is_folder: boolean | null;
  mimetype: string;
  hidden: boolean;
  parent_id: string;
  size: number;
  total_comments: number;
  resolved_comments: number;
  user: User;
  deleted: boolean;
  orientation: string | null;
  url: string;
  email_data: string | null;
  workspace_id: number | null;
  url_w_query: string;
  url_w_host: string;
};

export type GetTaskByCustomIdResponse = {
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
  custom_fields: CustomField[];
  attachments: Attachment[];
};
