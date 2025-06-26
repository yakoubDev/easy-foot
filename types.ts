
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