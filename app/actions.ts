'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { kv } from '@vercel/kv'

import { auth } from '@/auth'
import { type Chat } from '@/lib/types'

/**
 * getChats function retrieves all chats associated with a user.
 * @param {string | null} userId - The ID of the user.
 * @returns {Promise<Chat[]>} - A promise that resolves to an array of chats.
 */
export async function getChats(userId?: string | null): Promise<Chat[]> {
  // If there's no user ID, return an empty array.
  if (!userId) {
    return []
  }

  // Retrieve all chat IDs associated with the user.
  const chats: string[] = await kv.zrange(`user:chat:${userId}`, 0, -1, {
    rev: true
  })

  // Map over the chat IDs and retrieve the chat data for each.
  const chatPromises = chats.map(async (chat) => {
    const chatData = await kv.hgetall<Chat>(chat)
    return chatData
  })

  // Wait for all chat data to be retrieved and return it as an array.
  return Promise.all(chatPromises)
}

/**
 * getChat function retrieves a single chat by its ID.
 * @param {string} id - The ID of the chat.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Chat | null>} - A promise that resolves to the chat object or null.
 */
export async function getChat(id: string, userId: string): Promise<Chat | null> {
  // Retrieve the chat data by its ID.
  const chat = await kv.hgetall<Chat>(`chat:${id}`)

  // If the chat doesn't exist or the user ID doesn't match, return null.
  if (!chat || (userId && chat.userId !== userId)) {
    return null
  }

  // Return the chat object.
  return chat
}

/**
 * removeChat function removes a chat by its ID and revokes access for the user.
 * @param {object} { id, path } - The ID of the chat and the path to revalidate.
 * @returns {Promise<{ error?: string }>>} - A promise that resolves to an object with an error property if one occurred.
 */
export async function removeChat({ id, path }: { id: string; path: string }): Promise<{ error?: string }> {
  // Authenticate the user.
  const session = await auth()

  // If the user isn't authenticated, return an error.
  if (!session) {
    return {
      error: 'Unauthorized'
    }
  }

  // Retrieve the user ID from the chat.
  const uid = String(await kv.hget(`chat:${id}`, 'userId'))

  // If the user ID doesn't match, return an error.
  if (uid !== session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // Delete the chat and revoke access for the user.
  await kv.del(`chat:${id}`)
  await kv.zrem(`user:chat:${session.user.id}`, `chat:${id}`)

  // Revalidate the cache for the root path and the given path.
  revalidatePath('/')
  return revalidatePath(path)
}

/**
 * clearChats function removes all chats associated with the user and revokes access.
 * @returns {Promise<{ error?: string }>} - A promise that resolves to an object with an error property if one occurred.
 */
export async function clearChats(): Promise<{ error?: string }> {
  // Authenticate the user.
  const session = await auth()

  // If the user isn't authenticated or doesn't have a user ID, return an error.
  if (!session?.user?.id) {
    return {
      error: 'Unauthorized'
    }
  }

  // Retrieve all chat IDs associated with the user.
  const chats: string[] = await kv.zrange(`user:chat:${session.user.id}`, 0, -1)

  // If there are no chats, redirect to the root path.
  if (!chats.length) {
    return redirect('/')
  }

  // Create a pipeline to delete all chats and revoke access.
  const pipeline = kv.pipeline()

  // Map over the chat IDs and delete each chat and revoke access.
  for (const chat of chats) {
    pipeline.del(chat)
    pipeline.zrem(`user:chat:${session.user.id}`, chat)
  }

  // Execute the pipeline and rev
