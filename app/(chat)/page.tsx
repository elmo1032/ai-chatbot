// import only the necessary functions from the utility module
import { nanoid } from '@/lib/utils'
import Chat from '@/components/chat'

// use PascalCase for the component name
export default function IndexPage() {
  // generate the unique ID outside of the returned JSX
  const id = nanoid()

  // wrap the returned JSX in a fragment to avoid unnecessary wrapping div
  return <>
    <Chat id={id} />
  </>
}

