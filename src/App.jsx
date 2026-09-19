import { useEffect, useState } from 'react'

import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import VerifyEmail from './components/verifyEmail.jsx'
import Home from './components/Home.jsx'
import Loading from './components/Loading.jsx'

import { authApi } from './api'


const App = () => {

  const [page, setPage] = useState('login')

  const [user, setUser] = useState(null)

  const [email, setEmail] = useState('')

  const [loading, setLoading] = useState(true)


  // ==========================================
  // GET CURRENT USER
  // ==========================================

  const getCurrentUser = async (token) => {

    try {

      const data =
        await authApi.getMe(token)

      setUser(data.user)

      setPage('home')

      return true

    } catch {

      return false

    }

  }


  // ==========================================
  // CHECK AUTH WHEN APP STARTS
  // ==========================================

  useEffect(() => {

    const checkAuthentication = async () => {

      const accessToken =
        localStorage.getItem(
          'accessToken'
        )


      // No access token

      if (!accessToken) {

        setLoading(false)

        return

      }


      // Try current access token

      const valid =
        await getCurrentUser(
          accessToken
        )


      if (valid) {

        setLoading(false)

        return

      }


      // Access token expired
      // Try refresh token

      try {

        const data =
          await authApi.refreshToken()


        localStorage.setItem(
          'accessToken',
          data.accessToken
        )


        await getCurrentUser(
          data.accessToken
        )


      } catch {

        localStorage.removeItem(
          'accessToken'
        )

        setUser(null)

        setPage('login')

      }


      setLoading(false)

    }


    checkAuthentication()

  }, [])


  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = (data) => {

    localStorage.setItem(
      'accessToken',
      data.accessToken
    )

    setUser(data.user)

    setPage('home')

  }


  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegistered = (email) => {

    setEmail(email)

    setPage('verify')

  }


  // ==========================================
  // VERIFY EMAIL
  // ==========================================

  const handleVerified = (data) => {

    if (data.accessToken) {

      localStorage.setItem(
        'accessToken',
        data.accessToken
      )

    }


    setUser(data.user)

    setPage('home')

  }


  // ==========================================
  // REFRESH TOKEN
  // ==========================================

  const handleRefresh = async () => {

    try {

      const data =
        await authApi.refreshToken()


      localStorage.setItem(
        'accessToken',
        data.accessToken
      )


      await getCurrentUser(
        data.accessToken
      )

    } catch {

      localStorage.removeItem(
        'accessToken'
      )

      setUser(null)

      setPage('login')

    }

  }


  // ==========================================
  // LOGOUT CURRENT DEVICE
  // ==========================================

  const handleLogout = async () => {

    try {

      await authApi.logout()

    } catch (error) {

      console.error(error)

    } finally {

      localStorage.removeItem(
        'accessToken'
      )

      setUser(null)

      setPage('login')

    }

  }


  // ==========================================
  // LOGOUT ALL DEVICES
  // ==========================================

  const handleLogoutAll = async () => {

    try {

      await authApi.logoutAll()

    } catch (error) {

      console.error(error)

    } finally {

      localStorage.removeItem(
        'accessToken'
      )

      setUser(null)

      setPage('login')

    }

  }


  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (loading) {

    return <Loading />

  }


  // ==========================================
  // LOGIN PAGE
  // ==========================================

  if (page === 'login') {

    return (

      <Login
        onLogin={handleLogin}
        onRegister={() =>
          setPage('register')
        }
      />

    )

  }


  // ==========================================
  // REGISTER PAGE
  // ==========================================

  if (page === 'register') {

    return (

      <Register
        onRegistered={handleRegistered}
        onLogin={() =>
          setPage('login')
        }
      />

    )

  }


  // ==========================================
  // VERIFY EMAIL PAGE
  // ==========================================

  if (page === 'verify') {

    return (

      <VerifyEmail
        email={email}
        onVerified={handleVerified}
      />

    )

  }


  // ==========================================
  // HOME PAGE
  // ==========================================

  if (page === 'home') {

    return (

      <Home
        user={user}
        onRefresh={handleRefresh}
        onLogout={handleLogout}
        onLogoutAll={handleLogoutAll}
      />

    )

  }


  return null

}


export default App