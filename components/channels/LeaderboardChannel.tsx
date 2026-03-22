import styles from "@/styles/leaderboard.module.css";

interface RankingEntry {
  rank: number;
  name: string;
  score: number;
}

const RANKINGS: RankingEntry[] = [
  { rank: 1, name: "NeonKnight", score: 9850 },
  { rank: 2, name: "CypherPunk", score: 8420 },
  { rank: 3, name: "ZeroCool", score: 8100 },
  { rank: 4, name: "AcidBurn", score: 7650 },
  { rank: 5, name: "CrashOverride", score: 7200 },
];

function getNameRankClass(rank: number): string {
  if (rank === 1) return styles.firstRank;
  if (rank === 2) return styles.secondRank;
  if (rank === 3) return styles.thirdRank;
  if (rank === 4) return styles.fourthRank;
  return styles.otherRank;
}

function getRankIcon(rank: number): string {
  if (rank === 1) return "🏆";
  if (rank === 2) return "🥈";
  if (rank === 3) return "🥉";
  return "👾";
}

export function LeaderboardChannel() {
  return (
    <div className={styles.root}>
      <div className={styles.inner}>
        <h1 className={styles.heading}>Rankings</h1>

        <div className={styles.headerRow}>
          <span className={styles.headerHacker}>Hacker</span>
          <span className={styles.headerScore}>Score</span>
        </div>
        <div className={styles.headerDivider} aria-hidden="true" />

        <div className={styles.rankingsList}>
          {RANKINGS.map((entry) => (
            <div key={entry.rank} className={styles.rankingCard}>
              <div className={styles.hackerInfo}>
                <span className={styles.hackerIcon} aria-hidden="true">
                  {getRankIcon(entry.rank)}
                </span>
                <span
                  className={`${styles.hackerName} ${getNameRankClass(entry.rank)}`}
                >
                  {entry.name}
                </span>
              </div>
              <span className={styles.score}>
                {entry.score.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
