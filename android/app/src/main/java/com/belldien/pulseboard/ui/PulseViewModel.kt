package com.belldien.pulseboard.ui

import androidx.lifecycle.ViewModel
import com.belldien.pulseboard.data.UserRepository
import com.belldien.pulseboard.domain.*
import com.belldien.pulseboard.model.*
import kotlinx.coroutines.flow.MutableStateFlow
import kotlinx.coroutines.flow.StateFlow

class PulseViewModel : ViewModel() {
    private val repository = UserRepository()
    private val loadUsers = LoadUsersUseCase(repository)
    private val loadDetail = LoadUserDetailUseCase(repository)
    private val _home = MutableStateFlow(HomeUiState(users = loadUsers(), loading = false))
    val home: StateFlow<HomeUiState> = _home

    fun detail(id: Int): DetailUiState =
        loadDetail(id)?.let { DetailUiState(it, false) }
            ?: DetailUiState(loading = false, error = "没有找到这位朋友")
}
