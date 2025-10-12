import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const session: Ref<Session | null> = ref(null)

  function setUser(newUser: User | null) {
    user.value = newUser
  }
  function setSession(newSession: Session | null) {
    session.value = newSession
  }
  return { user, setUser, session, setSession }
})
