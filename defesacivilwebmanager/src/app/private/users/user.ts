export class User {
  user_id: number;
  profile_id: number;
  name: string;
  email: string;
  password: string;
  status: number = 1;
  receive_notification: boolean;
  created_at: Date;
  updated_at: Date;

}
