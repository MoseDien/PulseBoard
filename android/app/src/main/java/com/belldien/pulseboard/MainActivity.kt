package com.belldien.pulseboard

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.TextUnit
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import com.belldien.pulseboard.model.*
import com.belldien.pulseboard.ui.PulseViewModel

private val Page = Color(0xFFF8F7F2)
private val Ink = Color(0xFF24302A)
private val Muted = Color(0xFF78817A)
private val Fresh = Color(0xFF3B8B5C)
private val Stale = Color(0xFFA8AAA6)
private val AvatarScales = listOf(0.90f, 1.12f, 0.98f, 1.16f, 0.86f, 1.08f, 0.94f, 1.14f)
private val AvatarOffsets = listOf(-8, 6, 10, -10, 8, -5, -7, 9)

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent { PulseBoardTheme { PulseBoardApp() } }
    }
}

@Composable
fun PulseBoardTheme(content: @Composable () -> Unit) {
    MaterialTheme(
        colorScheme =
            lightColorScheme(
                background = Page,
                surface = Page,
                primary = Fresh,
                onBackground = Ink,
                onSurface = Ink,
            ),
        content = content,
    )
}

@Composable
fun PulseBoardApp(vm: PulseViewModel = viewModel()) {
    var selected by rememberSaveable { mutableStateOf<Int?>(null) }
    var settings by rememberSaveable { mutableStateOf(false) }
    var listMode by rememberSaveable { mutableStateOf(false) }
    val state by vm.home.collectAsState()
    if (selected == null)
        HomeScreen(state, listMode, { listMode = it }, { settings = true }, { selected = it })
    else DetailScreen(vm.detail(selected!!), { selected = null })
    if (settings) SettingsDialog(listMode, { listMode = it }, { settings = false })
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun HomeScreen(
    state: HomeUiState,
    listMode: Boolean,
    onMode: (Boolean) -> Unit,
    openSettings: () -> Unit,
    openUser: (Int) -> Unit,
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("PulseBoard · 近况", fontWeight = FontWeight.Bold) },
                actions = { IconButton(openSettings) { Icon(Icons.Default.Settings, "设置") } },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Page),
            )
        },
        containerColor = Page,
    ) { pad ->
        if (state.loading)
            Box(Modifier.fillMaxSize().padding(pad), Alignment.Center) {
                CircularProgressIndicator()
            }
        else if (listMode)
            LazyColumn(
                Modifier.fillMaxSize().padding(pad),
                contentPadding = PaddingValues(16.dp),
                verticalArrangement = Arrangement.spacedBy(12.dp),
            ) {
                items(state.users, key = { it.id }) { UserRow(it, openUser) }
            }
        else {
            val rows =
                state.users.chunked(3).let { users ->
                    listOf(
                        users.getOrNull(0).orEmpty(),
                        users.getOrNull(1).orEmpty(),
                        users.getOrNull(2).orEmpty(),
                    )
                }
            LazyColumn(
                Modifier.fillMaxSize().padding(pad),
                contentPadding = PaddingValues(horizontal = 12.dp, vertical = 18.dp),
                verticalArrangement = Arrangement.spacedBy(18.dp),
            ) {
                items(rows.size) { rowIndex ->
                    val rowUsers = rows[rowIndex]
                    Row(
                        Modifier.fillMaxWidth().offset(y = (if (rowIndex == 1) 8 else -2).dp),
                        horizontalArrangement =
                            Arrangement.spacedBy(if (rowIndex == 1) 26.dp else 8.dp),
                        verticalAlignment = Alignment.Top,
                    ) {
                        rowUsers.forEach { user ->
                            UserNode(user, openUser, Modifier.weight(1f))
                        }
                    }
                }
            }
        }
    }
}

@Composable
private fun UserNode(user: UserProfile, open: (Int) -> Unit, modifier: Modifier = Modifier) {
    val scale = AvatarScales[(user.id - 1) % AvatarScales.size]
    Column(
        modifier
            .fillMaxWidth()
            .offset(x = AvatarOffsets[(user.id - 1) % AvatarOffsets.size].dp)
            .clickable { open(user.id) },
        horizontalAlignment = Alignment.CenterHorizontally,
    ) {
        UserAvatar(user, (106 * scale).dp, (36 * scale).sp)
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.spacedBy(6.dp),
            modifier = Modifier.padding(top = 8.dp),
        ) {
            StatusBars(user.lastUpdated)
            Text(user.name, fontWeight = FontWeight.Bold)
        }
    }
}

