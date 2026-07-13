import ProjectDescription

let project = Project(
  name: "PulseBoard",
  organizationName: "com.belldien",
  settings: .settings(
    base: [
      "SWIFT_VERSION": "5.9",
      "IPHONEOS_DEPLOYMENT_TARGET": "17.0",
      "TARGETED_DEVICE_FAMILY": "1",
    ]
  ),
  targets: [
    .target(
      name: "PulseBoard",
      destinations: [.iPhone],
      product: .app,
      productName: "PulseBoard",
      bundleId: "com.belldien.pulseboard",
      deploymentTargets: .iOS("17.0"),
      infoPlist: .extendingDefault(
        with: [
          "CFBundleDisplayName": "PulseBoard",
          "UILaunchScreen": ["UIColorName": "", "UIImageName": ""],
        ]
      ),
      sources: ["PulseBoard/**/*.swift"],
      resources: [],
      dependencies: []
    )
  ]
)
