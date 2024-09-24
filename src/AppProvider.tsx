import { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(new QueryClient({}))
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
