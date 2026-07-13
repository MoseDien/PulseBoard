import Combine
import Foundation

@MainActor final class PulseViewModel: ObservableObject {
  @Published private(set) var homeState = HomeUIState()
  private let loadUsers: LoadUsersUseCase
  private let loadDetail: LoadUserDetailUseCase
  init(repository: UserRepositoryProtocol = UserRepository()) {
    loadUsers = LoadUsersUseCase(repository: repository)
    loadDetail = LoadUserDetailUseCase(repository: repository)
    homeState = HomeUIState(users: loadUsers.execute(), isLoading: false)
  }
  func detail(for id: Int) -> DetailUIState {
    guard let user = loadDetail.execute(id: id) else {
      return DetailUIState(user: nil, isLoading: false, errorMessage: "没有找到这位朋友")
    }
    return DetailUIState(user: user, isLoading: false)
  }
}
