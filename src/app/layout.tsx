import './style.css'
import type { Metadata } from 'next'
 
export const metadata: Metadata = {
  title: {
    template: '%s - Elections',
    default: 'Elections'
  },
  description: '',
}

export default function RootLayout({ children }: { children: React.ReactNode }){
    return (
        <html lang="en">
            <head>
            </head>
            <body>
                <div id="root">{children}</div>
            </body>
        </html>
    )
  }