# PulseBoard SwiftUI + Tuist

SwiftUI implementation of PulseBoard, maintained with Tuist. `Project.swift` is the source of truth for the Xcode project; the generated `.xcodeproj` should not be committed.

Architecture: `View -> ViewModel/UI State -> UseCase -> Repository -> Mock data`.

The app includes dynamic/list home styles, a settings sheet, freshness indicators, navigation to user detail, and horizontal media sections.

## Generate and open

Install Tuist, then run from this directory:

```bash
mise exec -- tuist install
mise exec -- tuist generate
open PulseBoard.xcodeproj
```

For a clean regeneration:

```bash
mise exec -- tuist clean
mise exec -- tuist generate
```
