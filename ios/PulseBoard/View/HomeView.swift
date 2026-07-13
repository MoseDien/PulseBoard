import SwiftUI
import UIKit

struct HomeView: View {
  @ObservedObject var viewModel: PulseViewModel
  @AppStorage("homeStyle") private var listMode = false
  @State private var showSettings = false
  private let page = Color(hex: "#F8F7F2")
  var body: some View {
    NavigationStack {
      Group {
        if viewModel.homeState.isLoading {
          ProgressView()
        } else if listMode {
          List(viewModel.homeState.users) { user in
            NavigationLink(value: user) { UserRow(user: user) }.listRowBackground(Color.clear)
          }.listStyle(.plain)
        } else {
          ScrollView {
            let users = viewModel.homeState.users
            let rows = [
              Array(users.prefix(3)),
              Array(users.dropFirst(3).prefix(2)),
              Array(users.dropFirst(5)),
            ]
            VStack(spacing: 26) {
              ForEach(Array(rows.enumerated()), id: \.offset) { rowIndex, rowUsers in
                HStack(alignment: .top, spacing: rowIndex == 1 ? 24 : 8) {
                  ForEach(rowUsers) { user in
                    NavigationLink(value: user) {
                      UserNode(user: user).frame(maxWidth: .infinity)
                    }
                    .buttonStyle(.plain)
                    .offset(y: rowIndex == 1 ? 8 : (user.id.isMultiple(of: 2) ? 4 : -2))
                  }
                }
              }
            }
            .padding(.horizontal, 14)
            .padding(.vertical, 20)
          }
        }
      }
      .background(page).navigationTitle("PulseBoard · 近况").toolbar {
        ToolbarItem(placement: .topBarTrailing) {
          Button {
            showSettings = true
          } label: {
            Image(systemName: "gearshape")
          }
        }
      }.navigationDestination(for: UserProfile.self) { user in
        DetailView(state: viewModel.detail(for: user.id))
      }
    }.tint(Color(hex: "#3B8B5C")).sheet(isPresented: $showSettings) {
      SettingsView(listMode: $listMode)
    }
  }
}

private struct UserNode: View {
  let user: UserProfile
  private var scale: CGFloat {
    [0.90, 1.12, 0.98, 1.16, 0.86, 1.08, 0.94, 1.14][(user.id - 1) % 8]
  }
  var body: some View {
    VStack(spacing: 8) {
      UserAvatarView(
        user: user, size: 104 * scale, fallbackFont: .system(size: 36 * scale, weight: .bold))
      HStack(spacing: 5) {
        StatusBars(date: user.lastUpdated)
        Text(user.name).font(.headline)
      }
    }
  }
}
private struct UserRow: View {
  let user: UserProfile
  var body: some View {
    HStack(spacing: 14) {
      UserAvatarView(user: user, size: 58, fallbackFont: .title2.bold())
      VStack(alignment: .leading) {
        Text(user.name).font(.headline)
        Text(user.mood).font(.subheadline).foregroundStyle(.secondary)
      }
      Spacer()
      StatusBars(date: user.lastUpdated)
    }.padding(.vertical, 6)
  }
}
private struct StatusBars: View {
  let date: Date
  var count: Int {
    let days = max(0, Calendar.current.dateComponents([.day], from: date, to: Date()).day ?? 0)
    return days <= 7 ? 3 : days <= 30 ? 2 : days <= 90 ? 1 : 0
  }
  var body: some View {
    HStack(alignment: .center, spacing: 3) {
      ForEach(Array([10.0, 16.0, 13.0].enumerated()), id: \.offset) { index, height in
        Capsule()
          .fill(index < count ? Color(hex: "#3B8B5C") : Color(hex: "#A8AAA6"))
          .frame(width: 3, height: height)
      }
    }
    .frame(height: 20)
  }
}

struct UserAvatarView: View {
  let user: UserProfile
  let size: CGFloat
  let fallbackFont: Font

  var body: some View {
    Group {
      if let avatarImage = user.avatarImage,
        let imagePath = Bundle.main.path(forResource: avatarImage, ofType: nil),
        let image = UIImage(contentsOfFile: imagePath)
      {
        Image(uiImage: image)
          .resizable()
          .scaledToFill()
      } else {
        Text(user.avatar)
          .font(fallbackFont)
          .frame(maxWidth: .infinity, maxHeight: .infinity)
          .background(Color(hex: user.avatarColor))
      }
    }
    .frame(width: size, height: size)
    .clipShape(Circle())
  }
}
