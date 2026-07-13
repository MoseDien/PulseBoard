import SwiftUI

@main struct PulseBoardApp: App {
  @StateObject private var viewModel = PulseViewModel()
  var body: some Scene { WindowGroup { HomeView(viewModel: viewModel) } }
}
