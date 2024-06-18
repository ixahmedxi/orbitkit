'use client'

import { useEffect, useState } from 'react'

import { useTheme } from 'next-themes'

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <select
      className='rounded-md border-border bg-muted text-sm transition-colors hover:bg-accent'
      value={theme}
      onChange={(e) => {
        setTheme(e.target.value)
      }}
    >
      <option value='system'>System</option>
      <option value='dark'>Dark</option>
      <option value='light'>Light</option>
    </select>
  )
}
