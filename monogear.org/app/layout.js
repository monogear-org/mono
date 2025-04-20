import { Inter, Lato } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const lato = Lato({ subsets: ['latin'], weight: ["400"], variable: "--font-lato" })

export const metadata = {
    title: 'Monogear',
    description: 'Monogear is a self-hostable, fully programmable mono-repo platform for end-to-end DevOps.',
}

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} ${lato.variable} dark overflow-x-hidden max-w-screen`}>{children}</body>
        </html>
    )
}
