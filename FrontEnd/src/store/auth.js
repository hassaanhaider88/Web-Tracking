import create from 'zustand'
import { setToken as saveToken, getToken as loadToken } from './authHelpers'

export const useAuthStore = create((set) => ({
  user: null,
  token: loadToken(),
  setAuth: (user, token) => { saveToken(token); set({ user, token }) },
  logout: () => { saveToken(null); localStorage.removeItem('wt_token'); set({ user: null, token: null }); window.location.href='/login' }
}))
