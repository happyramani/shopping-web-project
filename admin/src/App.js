import React from 'react'
import Admin from './pages/Admin'
import Navbar from './components/Navbar'

function App() {
  return (
    <main className='bg-primary text-tertiary'>
      <div className='mx-auto max-w-[1500px]'>
        <Navbar/>
        <Admin/>
      </div>
    </main>
  )
}

export default App