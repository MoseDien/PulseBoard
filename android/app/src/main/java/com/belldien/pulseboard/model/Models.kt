package com.belldien.pulseboard.model
data class MediaItem(val title: String, val meta: String, val emoji: String)

data class Book(val title: String, val author: String, val color: Long)

data class UserProfile(
    val id: Int,
    val name: String,
    val handle: String,
    val avatar: String,
    val avatarColor: Long,
    val bio: String,
    val lastUpdated: String,
    val mood: String,
    val books: List<Book>,
    val movies: List<MediaItem>,
    val places: List<MediaItem>,
    val podcasts: List<MediaItem>,
)