@Composable
private fun UserRow(user: UserProfile, open: (Int) -> Unit) {
    Row(
        Modifier.fillMaxWidth()
            .clip(RoundedCornerShape(22.dp))
            .background(Color.White)
            .clickable { open(user.id) }
            .padding(16.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        UserAvatar(user, 58.dp, 22.sp)
        Column(Modifier.padding(start = 14.dp).weight(1f)) {
            Text(user.name, fontWeight = FontWeight.Bold, fontSize = 17.sp)
            Text(user.mood, color = Muted, fontSize = 13.sp)
        }
        StatusBars(user.lastUpdated)
    }
}

@Composable
private fun StatusBars(date: String) {
    val days =
        ((System.currentTimeMillis() - java.time.LocalDate.parse(date).toEpochDay() * 86400000L) /
                86400000L)
            .coerceAtLeast(0)
    val level = if (days <= 7) 3 else if (days <= 30) 2 else if (days <= 90) 1 else 0
    Row(
        modifier = Modifier.height(20.dp),
        horizontalArrangement = Arrangement.spacedBy(3.dp),
        verticalAlignment = Alignment.CenterVertically,
    ) {
        listOf(10.dp, 16.dp, 13.dp).forEachIndexed { index, height ->
            Box(
                Modifier.width(3.dp)
                    .height(height)
                    .clip(RoundedCornerShape(1.5.dp))
                    .background(if (level > index) Fresh else Stale)
            )
        }
    }
}

@Composable
private fun UserAvatar(user: UserProfile, size: Dp, fallbackFontSize: TextUnit) {
    Box(
        modifier = Modifier.requiredSize(size).aspectRatio(1f).clip(CircleShape),
        contentAlignment = Alignment.Center,
    ) {
        if (user.avatarRes != null) {
            Image(
                painter = painterResource(user.avatarRes),
                contentDescription = "${user.name}的头像",
                contentScale = ContentScale.Crop,
                modifier = Modifier.fillMaxSize(),
            )
        } else {
            Box(
                Modifier.fillMaxSize().background(Color(user.avatarColor)),
                Alignment.Center,
            ) {
                Text(user.avatar, fontSize = fallbackFontSize, fontWeight = FontWeight.Bold)
            }
        }
    }
}

@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun DetailScreen(state: DetailUiState, back: () -> Unit) {
    val user = state.user
    Scaffold(
        topBar = {
            TopAppBar(
                navigationIcon = {
                    IconButton(back) { Icon(Icons.AutoMirrored.Filled.ArrowBack, "返回") }
                },
                title = { Text(user?.name ?: "详情", fontWeight = FontWeight.Bold) },
                colors = TopAppBarDefaults.topAppBarColors(containerColor = Page),
            )
        },
        containerColor = Page,
    ) { pad ->
        if (user == null)
            Box(Modifier.fillMaxSize().padding(pad), Alignment.Center) {
                Text(state.error ?: "加载中")
            }
        else
            LazyColumn(
                Modifier.fillMaxSize().padding(pad),
                contentPadding = PaddingValues(20.dp),
                verticalArrangement = Arrangement.spacedBy(20.dp),
            ) {
                item {
                    Row(verticalAlignment = Alignment.CenterVertically) {
                        UserAvatar(user, 84.dp, 32.sp)
                        Column(Modifier.padding(start = 16.dp)) {
                            Text(user.name, fontSize = 24.sp, fontWeight = FontWeight.Bold)
                            Text(user.handle, color = Muted)
                            Text(user.mood, color = Fresh, modifier = Modifier.padding(top = 4.dp))
                        }
                    }
                }
                item { Text(user.bio, color = Muted) }
                item {
                    MediaSection("最近看过的书", user.books.map { MediaItem(it.title, it.author, "📚") })
                }
                item { MediaSection("最近看过的电影", user.movies) }
                item { MediaSection("最近旅行过的地方", user.places) }
                item { MediaSection("最近听过的博客", user.podcasts) }
            }
    }
}

@Composable
private fun MediaSection(title: String, items: List<MediaItem>) {
    Column(verticalArrangement = Arrangement.spacedBy(10.dp)) {
        Text(title, fontWeight = FontWeight.Bold, fontSize = 17.sp)
        LazyRow(horizontalArrangement = Arrangement.spacedBy(10.dp)) {
            items(items) { item ->
                Card(
                    shape = RoundedCornerShape(18.dp),
                    colors = CardDefaults.cardColors(containerColor = Color.White),
                    modifier = Modifier.width(150.dp),
                ) {
                    Column(Modifier.padding(14.dp)) {
                        Text(item.emoji, fontSize = 28.sp)
                        Text(item.title, fontWeight = FontWeight.Bold, maxLines = 2)
                        Text(item.meta, color = Muted, fontSize = 12.sp)
                    }
                }
            }
        }
    }
}

@Composable
private fun SettingsDialog(listMode: Boolean, onMode: (Boolean) -> Unit, dismiss: () -> Unit) {
    AlertDialog(
        onDismissRequest = dismiss,
        title = { Text("设置") },
        text = {
            Column(verticalArrangement = Arrangement.spacedBy(12.dp)) {
                Text("服务器", color = Muted, fontSize = 12.sp)
                Text("本地 Mock", fontWeight = FontWeight.Bold)
                Text("首页风格", color = Muted, fontSize = 12.sp)
                Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                    FilterChip(
                        selected = listMode,
                        onClick = { onMode(true) },
                        label = { Text("列表") },
                    )
                    FilterChip(
                        selected = !listMode,
                        onClick = { onMode(false) },
                        label = { Text("动态") },
                    )
                }
            }
        },
        confirmButton = { TextButton(dismiss) { Text("完成") } },
    )
}
