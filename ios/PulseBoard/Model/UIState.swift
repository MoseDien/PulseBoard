struct HomeUIState {
  var users: [UserProfile] = []
  var isLoading = true
  var errorMessage: String?
}
struct DetailUIState {
  var user: UserProfile?
  var isLoading = true
  var errorMessage: String?
}
