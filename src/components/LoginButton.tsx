import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from 'antd'
import Link from 'next/link'

export default function Login () {
  const router = useRouter()
  
  return (
    <Link href='/login'>
      <Button size='large'>
        Sign In
      </Button>
    </Link>
    
  )
}
