package com.belldien.pulseboard.domain

import com.belldien.pulseboard.data.UserRepository
import com.belldien.pulseboard.model.UserProfile

class LoadUsersUseCase(private val repository: UserRepository) {
    operator fun invoke(): List<UserProfile> =
        repository.getUsers().sortedByDescending { it.lastUpdated }
}

class LoadUserDetailUseCase(private val repository: UserRepository) {
    operator fun invoke(id: Int): UserProfile? = repository.getUser(id)
}
