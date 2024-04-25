import { useRef, type RefObject } from 'react'

export function useEnterSubmit(): {
  formRef: RefObject<HTMLFormElement>
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void
} {
  const formRef = useRef<HTMLFormElement>(null)

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    // Check if the 'Enter' key was pressed, the 'Shift' key was not pressed,
    // and the event is not a composition event
    if (event.key === 'Enter' && !event.shiftKey && !event.isComposing) {
      // If the form is valid, submit it; otherwise, prevent the default form submission
      if (formRef.current?.checkValidity()) {
        formRef.current?.requestSubmit()
      } else {
        event.preventDefault()
      }
    }
  }

  return { formRef, onKeyDown: handleKeyDown }
}
