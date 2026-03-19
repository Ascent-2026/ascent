const rows = [
  { rank: 1, team: 'Team Alpha', score: 9500, event: 'Hackathon' },
  { rank: 2, team: 'Team Beta', score: 8800, event: 'Robowar' },
  { rank: 3, team: 'Team Gamma', score: 8200, event: 'Hackathon' },
  { rank: 4, team: 'Team Delta', score: 7600, event: 'Quiz' },
  { rank: 5, team: 'Team Epsilon', score: 7100, event: 'Robowar' },
]

export function LeaderboardChannel() {
  return (
    <div className="p-6 text-neutral-300 font-mono overflow-y-auto h-full">
      <h1 className="text-lg font-bold tracking-[0.3em] uppercase text-center mb-6">
        Leaderboard
      </h1>

      <table className="w-full text-xs border-collapse">
        <thead>
          <tr className="border-b border-neutral-700 text-neutral-500 text-left">
            <th className="py-2 pr-4">#</th>
            <th className="py-2 pr-4">Team</th>
            <th className="py-2 pr-4">Event</th>
            <th className="py-2 text-right">Score</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(row => (
            <tr key={row.rank} className="border-b border-neutral-800 hover:bg-neutral-900 transition-colors">
              <td className="py-2 pr-4 text-neutral-500">{row.rank}</td>
              <td className="py-2 pr-4">{row.team}</td>
              <td className="py-2 pr-4 text-neutral-500">{row.event}</td>
              <td className="py-2 text-right">{row.score.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
