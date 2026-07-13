package com.belldien.pulseboard.data

import com.belldien.pulseboard.R
import com.belldien.pulseboard.model.*

class UserRepository {
    fun getUsers() = users

    fun getUser(id: Int) = users.firstOrNull { it.id == id }

    private val users =
        listOf(
            user(
                1,
                "林屿",
                "@island_lin",
                "屿",
                0xFFDCE8C8,
                "在城市里采集安静的时刻。",
                "2026-07-08",
                "最近很松弛",
                listOf("献给阿尔吉侬的花束", "禅与摩托车维修艺术", "树上的男爵"),
                listOf("完美的日子", "机器人之梦"),
                listOf("泉州", "厦门"),
                listOf("忽左忽右：城市里的漫游者", "随机波动：如何好好休息"),
            ),
            user(
                2,
                "陈墨",
                "@inkchen",
                "墨",
                0xFFF1D6C8,
                "产品设计师，业余面包观察员。",
                "2026-07-03",
                "忙里偷闲",
                listOf("设计中的设计", "毫无意义的工作"),
                listOf("雄狮少年 2", "沙丘 2"),
                listOf("景德镇"),
                listOf("Anyway.FM：设计师的停顿", "不合时宜：面包与城市"),
            ),
            user(
                3,
                "顾遥",
                "@farawaygu",
                "遥",
                0xFFC9DDE8,
                "把一年过成四季，也把四季装进口袋。",
                "2026-06-11",
                "暂时离线",
                listOf("远山淡影", "观看之道"),
                listOf("坠落的审判"),
                listOf("大理", "沙溪"),
                listOf("声东击西：慢一点的生活"),
            ),
            user(
                4,
                "唐沐",
                "@mumu_tang",
                "沐",
                0xFFE6D9F2,
                "在音乐、电影和周末早晨之间漂浮。",
                "2026-03-18",
                "潜水中",
                listOf("夜晚的潜水艇"),
                listOf("花样年华"),
                listOf("香港"),
                listOf("日谈公园：王家卫的时间"),
            ),
            user(
                5,
                "周予安",
                "@anyanzhou",
                "安",
                0xFFF4E2AE,
                "刚从海边回来，开始整理夏天的照片。",
                "2026-07-10",
                "电量满格",
                listOf("海边的卡夫卡", "云边有个小卖部"),
                listOf("宇宙探索编辑部"),
                listOf("平潭"),
                listOf("故事FM：夏天的来信"),
            ),
            user(
                6,
                "许知行",
                "@walkwithxu",
                "知",
                0xFFCDE7E2,
                "白天写代码，晚上研究城市的灯。",
                "2026-06-25",
                "慢慢恢复中",
                listOf("夜航西飞"),
                listOf("驾驶我的车", "燃烧"),
                listOf("青岛"),
                listOf("硬核说：城市夜行指南"),
            ),
            user(
                7,
                "苏梨",
                "@sulittleleaf",
                "梨",
                0xFFE7D6C9,
                "在季节交替的时候，练习不急着回答。",
                "2026-04-20",
                "在路上",
                listOf("四个春天", "山茶文具店"),
                listOf("小森林"),
                listOf("新西兰南岛", "墨尔本"),
                listOf("随机波动：离开熟悉的地方"),
            ),
            user(
                8,
                "沈砚",
                "@yan_shen",
                "砚",
                0xFFD4D5D7,
                "最近很少上线，但窗台的植物还在长。",
                "2025-12-01",
                "长假模式",
                listOf("沉默的大多数"),
                listOf("东京物语"),
                listOf("京都"),
                listOf("不合时宜：暂停一下也没关系"),
            ),
        )

    private fun user(
        id: Int,
        name: String,
        handle: String,
        avatar: String,
        color: Long,
        bio: String,
        date: String,
        mood: String,
        books: List<String>,
        movies: List<String>,
        places: List<String>,
        podcasts: List<String>,
    ) =
        UserProfile(
            id,
            name,
            handle,
            avatar,
            when (id) {
                1 -> R.drawable.avatar_1
                2 -> R.drawable.avatar_2
                3 -> R.drawable.avatar_3
                4 -> R.drawable.avatar_4
                5 -> R.drawable.avatar_5
                6 -> R.drawable.avatar_6
                else -> null
            },
            color,
            bio,
            date,
            mood,
            books.map { Book(it, "最近阅读", 0xFF29434E) },
            movies.map { MediaItem(it, "最近看过 · ★ 4.5", "🎬") },
            places.map { MediaItem(it, "最近旅行过", "📍") },
            podcasts.map { MediaItem(it, "最近听过", "🎧") },
        )
}
