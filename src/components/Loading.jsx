import { motion } from 'framer-motion'

const Loading = () => {

    return (

        <div className="flex min-h-screen items-center justify-center bg-zinc-950">

            <motion.div
                animate={{
                    rotate: 360,
                }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                }}
                className="h-12 w-12 rounded-full border-4 border-zinc-700 border-t-purple-500"
            />

        </div>

    )
}

export default Loading