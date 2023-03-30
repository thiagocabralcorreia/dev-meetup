import { EventSchema } from "./event";
import { UserSchema } from "./user";

export interface EventRequestchema {
  id: string;
  _id: string;
  user: UserSchema;
  event: EventSchema;
}
