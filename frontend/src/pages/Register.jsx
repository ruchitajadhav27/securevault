import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handle = async (e) => {
    e.preventDefault()
    setError(null)

    if (!username || password.length < 6) {
      return setError('Username and password are required (min 6 chars)')
    }

    try {
      await register(username, password)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.error || 'Register failed')
    }
  }

  return (
    <div className="page-shell">
      <div className="card p-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-primary">SecureVault</p>
          <h1 className="mt-4 text-3xl font-semibold text-slate-900">Create an account</h1>
          <p className="mt-2 text-slate-500">Register to start saving encrypted notes.</p>
        </div>

        <form onSubmit={handle} className="space-y-4">
          <div className="form-field">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              className="input-base"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="mb-2 block text-sm font-medium text-slate-700" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              className="input-base"
              placeholder="Enter password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <button type="submit" className="button-primary w-full">Register</button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
