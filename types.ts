import { Types } from "mongoose";

export interface User {
  _id: string;
  email: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
}

export interface StadiumType {
  _id?: string;
  name: string;
  owner: string;
  ownerName: string;
  phone: string;
  wilaya: string;
  location: string;
  maxPlayers: number;
  price: number;
  image: string;
  openingTime: string; // HH:MM
  closingTime: string; // HH:MM
}



export interface IContactInfo {
  name: string | null;
  phone: string | null;
}


export interface ISchedule {
  stadiumId: Types.ObjectId;
  dayOfWeek: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  timeSlot: string;
  isAvailable: boolean;
  bookedBy: string | null;
  bookedAt: Date | null;
  contactInfo: IContactInfo;
  notes: string;
  status: 'available' | 'booked' | 'blocked';
}