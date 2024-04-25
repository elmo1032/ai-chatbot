// Import necessary modules and functions
import { type Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'

// Import authentication and chat-related functions
import { auth } from '@/auth'
import { getChat } from '@/app/actions'

// Define the ChatPageProps interface for the ChatPage component's props
export interface ChatPageProps {
  params: {
    id: string // The ID of the chat
  }
}

// generateMetadata function to fetch metadata for the chat page
export async function generateMetadata({
  params // The params object containing the chat ID
}: ChatPageProps): Promise<Metadata> {
  const session = await auth() // Authenticate the user

  if (!session?.user) { // If the user is not authenticated
    return {} // Return an empty metadata object
  }

  const chat = await getChat(params.id, session.user.id) // Fetch the chat by ID
  return {
    title: chat?.title.toString().slice(0, 50) ?? 'Chat' // Set the title based on the chat title or 'Chat' if no title is available
  }
}

// ChatPage component to render the chat UI
export default async function ChatPage({ params }: ChatPageProps) {
  const session = await auth() // Authenticate the user

  if (!session?.user) { // If the user is not authenticated
    redirect(`/sign-in?next=/chat/${params.id}`) // Redirect to the sign-in page with a return URL
  }

  const chat = await getChat(params.id, session.user.id) // Fetch the chat by ID

  if (!chat) { // If the chat is not found
    notFound() // Return a 404 Not Found response
  }

  if (chat?.userId !== session?.user?.id) { // If the user is not the owner of the chat
    notFound() // Return a 404 Not Found response
  }

  // Render the Chat component with the chat ID and initial messages
  return <Chat id={chat.id} initialMessages={chat.messages} />
}

