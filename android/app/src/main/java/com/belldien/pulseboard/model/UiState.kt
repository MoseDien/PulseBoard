package com.belldien.pulseboard.model
data class HomeUiState(
    val users: List<UserProfile> = emptyList(),
    val loading: Boolean = true,
    val error: String? = null,
)

data class DetailUiState(
    val user: UserProfile? = null,
    val loading: Boolean = true,
    val error: String? = null,
)
