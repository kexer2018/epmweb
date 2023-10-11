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

export default function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUserName] = useState('')

  useEffect(() => {
    let user = localStorage.getItem('user')
    let token = localStorage.getItem('token')
    if (!token) {
      setLoggedIn(false)
    } else if (token && user) {
      const username = JSON.parse(user)?.username
      setUserName(username)
      setLoggedIn(true)
    }
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
      label: <Link href='/user/packages'>Packages</Link>,
      icon: <AppstoreOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '3',
      label: (
        <a
          target='_blank'
          rel='noopener noreferrer'
          href='https://www.aliyun.com'
        >
          Access Tokens
        </a>
      ),
      icon: <DatabaseOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '4',
      label: <span>Sign Out</span>,
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem('token')
        window.location.reload()
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
