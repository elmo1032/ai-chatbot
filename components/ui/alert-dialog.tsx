import * as React from 'react'
import { cn } from '@/lib/utils'
import { AlertDialog as AlertDialogPrimitive, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@radix-ui/react-alert-dialog'
import { buttonVariants } from '@/components/ui/button'
import { motion } from 'framer-motion'

const AlertDialog = ({ defaultOpen, onOpenChange, children, ...props }) => {
  return (
    <AlertDialogPrimitive.Root
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      {...props}
    >
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        {props.title && <AlertDialogHeader>{props.title}</AlertDialogHeader>}
        {props.description && (
          <AlertDialogDescription>{props.description}</AlertDialogDescription>
        )}
        <AlertDialogFooter>
          {props.cancelText && (
            <AlertDialogCancel className={cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0')}>
              {props.cancelText}
            </AlertDialogCancel>
          )}
          {props.actionText && (
            <AlertDialogAction className={buttonVariants()}>
              {props.actionText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogPrimitive.Root>
  )
}

const AlertDialogContentTransition = {
  enter: motion.presets.slideUp,
  leave: motion.presets.slideDown,
}

const AlertDialogContentWrapper = motion(AlertDialogContent)

export { AlertDialog, AlertDialogContentWrapper, AlertDialogTrigger }


<AlertDialog defaultOpen={true} onOpenChange={(open) => console.log('Dialog is open:', open)}>
  <AlertDialog.Title>Are you sure you want to delete this item?</AlertDialog.Title>
  <AlertDialog.Description>
    This action cannot be undone and the item will be permanently deleted.
  </AlertDialog.Description>
  <AlertDialog.Action>Delete</AlertDialog.Action>
  <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
</AlertDialog>
