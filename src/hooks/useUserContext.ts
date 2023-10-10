import React, {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction
} from 'react'

export interface User {
  username: string
  // 可以包括其他用户信息
}

interface UserContextType {
  user: User | null
  setUser: Dispatch<SetStateAction<User | null>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function useUser () {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = React.useState<User | null>(null)

  return {
    user,
    setUser,
    children
  }
}
