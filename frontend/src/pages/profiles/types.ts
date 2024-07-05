export interface ProfileInterface {
  avatar: string;
  first_name: string;
  id: number;
  last_name: string;
  note: string;
}

export type NewProfileType = Pick<
  ProfileInterface,
  "first_name" | "last_name" | "note"
>;
