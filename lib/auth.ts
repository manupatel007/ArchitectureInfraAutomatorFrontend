export interface User {
  id: string
  name: string
  email: string
  provider: "google" | "microsoft"
  avatar?: string
}

const DUMMY_USER: User = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  provider: "google",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John"
}

export async function signInWithGoogle(): Promise<User> {
  // In a real implementation, this would:
  // 1. Initialize Google OAuth client
  // 2. Generate authorization URL
  // 3. Redirect to Google login
  console.log("Google sign in")
  setAuthToken("dummy_token")
  return DUMMY_USER
}

export async function signInWithMicrosoft(): Promise<User> {
  // In a real implementation, this would:
  // 1. Initialize Microsoft OAuth client
  // 2. Generate authorization URL
  // 3. Redirect to Microsoft login
  console.log("Microsoft sign in")
  setAuthToken("dummy_token")
  return DUMMY_USER
}

export function signOut() {
  localStorage.removeItem("auth_token")
  document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
}

export function getCurrentUser(): User | null {
  const authToken = localStorage.getItem("auth_token")
  if (!authToken) return null

  // For now, return dummy user if token exists
  return DUMMY_USER
}

export function setAuthToken(token: string) {
  localStorage.setItem("auth_token", token)
  // Set cookie for server-side auth checks
  document.cookie = `auth_token=${token}; path=/`
} 