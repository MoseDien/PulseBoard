import SwiftUI

struct DetailView: View {
  let state: DetailUIState
  var body: some View {
    Group {
      if let user = state.user {
        ScrollView {
          VStack(alignment: .leading, spacing: 22) {
            HStack(spacing: 16) {
              UserAvatarView(user: user, size: 84, fallbackFont: .largeTitle.bold())
              VStack(alignment: .leading) {
                Text(user.name).font(.title.bold())
                Text(user.handle).foregroundStyle(.secondary)
                Text(user.mood).foregroundStyle(Color(hex: "#3B8B5C"))
              }
            }
            Text(user.bio).foregroundStyle(.secondary)
            MediaSection(
              title: "最近看过的书",
              items: user.books.map { MediaItem(title: $0.title, meta: $0.author, emoji: "📚") })
            MediaSection(title: "最近看过的电影", items: user.movies)
            MediaSection(title: "最近旅行过的地方", items: user.places)
            MediaSection(title: "最近听过的博客", items: user.podcasts)
          }.padding(20)
        }
      } else {
        ContentUnavailableView(
          "无法加载", systemImage: "person.crop.circle.badge.exclamationmark",
          description: Text(state.errorMessage ?? "未知错误"))
      }
    }.navigationTitle(state.user?.name ?? "详情").navigationBarTitleDisplayMode(.inline)
  }
}
private struct MediaSection: View {
  let title: String
  let items: [MediaItem]
  var body: some View {
    VStack(alignment: .leading, spacing: 10) {
      Text(title).font(.headline)
      ScrollView(.horizontal, showsIndicators: false) {
        HStack(spacing: 10) {
          ForEach(items) { item in
            VStack(alignment: .leading, spacing: 6) {
              Text(item.emoji).font(.title)
              Text(item.title).font(.subheadline.bold()).lineLimit(2)
              Text(item.meta).font(.caption).foregroundStyle(.secondary)
            }.frame(width: 138, alignment: .leading).padding(14).background(
              .white, in: RoundedRectangle(cornerRadius: 18))
          }
        }
      }
    }
  }
}
