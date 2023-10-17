import React, { useState, useEffect } from 'react'
import { Button, Dropdown, Image } from 'antd'
import type { MenuProps } from 'antd'
import moment from 'moment'
import {
  LogoutOutlined,
  AppstoreOutlined,
  UserOutlined,
  DatabaseOutlined
} from '@ant-design/icons'
import Link from 'next/link'
import { useRouter } from 'next/router'


const register = 'http://127.0.0.1:7001'

export default function Login () {
  const [loggedIn, setLoggedIn] = useState(false)
  const [username, setUserName] = useState('')
  const router = useRouter()


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

  let packdetails: Array<any> = []
  async function getPackageName (username: string): Promise<string[]> {
    const packageUrl = `${register}/-/org/${username}/package`
    const data = await fetch(packageUrl, {
      method: 'GET'
    })
    return Object.keys(await data.json())
  }

  async function getPackageDetails () {
    const packages = await getPackageName(username)
    const urls = packages.map(pack => (pack = `${register}/${pack}`))
    const fetchPromises = urls.map(url => fetch(url))
    const responses = await Promise.all(fetchPromises)
    const dataPromises = responses.map(response => response.json())
    const dataArray = await Promise.all(dataPromises)
    dataArray.forEach(data => {
      let p = {
        name: data.name,
        description: data.description,
        latest: data['dist-tags'].latest,
        modified: moment(data.time.modified).format('YYYY-MM-DD HH:mm:ss')
      }
      packdetails.push(p)
    })
    // dispatch(setData(packdetails as any))
    console.log(packdetails,'+++++++++')
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
      onClick: async () => {
        await getPackageDetails()
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
