// Import necessary modules and components from Radix UI's react-select library
import * as SelectPrimitive from '@radix-ui/react-select'

// Import custom cn function for utility class name generation
import { cn } from '@/lib/utils'

// Import icons for use in the Select component
import {
  IconArrowDown,
  IconCheck,
  IconChevronUpDown
} from '@/components/ui/icons'

// Create a Select component using Radix UI's SelectRoot
const Select = SelectPrimitive.Root

// Create a SelectGroup component using Radix UI's SelectGroup
const SelectGroup = SelectPrimitive.Group

// Create a SelectValue component using Radix UI's SelectValue
const SelectValue = SelectPrimitive.Value

// Create a SelectTrigger component using Radix UI's Trigger
const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  // Use the Trigger component to create a clickable button for the Select component
  // The cn function is used to combine class names
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      // Add base styles for the trigger
      'flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      // Add any additional class names passed as props
      className
    )}
    {...props}
  >
    {children}
    {/* Add an icon to the trigger using Radix UI's Icon component */}
    <SelectPrimitive.Icon asChild>
      <IconChevronUpDown className="opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

// Create a SelectContent component using Radix UI's Content
const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  // Use the Content component to create the dropdown menu for the Select component
  // The cn function is used to combine class names
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        // Add base styles for the content
        'relative z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80',
        // Add positioning styles based on the position prop
        position === 'popper' && 'translate-y-1',
        // Add any additional class names passed as props
        className
      )}
      position={position}
      {...props}
    >
      {/* Use the Viewport component to create the scrollable area for the Select component */}
      <SelectPrimitive.Viewport
        className={cn(
          // Add base styles for the viewport
          'p-1',
          // Add positioning styles based on the position prop
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

// Create a SelectLabel component using Radix UI's Label
const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  // Use the Label component to create a label for the Select component
  // The cn function is used to combine class names
  <SelectPrimitive.Label
    ref={ref}
    className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)}
    {...props}
  />
))

// Create a SelectItem component using Radix UI's Item
const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item> & { value: string }
>(({ className, children, value, ...props }, ref) => (
  // Use the Item component to create an option for the Select component
  // The cn function is used to combine class names
  <SelectPrimitive.Item
    ref={ref}
    value={value}
    className={cn(
      // Add base styles for the item
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      // Add any additional class names passed as props
      className
    )}
    {...props}
  >
    {/* Add an indicator to the item using Radix UI's ItemIndicator component */}
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        {/* Add a checkmark icon to the indicator */}
        <IconCheck className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    {/* Add the label for the item using Radix UI's ItemText component */}
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

// Create a SelectSeparator component using Radix UI's Separator
const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  // Use the Separator component to create a separator between options in the Select component
  // The cn function is used to combine class names
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-muted', className)}
    {...props}
  />
))

// Create a CustomSelect component that combines the above components
export const CustomSelect = React.forwardRef<
  React.ElementRef<typeof Select>,
  React.ComponentPropsWithoutRef<typeof Select> & {
    items: { value: string; label: React.ReactNode }[]
  }
>(({ items, className, ...props }, ref) => {
  // Render the Select component with the necessary props and children
  return (
    <Select
      ref={ref}
      className={cn('w-full', className)}
      defaultValue={items[0].value}
    >
      {/* Map over the items prop and render a SelectItem for each one */}
      {items.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  )
})
