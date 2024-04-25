import * as React from 'react'

// Import the 'cn' utility function from '@/lib/utils' which is used for classname manipulation
import { cn } from '@/lib/utils'

// Define the InputProps interface which extends React.InputHTMLAttributes<HTMLInputElement>
// This allows us to accept all the props that are accepted by the HTMLInputElement
export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

// Use React.forwardRef to create a forward ref for the Input component
// This allows us to access the DOM node of the input element from the parent component
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  // Destructure the 'className' and 'type' props and 'ref' from the InputProps
  ({ className, type, ...props }, ref) => {
    // Return the input element with the 'type' prop set to the passed 'type' prop
    // Add the 'className' prop to the input element with the 'cn' utility function
    // Spread the rest of the 'props' into the input element
    return (
      <input
        type={type}
        className={cn(
          // Pass the classnames for the input element
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

// Set the displayName of the Input component for debugging purposes
Input.displayName = 'Input'

// Export the Input component
export { Input }

