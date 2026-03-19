import styles from '@/styles/tv.module.css'

export function TVScreen({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex-1 border-2 border-neutral-600 rounded-lg bg-neutral-950 overflow-hidden min-h-80">
      <div className={styles.scanline} />
      {children}
    </div>
  )
}
