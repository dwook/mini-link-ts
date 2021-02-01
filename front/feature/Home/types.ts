export interface HomeInfo {
  id: number;
  coverImage: string,
  mainColor?: string,
  introduction: string;
  instagram: string;
  youtube: string;
  website: string;
  UserId: number;
}

export interface HomeState {
  selectedHome?: HomeInfo | null;
  getHomeLoading: boolean;
  getHomeDone: boolean;
  getHomeError?: string;
  editHomeLoading: boolean;
  editHomeDone: boolean;
  editHomeError?: string;
}
