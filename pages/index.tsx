import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <main
            className={`mngo-flex mngo-min-h-screen mngo-flex-col mngo-items-center mngo-justify-between mngo-p-24 ${inter.className}`}
        >
            yo bro
        </main>
    )
}
