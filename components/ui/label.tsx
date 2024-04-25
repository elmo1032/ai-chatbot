// Import necessary modules and components from React, @radix-ui/react-label, class-variance-authority, and the local utils library.
import React from "react"
import { LabelPrimitive } from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// Define the labelVariants using the class-variance-authority cva function.
// This sets up a collection of CSS classes that can be applied based on different variants or states.
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

// Create a forwardRef for the Label component, which allows it to receive a ref and have its ref forwarded to the underlying LabelPrimitive.Root component.
const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>, // Specify the type of the ref for the LabelPrimitive.Root component.
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & // Include all the props that the LabelPrimitive.Root component accepts.
    VariantProps<typeof labelVariants> // Include all the variant props defined by labelVariants.
>(({ className, ...props }, ref) => { // Destructure the className and other props from the props object.
  // Render the LabelPrimitive.Root component, passing the ref, className, and other props to it.
  // Apply the labelVariants CSS classes using the cn function, and merge them with the provided className.
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
})

// Set the displayName for the Label component to match the displayName of the LabelPrimitive.Root component.
Label.displayName = LabelPrimitive.Root.displayName

// Export the Label component for use in other parts of the application.
export { Label }
