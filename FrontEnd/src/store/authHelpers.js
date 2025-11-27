export function getToken(){
  try { return localStorage.getItem('wt_token') }
  catch(e){ return null }
}
export function setToken(token){
  try { localStorage.setItem('wt_token', token) } catch(e){}
}
export function logout(){
  try { localStorage.removeItem('wt_token') } catch(e){}
  window.location.href = '/login'
}
