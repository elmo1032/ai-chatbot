// Import only the necessary functions from the utility module. In this case, we are importing the 'nanoid' function from '@/lib/utils'.
import { nanoid } from '@/lib/utils'

// Import the 'Chat' component from '@/components/chat'. This component will be used and customized in the 'IndexPage' component.
import Chat from '@/components/chat'

// The function name 'IndexPage' is in PascalCase, which is a common convention for naming React components.
export default function IndexPage() {
  // Generate a unique ID using the 'nanoid' function. This ID is used to ensure that each instance of the 'Chat' component has a unique key.
  const id = nanoid()

  // Use a fragment (<></>) to wrap the returned JSX. This avoids adding unnecessary wrapping div elements to the output.
  return <>
    {/* Render the 'Chat' component, passing the generated unique ID as a prop. */}
    <Chat id={id} />
  </>
}

