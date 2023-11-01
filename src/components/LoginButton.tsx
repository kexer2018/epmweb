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

const REGISTRY = 'http://127.0.0.1:7001'

export default function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUserName] = useState('')
  const [token, setToken] = useState('')
  const router = useRouter()

  useEffect(() => {
    let access_token = localStorage.getItem('access-token')
    access_token
      ? (setLoggedIn(true),
        setToken(access_token),
        // 根据 access_token拿到用户的信息
        fetch(`${REGISTRY}/-/npm/v1/user`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
          },
          method: 'GET'
        })
          .then(res => res.json())
          .then(data => setUserName(data.name)))
      : setLoggedIn(false)
  }, [])

  // 登出的操作
  const logout = async () => {
    const response = await fetch(`${REGISTRY}/-/user/token/${token}`, {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      method: 'DELETE'
    })
    return await response.json()
  }

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
      onClick: async () => {
        const res = await logout()
        if (res.ok === true) {
          localStorage.removeItem('access-token')
          router.push('/')
          setTimeout(() => {
            window.location.reload()
          }, 100)
        }
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
