// Importing the type Message from the ai module.
import { type Message } from 'ai'

// Defining the Chat interface which extends Record<string, any>.
// The Chat interface has the following properties:
// - id: a string representing the unique identifier of the chat.
// - title: a string representing the title of the chat.
// - createdAt: a Date object representing when the chat was created.
// - userId: a string representing the unique identifier of the user.
// - path: a string representing the file path of the chat.
// - messages: an array of Message objects.
// - sharePath?: an optional string representing the shared file path of the chat.
export interface Chat extends Record<string, any> {
  id: string
  title: string
  createdAt: Date
  userId: string
  path: string
  messages: Message[]
  sharePath?: string
}

// Defining a type ServerActionResult which is a Promise that resolves to either
// the Result type or an object with a single property 'error' which is a string.
export type ServerActionResult<Result> = Promise<
  // The resolved value can be either the Result type or an object with a single
  // property 'error' which is a string.
  | Result
  | {
      error: string
    }
>

