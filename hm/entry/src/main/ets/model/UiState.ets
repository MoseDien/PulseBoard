import { UserProfile } from './UserProfile';

export interface HomeUiState {
  users: UserProfile[];
  isLoading: boolean;
  errorMessage: string;
}

export interface DetailUiState {
  user?: UserProfile;
  isLoading: boolean;
  errorMessage: string;
}
