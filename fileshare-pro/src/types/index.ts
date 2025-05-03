export interface User {
  id: string;
  username: string;
  displayName: string;
  email: string;
}

export interface FileMetadata {
  id: string;
  name: string;
  size: number;
  type: string;
  owner: string;
  uploadDate: string;
  url?: string;
}

export interface ShareKey {
  id: string;
  fileId: string;
  key: string;
  expirationDate: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
}
