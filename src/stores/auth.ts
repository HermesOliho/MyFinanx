import type { Session, User } from '@supabase/supabase-js'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'
import { supabase } from '@/lib/supabaseClient'

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const session: Ref<Session | null> = ref(null)
  const ready = ref(false)
  const loading = ref(false)
  let initPromise: Promise<void> | null = null

  function setUser(newUser: User | null) {
    user.value = newUser
  }
  function setSession(newSession: Session | null) {
    session.value = newSession
  }

  const isAuthenticated = computed(() => !!session.value)
  const userName = computed(() => {
    const metadataName = (user.value?.user_metadata?.full_name as string | undefined) || ''
    return metadataName || user.value?.email || 'Utilisateur'
  })

  async function init() {
    if (ready.value) return
    if (!initPromise) {
      initPromise = (async () => {
        const { data } = await supabase.auth.getSession()
        setSession(data.session)
        setUser(data.session?.user ?? null)
        supabase.auth.onAuthStateChange((_event, newSession) => {
          setSession(newSession)
          setUser(newSession?.user ?? null)
        })
        ready.value = true
      })()
    }
    await initPromise
  }

  async function signIn(email: string, password: string) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (!error) {
        setSession(data.session)
        setUser(data.user)
      }
      return { error }
    } finally {
      loading.value = false
    }
  }

  async function signUp(fullName: string, email: string, password: string) {
    loading.value = true
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      })
      if (!error) {
        setSession(data.session)
        setUser(data.user)
      }
      return { error, data }
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    loading.value = true
    try {
      const { error } = await supabase.auth.signOut()
      if (!error) {
        setSession(null)
        setUser(null)
      }
      return { error }
    } finally {
      loading.value = false
    }
  }

  async function resetPassword(email: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })
      return { error }
    } finally {
      loading.value = false
    }
  }

  async function updatePassword(newPassword: string) {
    loading.value = true
    try {
      const { error } = await supabase.auth.updateUser({ password: newPassword })
      return { error }
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    session,
    ready,
    loading,
    isAuthenticated,
    userName,
    setUser,
    setSession,
    init,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
  }
})
