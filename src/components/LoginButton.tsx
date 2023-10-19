import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Image } from 'antd'
import type { MenuProps } from 'antd'
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUserName] = useState('')
  const router = useRouter()

  useEffect(() => {
    let user = localStorage.getItem('user')
    user
      ? (setUserName(JSON.parse(user)?.username), setLoggedIn(true))
      : setLoggedIn(false)
  }, [])

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{username}</span>,
      icon: <UserOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: <span>Packages</span>,
      icon: <AppstoreOutlined />,
      onClick: () => {
        setTimeout(() => {
          router.push('/user/packages')
        })
      }
    },
    {
      type: 'divider'
    },
    {
      key: '3',
      label: <span>Access Tokens</span>,
      icon: <DatabaseOutlined />,
      onClick: () => {
        // getPackageDetails()
        setTimeout(() => {
          router.push('/user/tokens')
        })
      }
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: <span>Sign Out</span>,
      icon: <LogoutOutlined />,
      onClick: () => {
        router.push('/')
        localStorage.removeItem('token')
        setTimeout(() => {
          window.location.reload()
        }, 100)
      }
    }
  ]
  return loggedIn ? (
    <Dropdown menu={{ items }} placement='bottom' arrow>
      <Image
        src='https://epm.t.e0a.cc/images/default_avatar.png'
        alt='avatar'
        width={60}
        height={60}
        preview={false}
      ></Image>
    </Dropdown>
  ) : (
    <Link href='/login'>
      <Button size='large'>Sign In</Button>
    </Link>
  )
}
