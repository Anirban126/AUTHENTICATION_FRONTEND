import { useState } from 'react'
import { motion } from 'framer-motion'

import { authApi } from '../api'


const verifyEmail = ({
    email,
    onVerified,
}) => {

    const [otp, setOtp] = useState('')

    const [error, setError] = useState('')

    const [loading, setLoading] = useState(false)


    const handleSubmit = async (e) => {

        e.preventDefault()

        setError('')
        setLoading(true)


        try {

            const data =
                await authApi.verifyEmail({
                    email,
                    otp,
                })


            if (data.accessToken) {

                localStorage.setItem(
                    'accessToken',
                    data.accessToken
                )

            }


            onVerified(data)

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
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                }}
                className="absolute h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
            />


            <motion.div
                initial={{
                    opacity: 0,
                    scale: 0.9,
                }}
                animate={{
                    opacity: 1,
                    scale: 1,
                }}
                className="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl"
            >

                <div className="mb-8">

                    <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-purple-500/20 text-2xl">
                        ✉
                    </div>

                    <h1 className="text-3xl font-bold">
                        Verify your email
                    </h1>

                    <p className="mt-3 text-zinc-400">
                        We sent an OTP to
                    </p>

                    <p className="mt-1 text-purple-400">
                        {email}
                    </p>

                </div>


                {error && (

                    <div className="mb-5 rounded-lg bg-red-500/10 p-3 text-left text-sm text-red-400">
                        {error}
                    </div>

                )}


                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="text"
                        value={otp}
                        onChange={(e) =>
                            setOtp(
                                e.target.value.replace(/\D/g, '')
                            )
                        }
                        maxLength={6}
                        required
                        placeholder="000000"
                        className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-4 text-center text-3xl tracking-[0.5em] outline-none focus:border-purple-500"
                    />


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
                            ? 'Verifying...'
                            : 'Verify email'}

                    </motion.button>

                </form>

            </motion.div>

        </div>

    )
}

export default verifyEmail