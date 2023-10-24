import React, { useEffect, useState } from 'react'
import { Layout, Space, Divider, Image, List } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Link from 'next/link'
import moment from 'moment'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'

import styles from './packages.module.css'

const { Content } = Layout
const ThemeProvider = _ThemeProvider as any

const REGISTRY = 'http://127.0.0.1:7001'

interface PackType {
  name: string
  description: string
  latest: string
  latestTime: string
}

export default function UserPackage () {
  const [themeMode, setThemeMode] = useTheme()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [pack, setPackage] = useState<Array<PackType>>()
  
  useEffect(() => {
    let access_token = localStorage.getItem('access-token')
    access_token
      ? // 根据 access_token拿到用户的信息
        fetch(`${REGISTRY}/-/npm/v1/user`, {
          headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${access_token}`
          }
        })
          .then(res => res.json())
          .then(data => {
            setUsername(data.name)
            setEmail(data.email)
            getPackageDetails(data.name)
          })
      : null
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /**
   * 获取user的包的信息，在package中展示
   */
  let packdetails: Array<PackType> = []
  async function getPackageName (username: string): Promise<string[]> {
    const packageUrl = `${REGISTRY}/-/org/${username}/package`
    const data = await fetch(packageUrl, {
      method: 'GET'
    })
    return Object.keys(await data.json())
  }

  async function getPackageDetails (username: string) {
    const packages = await getPackageName(username)
    if (packages.length === 1 && packages[0] === 'error') {
      return
    }
    const urls = packages.map(pack => (pack = `${REGISTRY}/${pack}`))
    const fetchPromises = urls.map(url => fetch(url))
    const responses = await Promise.all(fetchPromises)
    const dataPromises = responses.map(response => response.json())
    const dataArray = await Promise.all(dataPromises)
    dataArray.forEach(data => {
      let p = {
        name: data.name,
        description: data.description,
        latest: data['dist-tags'].latest,
        latestTime: moment(data.time.modified).format('YYYY-MM-DD HH:mm:ss')
      }
      packdetails.push(p)
    })
    setPackage(packdetails)
  }

  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Layout className={styles.container}>
          <Header
            isHome={false}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
          />
          <Layout className={styles.layout}>
            <div style={{ display: 'flex' }}>
              <div>
                <Image
                  src='https://epm.edgeros.com/images/default_avatar.png'
                  alt='avatar'
                  preview={false}
                  width={200}
                  height={200}
                  style={{ margin: '0 50px' }}
                />
                <div style={{ width: 200, height: 200, margin: '0 50px' }}>
                  <h1>{username}</h1>
                  <div>
                    <h3>Email</h3>
                    <p>{email}</p>
                  </div>
                  <div>
                    <h3>Scope</h3>
                    <p>@edgeros</p>
                  </div>
                </div>
              </div>
              <Content>
                <List
                  itemLayout='horizontal'
                  dataSource={pack}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <Link href={`/package/${item.name}`}>
                            <h1 style={{ color: '#00b', fontSize: '1.8em' }}>
                              {item.name}
                            </h1>
                          </Link>
                        }
                        description={
                          <div>
                            <h3>{item.description}</h3>
                            <h3>latest: {item.latest}</h3>
                            <h3>latestTime: {item.latestTime}</h3>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />
              </Content>
            </div>
          </Layout>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
