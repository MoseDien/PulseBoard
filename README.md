# PulseBoard

PulseBoard is maintained as a single Git monorepo. The three clients implement the same product and are versioned together, so a fresh clone contains all platform source code without Git submodules or additional repository initialization.

## Projects

| Directory | Platform | Stack | Open or build |
| --- | --- | --- | --- |
| `android/` | Android | Kotlin + Jetpack Compose | Open `android/` in Android Studio, or run `./gradlew :app:assembleDebug` from that directory with JDK 17 or newer configured. |
| `ios/` | iOS | SwiftUI + Tuist | From `ios/`, run `mise exec -- tuist install` and `mise exec -- tuist generate`, then open the generated workspace or project. |
| `hm/` | HarmonyOS | ArkTS + ArkUI | Open `hm/` in DevEco Studio and run the `entry` module, or invoke the bundled Hvigor build from that directory. |

Each platform directory also contains platform-specific setup notes.

## Contribution workflow

- Keep Android, iOS, and HarmonyOS implementations of the same product change in one branch and, where practical, one pull request.
- Use platform-focused commits when that makes review clearer, while keeping the complete cross-platform change under one PR and version tag.
- Run the relevant platform build and formatting checks before requesting review.
- Do not commit IDE metadata, dependency caches, generated Xcode projects or workspaces, or build output. The root `.gitignore` is the source of truth for repository-wide exclusions.
- Add platform-specific CI jobs or `CODEOWNERS` entries when ownership grows; separate Git repositories are not required for independent checks or review routing.

Reconsider repository boundaries only if the clients gain independent ownership, access controls, or release lifecycles. If shared code later needs distribution across repositories, prefer a package or dedicated repository; use Git submodules only when consumers must pin an external repository commit directly.
