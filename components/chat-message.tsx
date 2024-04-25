// Import necessary dependencies and components
import { Message } from 'ai' // A Message type or class from the 'ai' module
import remarkGfm from 'remark-gfm' // A plugin for enabling GitHub Flavored Markdown in Remark
import remarkMath from 'remark-math' // A plugin for parsing math in Remark
import { cn } from '@/lib/utils' // A utility function for classname manipulation
import { CodeBlock, MemoizedReactMarkdown } from '@/components/ui' // Custom components
import { IconOpenAI, IconUser } from '@/components/ui/icons' // Custom icons
import { ChatMessageActions } from '@/components/chat-message-actions' // Custom component for chat message actions

// Define the ChatMessageProps interface for the ChatMessage component
export interface ChatMessageProps {
  message: Message
}

// Define the IconProps interface for the Icon component
interface IconProps {
  role: 'user' | 'assistant'
}

// Create the Icon component, which renders a user or assistant icon
const Icon = ({ role, children }: React.PropsWithChildren<IconProps>) => {
  return <IconUser alt={role} className={cn(role === 'user' && 'rotate-180')} />
}

// Create the ChatMessage component, which renders a chat message with the specified role and content
export function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div
      // Apply the group, relative, mb-4, flex, items-start, and md:-ml-12 classes
      className={cn('group relative mb-4 flex items-start md:-ml-12')}
    >
      <div
        // Apply the flex, size-8, shrink-0, select-none, items-center, justify-center, rounded-md, border, shadow, bg-background, and text-primary-foreground classes
        className={cn(
          'flex size-8 shrink-0 select-none items-center justify-center rounded-md border shadow',
          message.role === 'user'
            ? 'bg-background'
            : 'bg-primary text-primary-foreground'
        )}
      >
        {/* Render the Icon component with the specified role */}
        <Icon role={message.role} />
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        {/* Render the MemoizedReactMarkdown component with the specified props */}
        <MemoizedReactMarkdown
          // Apply the prose, break-words, dark:prose-invert, prose-p:leading-relaxed, and prose-pre:p-0 classes
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          // Enable the remarkGfm and remarkMath plugins
          remarkPlugins={[remarkGfm, remarkMath]}
          // Define custom components for rendering specific elements
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  )
                }

                children[0] = (children[0] as string).replace('`▍`', '▍')
              }

              const match = /language-(\w+)/.exec(className || '')

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                )
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ''}
                  value={String(children).replace(/\n$/, '')}
                  {...props}
                />
              )
            }
          }}
        >
          {/* Render the message content */}
          {message.content}
        </MemoizedReactMarkdown>
        {/* Render the ChatMessageActions component with the specified message */}
        <ChatMessageActions message={message} />
      </div>
    </div>
  )
}

