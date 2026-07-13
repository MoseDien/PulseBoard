final class LoadUsersUseCase {
  private let repository: UserRepositoryProtocol
  init(repository: UserRepositoryProtocol) { self.repository = repository }
  func execute() -> [UserProfile] {
    repository.getUsers().sorted { $0.lastUpdated > $1.lastUpdated }
  }
}
final class LoadUserDetailUseCase {
  private let repository: UserRepositoryProtocol
  init(repository: UserRepositoryProtocol) { self.repository = repository }
  func execute(id: Int) -> UserProfile? { repository.getUser(id: id) }
}
