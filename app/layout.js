import "./styles/globals.css"


export const metadata = {
  title: 'image creator',
  description: 'a image creator',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
