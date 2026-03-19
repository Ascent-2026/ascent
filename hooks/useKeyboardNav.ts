'use client'

import { useEffect } from 'react'

export function useKeyboardNav(onNext: () => void, onPrev: () => void) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') onNext()
      if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') onPrev()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onNext, onPrev])
}
