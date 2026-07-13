import Foundation

struct MediaItem: Identifiable, Hashable {
  let id = UUID()
  let title: String
  let meta: String
  let emoji: String
}
struct Book: Identifiable, Hashable {
  let id = UUID()
  let title: String
  let author: String
  let colorHex: String
}
struct UserProfile: Identifiable, Hashable {
  let id: Int
  let name: String
  let handle: String
  let avatar: String
  let avatarImage: String?
  let avatarColor: String
  let bio: String
  let lastUpdated: Date
  let mood: String
  let books: [Book]
  let movies: [MediaItem]
  let places: [MediaItem]
  let podcasts: [MediaItem]
}
