import React, { useState } from 'react'
import { Button, Dropdown, Image } from 'antd'
import type { MenuProps } from 'antd'
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  SettingOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { useUser } from '@/hooks/useUserContext'

export default function Login () {
  let token = null
  if (typeof localStorage !== 'undefined') {
    token = localStorage.getItem('token')
  }

  const { user } = useUser()
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <span>{user?.username}</span>,
      icon: <UserOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '2',
      label: <a href='https://www.aliyun.com'>Packages</a>,
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
          Account
        </a>
      ),
      icon: <SettingOutlined />
    },
    {
      type: 'divider'
    },
    {
      key: '4',
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
      key: '5',
      label: <span>Sign Out</span>,
      icon: <LogoutOutlined />,
      onClick: () => {
        localStorage.removeItem('token')
        window.location.reload()
      }
    }
  ]
  return token ? (
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
