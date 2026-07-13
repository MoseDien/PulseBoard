import Foundation

protocol UserRepositoryProtocol {
  func getUsers() -> [UserProfile]
  func getUser(id: Int) -> UserProfile?
}

final class UserRepository: UserRepositoryProtocol {
  private let calendar = Calendar.current
  private lazy var users: [UserProfile] = {
    let entries:
      [(
        Int, String, String, String, String, String, String, String, [String], [String], [String],
        [String]
      )] = [
        (
          1, "林屿", "@island_lin", "屿", "#DCE8C8", "在城市里采集安静的时刻。", "2026-07-08", "最近很松弛",
          ["献给阿尔吉侬的花束", "禅与摩托车维修艺术", "树上的男爵"], ["完美的日子", "机器人之梦"], ["泉州", "厦门"],
          ["忽左忽右：城市里的漫游者", "随机波动：如何好好休息"]
        ),
        (
          2, "陈墨", "@inkchen", "墨", "#F1D6C8", "产品设计师，业余面包观察员。", "2026-07-03", "忙里偷闲",
          ["设计中的设计", "毫无意义的工作"], ["雄狮少年 2", "沙丘 2"], ["景德镇"], ["Anyway.FM：设计师的停顿", "不合时宜：面包与城市"]
        ),
        (
          3, "顾遥", "@farawaygu", "遥", "#C9DDE8", "把一年过成四季，也把四季装进口袋。", "2026-06-11", "暂时离线",
          ["远山淡影", "观看之道"], ["坠落的审判"], ["大理", "沙溪"], ["声东击西：慢一点的生活"]
        ),
        (
          4, "唐沐", "@mumu_tang", "沐", "#E6D9F2", "在音乐、电影和周末早晨之间漂浮。", "2026-03-18", "潜水中",
          ["夜晚的潜水艇"], ["花样年华"], ["香港"], ["日谈公园：王家卫的时间"]
        ),
        (
          5, "周予安", "@anyanzhou", "安", "#F4E2AE", "刚从海边回来，开始整理夏天的照片。", "2026-07-10", "电量满格",
          ["海边的卡夫卡", "云边有个小卖部"], ["宇宙探索编辑部"], ["平潭"], ["故事FM：夏天的来信"]
        ),
        (
          6, "许知行", "@walkwithxu", "知", "#CDE7E2", "白天写代码，晚上研究城市的灯。", "2026-06-25", "慢慢恢复中",
          ["夜航西飞"], ["驾驶我的车", "燃烧"], ["青岛"], ["硬核说：城市夜行指南"]
        ),
        (
          7, "苏梨", "@sulittleleaf", "梨", "#E7D6C9", "在季节交替的时候，练习不急着回答。", "2026-04-20", "在路上",
          ["四个春天", "山茶文具店"], ["小森林"], ["新西兰南岛", "墨尔本"], ["随机波动：离开熟悉的地方"]
        ),
        (
          8, "沈砚", "@yan_shen", "砚", "#D4D5D7", "最近很少上线，但窗台的植物还在长。", "2025-12-01", "长假模式",
          ["沉默的大多数"], ["东京物语"], ["京都"], ["不合时宜：暂停一下也没关系"]
        ),
      ]
    let formatter = DateFormatter()
    formatter.dateFormat = "yyyy-MM-dd"
    return entries.compactMap {
      id, name, handle, avatar, color, bio, date, mood, books, movies, places, podcasts in
      guard let day = formatter.date(from: date) else { return nil }
      return UserProfile(
        id: id, name: name, handle: handle, avatar: avatar, avatarColor: color, bio: bio,
        lastUpdated: day, mood: mood,
        books: books.map { Book(title: $0, author: "最近阅读", colorHex: "#29434E") },
        movies: movies.map { MediaItem(title: $0, meta: "最近看过 · ★ 4.5", emoji: "🎬") },
        places: places.map { MediaItem(title: $0, meta: "最近旅行过", emoji: "📍") },
        podcasts: podcasts.map { MediaItem(title: $0, meta: "最近听过", emoji: "🎧") })
    }
  }()
  func getUsers() -> [UserProfile] { users }
  func getUser(id: Int) -> UserProfile? { users.first { $0.id == id } }
}
