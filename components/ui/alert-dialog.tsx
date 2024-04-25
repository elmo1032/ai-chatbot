// Import necessary modules and libraries
import * as React from 'react'
import { cn } from '@/lib/utils' // A utility function for classname manipulation
import { 
  AlertDialog as AlertDialogPrimitive, // The core AlertDialog component from Radix UI
  AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger // Individual components for AlertDialog from Radix UI
} from '@radix-ui/react-alert-dialog'
import { buttonVariants } from '@/components/ui/button' // A set of predefined button styles
import { motion } from 'framer-motion' // A library for animating React components

// AlertDialog component with custom props and additional functionality
const AlertDialog = ({ defaultOpen, onOpenChange, children, ...props }) => {
  // Render the AlertDialog component using Radix UI's AlertDialogPrimitive and other components
  return (
    <AlertDialogPrimitive.Root
      defaultOpen={defaultOpen} // Set the initial state of the dialog
      onOpenChange={onOpenChange} // Handle changes in the dialog's open state
      {...props} // Pass any additional props to the root component
    >
      {/* Use the children prop as the trigger for the AlertDialog */}
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        {props.title && <AlertDialogHeader>{props.title}</AlertDialogHeader>} {/* Render the title if provided */}
        {props.description && (
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        )} {/* Render the description if provided */}
        <AlertDialogFooter>
          {props.cancelText && (
            <AlertDialogCancel className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0')}>
              {props.cancelText}
            </AlertDialogCancel>
          )} {/* Render the cancel button with the specified text and outlined style if provided */}
          {props.actionText && (
            <AlertDialogAction className={buttonVariants()}>
              {props.actionText}
            </AlertDialogAction>
          )} {/* Render the action button with the specified text and default style if provided */}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive.Root>
  )
}

// Define transition animations for AlertDialogContent
const AlertDialogContentTransition = {
  enter: motion.presets.slideUp, // Slide the content up when the dialog opens
  leave: motion.presets.slideDown, // Slide the content down when the dialog closes
}

// Wrap AlertDialogContent with the motion component to apply animations
const AlertDialogContentWrapper = motion(AlertDialogContent)

// Export AlertDialog, AlertDialogContentWrapper, and AlertDialogTrigger components
export { AlertDialog, AlertDialogContentWrapper, AlertDialogTrigger }


// Example usage of AlertDialog
<AlertDialog defaultOpen={true} onOpenChange={(open) => console.log('Dialog is open:', open)}>
  <AlertDialog.Title>Are you sure you want to delete this item?</AlertDialog.Title>
  <AlertDialog.Description>
    This action cannot be undone and the item will be permanently deleted.
  </AlertDialog.Description>
  <AlertDialog.Action>Delete</AlertDialog.Action>
  <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
</AlertDialog>
