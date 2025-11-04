export interface ResponseRegisterHttp {
  ok: boolean;
  user: User;
  message: string;
  token: string;
}

export interface User {
  createdAt: string;
  email: string;
  fullName: string;
  id: string;
  isActive: boolean;
  roles: Role[];
  updatedAt: string;
}

export interface Role {
  id: string;
  roleId: string;
  userId: string;
}

export interface ResponseLoginHTTP {
  ok: boolean;
  token: string;
  user: UserLogin;
  message?: string;
}

export interface UserLogin {
  id: string;
  email: string;
  fullName: string;
  roles: string[];
}

export interface ResponseValidateToken {
  ok: boolean;
  id: string;
  email: string;
  fullName: string;
  isActive: boolean;
  roles: string[];
}

export interface ResponseUploadSong {
  ok: boolean;
  song: Song;
}

export interface Song {
  id:        string;
  name:      string;
  artist:    string;
  filename:  string;
  mimetype:  string;
  path:      string;
  createdAt: Date;
}

export interface ResponseSongs {
  id:        string;
  name:      string;
  artist:    string;
  filename:  string;
  mimetype:  string;
  path:      string;
  pathImage: string;
  createdAt: Date;
  userId:    string;
}

export interface ResponseDelete {
  ok:        boolean;
  message:   string;
  error?:     string;
  statusCode?: number;
}
