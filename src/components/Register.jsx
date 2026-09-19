import { useState } from 'react'
import { motion } from 'framer-motion'

import { authApi } from '../api'


const Register = ({
    onRegistered,
    onLogin,
}) => {

    const [username, setUsername] = useState('')

    const [email, setEmail] = useState('')

    const [password, setPassword] = useState('')

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')
        setLoading(true)


        try {

            await authApi.register({
                username,
                email,
                password,
            })


            onRegistered(email)

        } catch (error) {

            setError(error.message)

        } finally {

            setLoading(false)

        }

    }


    return (

        <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-zinc-950 px-4 text-white">


            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                }}
                className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
            />


            <motion.div
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                }}
                className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl"
            />


            <motion.div
                initial={{
                    opacity: 0,
                    y: 30,
                }}
                animate={{
                    opacity: 1,
                    y: 0,
                }}
                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
            >

                <div className="mb-8">

                    <p className="mb-2 text-sm text-purple-400">
                        AUTH SYSTEM
                    </p>

                    <h1 className="text-4xl font-bold">
                        Create account
                    </h1>

                    <p className="mt-2 text-zinc-400">
                        Register to continue
                    </p>

                </div>


                {error && (

                    <div className="mb-5 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >


                    {/* Username */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Username
                        </label>

                        <input
                            type="text"
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)
                            }
                            placeholder="Anirban"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>


                    {/* Email */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>


                    {/* Password */}

                    <div>

                        <label className="mb-2 block text-sm">
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            placeholder="••••••••"
                            required
                            className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 outline-none focus:border-purple-500"
                        />

                    </div>


                    <motion.button
                        whileHover={{
                            scale: 1.02,
                        }}
                        whileTap={{
                            scale: 0.98,
                        }}
                        disabled={loading}
                        className="w-full rounded-xl bg-purple-600 py-3 font-semibold hover:bg-purple-500 disabled:opacity-50"
                    >

                        {loading
                            ? 'Creating account...'
                            : 'Create account'}

                    </motion.button>


                </form>


                <div className="mt-6 text-center text-sm text-zinc-400">

                    Already have an account?

                    <button
                        onClick={onLogin}
                        className="ml-2 text-purple-400"
                    >
                        Login
                    </button>

                </div>

            </motion.div>

        </div>

    )
}

export default Register