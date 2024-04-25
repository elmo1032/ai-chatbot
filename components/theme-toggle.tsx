'use client' // This line is necessary for Next.js when using client-side functionality

import * as React from 'react' // Importing React and its components
import { useTheme } from 'next-themes' // Importing useTheme hook from next-themes

// Importing custom components
import { Button } from '@/components/ui/button'
import { IconMoon, IconSun } from '@/components/ui/icons'

export function ThemeToggle() {
  // Declaring and initializing variables using destructuring
  const { setTheme, theme } = useTheme()
  const [_, startTransition] = React.useTransition() // startTransition is used for managing performance when updating state

  // The onClick event handler for the button, which toggles the theme
  return (
    <Button
      variant="ghost" // This sets the button to be ghost-like, i.e., with a transparent background
      size="icon" // This sets the button to be an icon-sized button
      onClick={() => {
        startTransition(() => { // startTransition is used to wrap the state update
          setTheme(theme === 'light' ? 'dark' : 'light') // Toggling the theme between light and dark
        })
      }}
    >
      {!theme ? null : theme === 'dark' ? ( // Conditionally rendering the icon based on the current theme
        <IconMoon className="transition-all" />
      ) : (
        <IconSun className="transition-all" />
      )}
      <span className="sr-only">Toggle theme</span> {/* This text is only visible to screen readers */}
    </Button>
  )
}

