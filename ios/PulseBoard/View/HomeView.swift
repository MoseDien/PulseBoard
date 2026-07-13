import SwiftUI

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
            LazyVGrid(columns: [GridItem(.flexible()), GridItem(.flexible())], spacing: 28) {
              ForEach(viewModel.homeState.users) { user in
                NavigationLink(value: user) { UserNode(user: user) }.buttonStyle(.plain)
              }
            }.padding(20)
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
  var body: some View {
    VStack(spacing: 8) {
      Text(user.avatar).font(.system(size: 36, weight: .bold)).frame(width: 104, height: 104)
        .background(Color(hex: user.avatarColor)).clipShape(Circle())
      HStack(spacing: 5) {
        StatusDots(date: user.lastUpdated)
        Text(user.name).font(.headline)
      }
    }
  }
}
private struct UserRow: View {
  let user: UserProfile
  var body: some View {
    HStack(spacing: 14) {
      Text(user.avatar).font(.title2.bold()).frame(width: 58, height: 58).background(
        Color(hex: user.avatarColor)
      ).clipShape(Circle())
      VStack(alignment: .leading) {
        Text(user.name).font(.headline)
        Text(user.mood).font(.subheadline).foregroundStyle(.secondary)
      }
      Spacer()
      StatusDots(date: user.lastUpdated)
    }.padding(.vertical, 6)
  }
}
private struct StatusDots: View {
  let date: Date
  var count: Int {
    let days = max(0, Calendar.current.dateComponents([.day], from: date, to: Date()).day ?? 0)
    return days <= 7 ? 3 : days <= 30 ? 2 : days <= 90 ? 1 : 0
  }
  var body: some View {
    HStack(spacing: 2) {
      ForEach(0..<count, id: \.self) { _ in
        Circle().fill(Color(hex: "#3B8B5C")).frame(width: 6, height: 6)
      }
    }
  }
}
