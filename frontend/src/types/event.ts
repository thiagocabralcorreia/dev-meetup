export interface EventSchema {
  id: string;
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  place: string;
  thumbnail?: string;
  thumbnail_url: string;
  date: string;
  user: string;
}
