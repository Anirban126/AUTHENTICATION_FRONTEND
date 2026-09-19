import { motion } from 'framer-motion'


const Home = ({
    user,
    onRefresh,
    onLogout,
    onLogoutAll,
}) => {

    return (

        <div className="min-h-screen bg-zinc-950 text-white">


            {/* NAVBAR */}

            <nav className="border-b border-white/10 bg-white/5">

                <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

                    <h1 className="text-xl font-bold">
                        AuthFlow
                    </h1>


                    <button
                        onClick={onLogout}
                        className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm text-red-400 hover:bg-red-500/20"
                    >
                        Logout
                    </button>

                </div>

            </nav>


            {/* MAIN */}

            <main className="mx-auto flex max-w-6xl justify-center px-6 py-20">


                <motion.div
                    initial={{
                        opacity: 0,
                        y: 30,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    className="w-full max-w-2xl"
                >


                    {/* Welcome */}

                    <div className="mb-10">

                        <p className="text-sm text-purple-400">
                            AUTHENTICATED
                        </p>

                        <h2 className="mt-2 text-5xl font-bold">
                            Hello, {user?.username}
                        </h2>

                        <p className="mt-4 text-zinc-400">
                            You are successfully logged in.
                        </p>

                    </div>


                    {/* User information */}

                    <div className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6">

                        <h3 className="mb-5 text-xl font-semibold">
                            Your account
                        </h3>


                        <div className="space-y-5">


                            <div>

                                <p className="text-sm text-zinc-500">
                                    Username
                                </p>

                                <p className="mt-1 text-lg">
                                    {user?.username}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-zinc-500">
                                    Email
                                </p>

                                <p className="mt-1 text-lg">
                                    {user?.email}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-zinc-500">
                                    Email status
                                </p>

                                <p className="mt-1 text-green-400">
                                    Verified ✓
                                </p>

                            </div>


                        </div>

                    </div>


                    {/* Session actions */}

                    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">

                        <h3 className="mb-5 text-xl font-semibold">
                            Session
                        </h3>


                        <div className="grid gap-3 sm:grid-cols-2">


                            <button
                                onClick={onRefresh}
                                className="rounded-xl bg-blue-600 px-5 py-3 font-medium hover:bg-blue-500"
                            >
                                Refresh token
                            </button>


                            <button
                                onClick={onLogout}
                                className="rounded-xl bg-zinc-800 px-5 py-3 font-medium hover:bg-zinc-700"
                            >
                                Logout
                            </button>


                            <button
                                onClick={onLogoutAll}
                                className="rounded-xl bg-red-600 px-5 py-3 font-medium hover:bg-red-500 sm:col-span-2"
                            >
                                Logout all devices
                            </button>


                        </div>

                    </div>


                </motion.div>

            </main>

        </div>

    )
}

export default Home