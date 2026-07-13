import SwiftUI

struct SettingsView: View {
  @Binding var listMode: Bool
  @Environment(\.dismiss) private var dismiss
  var body: some View {
    NavigationStack {
      Form {
        Section("服务器") { Label("本地 Mock", systemImage: "server.rack") }
        Section("首页风格") {
          Picker("风格", selection: $listMode) {
            Text("动态").tag(false)
            Text("列表").tag(true)
          }.pickerStyle(.segmented)
        }
      }.navigationTitle("设置").toolbar {
        ToolbarItem(placement: .confirmationAction) { Button("完成") { dismiss() } }
      }
    }
  }
}
