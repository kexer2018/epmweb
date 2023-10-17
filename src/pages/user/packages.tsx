import React, { useEffect, useState } from 'react'
import { Layout, Space, Divider, Image, List } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'

import styles from './packages.module.css'

const { Content } = Layout
const ThemeProvider = _ThemeProvider as any

// 这些数据都可以从数据库获取，调用一个后端的 函数，获取关于包的信息的值
const data = [
  {
    title: '@edgeros/tset-epm',
    readme: 'tset',
    latest: '1.0.1',
    latestTime: '2023-09-15 11:34:24'
  },
  {
    title: '@edgeros/welcome',
    readme: 'A warm welcome from EdgerOS community!',
    latest: '0.1.35',
    latestTime: '2023-08-18 14:16:22'
  },
  {
    title: '@edgeros/fs-async',
    readme: 'JSRE 运行时,异步文件系统模块。',
    latest: '0.0.1',
    latestTime: '2023-09-11 13:37:48'
  }
]

export default function UserPackage () {
  const [themeMode, setThemeMode] = useTheme()
  const [username, setUsername] = useState(null)
  useEffect(() => {
    let user = localStorage.getItem('user')
    user ? setUsername(JSON.parse(user).username) : null
  }, [])

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
                    <p>{username}@acoinfo.com</p>
                  </div>
                  <div>
                    <h3>Scope</h3>
                    <p>@edgeros</p>
                  </div>
                </div>
              </div>
              <Content>
                {/* 这里的包的信息全部从数据库中获取,先用假数据占位 */}
                <List
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta
                        title={
                          <a href='##'>
                            <h1 style={{ color: '#00b', fontSize: '1.8em' }}>
                              {item.title}
                            </h1>
                          </a>
                        }
                        description={
                          <div>
                            <h3>{item.readme}</h3>
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
