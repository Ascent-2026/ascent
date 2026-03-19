import { Card } from './Shared/Card'
import { Grid } from './Shared/Grid'

export function SponsorsChannel() {
  return (
    <div className="p-8 text-neutral-300 font-mono overflow-y-auto h-full">
      <h1 className="text-lg font-bold tracking-[0.3em] uppercase text-center mb-6">
        Sponsors
      </h1>

      <p className="text-[10px] text-neutral-500 uppercase tracking-widest text-center mb-6">
        Title Sponsors
      </p>
      <Grid cols={3}>
        {['Sponsor A', 'Sponsor B', 'Sponsor C'].map(name => (
          <Card key={name} className="flex items-center justify-center h-20">
            <span className="text-xs text-neutral-500">{name}</span>
          </Card>
        ))}
      </Grid>

      <p className="text-[10px] text-neutral-500 uppercase tracking-widest text-center mt-8 mb-4">
        Associate Sponsors
      </p>
      <Grid cols={4}>
        {['Sponsor D', 'Sponsor E', 'Sponsor F', 'Sponsor G'].map(name => (
          <Card key={name} className="flex items-center justify-center h-16">
            <span className="text-xs text-neutral-500">{name}</span>
          </Card>
        ))}
      </Grid>
    </div>
  )
}
