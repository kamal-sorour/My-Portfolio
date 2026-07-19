"use client";
import React from 'react'
import { ThemeProvider } from '../ThemeProvider/ThemeContext';


function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
     <ThemeProvider>
       {children}
     </ThemeProvider>
    </>
  )
}

export default Providers