import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { cva, type VariantProps } from 'class-variance-authority'
import { IconClose } from '@/components/ui/icons'
import { cn } from '@/lib/utils'
import { background, foreground, mutedForeground, secondary } from '@/lib/theme'
import {
  slideInFromLeft,
  slideOutToLeft,
  slideInFromRight,
  slideOutToRight,
  slideInFromTop,
  slideOutToTop,
  slideInFromBottom,
  slideOutToBottom,
  z50,
  fixed,
  inset0,
  p6,
  shadowLg,
  borderB,
  borderT,
  borderR,
  borderL,
  w34,
  hFull,
  maxWsm,
  bgBackground,
  bgSecondary,
  textCenter,
  textLeft,
  textLg,
  fontSemibold,
  textForeground,
  textSm,
  fontNormal,
  textMutedForeground,
  opacity70,
  ringOffsetBackground,
  ring2,
  ringRing,
  focusOutlineNone,
  focusRing2,
  focusRingOffset2,
  disabledPointerEventsNone,
  dataOpenBgSecondary,
  dataClosedSlideOutToTop,
  dataOpenSlideInFromTop,
  dataClosedSlideOutToBottom,
  dataOpenSlideInFromBottom,
  dataClosedSlideOutToLeft,
  dataOpenSlideInFromLeft,
  dataClosedSlideOutToRight,
  dataOpenSlideInFromRight,
  absolute,
  right4,
  top4,
  roundedSm,
  transitionOpacity,
  hoverOpacity100,
  focusOpacity100
} from '@/lib/classes'

type SheetContentProps = React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content> & VariantProps<typeof sheetVariants>

const sheetVariants = cva(
  'fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top',
        bottom: 'inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        left: 'inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm',
        right: 'inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm'
      }
    },
    defaultVariants: {
      side: 'right'
    }
  }
)

const SheetOverlay = React.forwardRef<
  React
