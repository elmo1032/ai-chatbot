import { type Session } from 'next-auth'

export interface UserMenuProps {
  user: Session['user']
}
