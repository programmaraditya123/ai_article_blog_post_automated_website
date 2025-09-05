import React from 'react'

const layout = ({children}:{children :React.ReactNode}) => {
  return (
    <html lang='en'>
        <body>
          {/* <NavBar/> */}
            {children}
        </body>
      
    </html>
  )
}

export default layout
