/**
 * interFace
 */
export interface Post{
  id: number;
  title: string;
  content: string;
  author: string;
  createdDt: string;
}

export interface Files {
  id:number;
  filename:string;
  filepath:string;
  mimetype:string;
  originalname:string;
  size:number;
}

export interface Post_Files {
  ok: boolean;
  posts: Post;
  files: Files[];
}

// 회원가입
export interface SignData {
  userId: string;
  password: string;
  isSuccess: boolean;
}

export interface ImgData {
  ok: boolean;
  results: Files[];
}