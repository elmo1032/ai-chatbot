// Import necessary modules and functions
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { formatDate } from '@/lib/utils' // Utility function to format date
import { getSharedChat } from '@/app/actions' // Function to fetch shared chat
import { ChatList } from '@/components/chat-list' // Component to display chat messages
import { FooterText } from '@/components/footer' // Component to display footer text

// Define the SharePageProps interface for the SharePage component's props
interface SharePageProps {
  params: {
    id: string
  }
}

// Generate metadata for the chat page
export async function generateMetadata({
  params
}: SharePageProps): Promise<Metadata> {
  const chat = await getSharedChat(params.id) // Fetch the shared chat

  return {
    title: chat?.title.slice(0, 50) ?? 'Chat' // Return the chat title (limited to 50 characters) or 'Chat' if it doesn't exist
  }
}

// SharePage component for the chat page
export default async function SharePage({ params }: SharePageProps) {
  const chat = await getSharedChat(params.id) // Fetch the shared chat

  // Check if the chat and its share path exist
  if (!chat || !chat?.sharePath) {
    notFound() // Display a 404 error if they don't
  }

  // Return the chat page with the chat title, date, number of messages, and a list of messages
  return (
    <>
      <div className="flex-1 space-y-6">
        <div className="px-4 py-6 border-b bg-background md:px-6 md:py-8">
          <div className="max-w-2xl mx-auto md:px-6">
            <div className="space-y-1 md:-mx-8">
              <h1 className="text-2xl font-bold">{chat.title}</h1> {/* Display the chat title */}
              <div className="text-sm text-muted-foreground">
                {formatDate(chat.createdAt)} {/* Display the chat creation date */} · {chat.messages.length} {/* Display the number of messages */} messages
              </div>
            </div>
          </div>
        </div>
        <ChatList messages={chat.messages} /> {/* Display the chat messages using the ChatList component */}
      </div>
      <FooterText className="py-8" /> {/* Display the footer text using the FooterText component */}
    </>
  )
}
