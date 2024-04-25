// Import necessary modules and functions from external libraries
import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

// Define the badgeVariants function using the cva (class variance authority) helper
// This function returns a CSS class string based on the provided variants
const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    // Define the possible variant options
    variants: {
      variant: {
        // Default variant
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        // Secondary variant
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        // Destructive variant
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        // Outline variant
        outline: 'text-foreground'
      }
    },
    // Set the default variant
    defaultVariants: {
      variant: 'default'
    }
  }
)

// Define the type for BadgeProps, extending React.HTMLAttributes and VariantProps
type BadgeProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof badgeVariants>

// Define the Badge functional component
function Badge({ className, variant, ...props }: BadgeProps) {
  // Render a div with the appropriate classes and props
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

// Export the Badge component and badgeVariants function
export { Badge, badgeVariants }
