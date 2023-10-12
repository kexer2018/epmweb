import React from 'react'
import { Layout, Space, Divider, Image, theme } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from 'antd-style'

const { Sider, Content } = Layout
const ThemeProvider = _ThemeProvider as any

export default function UserPackage () {
  const [themeMode, setThemeMode] = useTheme()
  const {
    token: { colorBgContainer }
  } = theme.useToken()

  const userStyles = createStyles(({ css }) => {
    return {
      container: css`
        width: 1170px;
        min-width: 960px;
        padding-left: 15px;
        padding-right: 15px;
        margin-left: auto;
        margin-right: auto;
        display: flex;
        flex-direction: column;
        background-color: #fff;
      `,
      layout: css`
        display: flex;
        padding-top: 80px;
        background-color: #fff;
      `
    }
  })

  const { styles } = userStyles()

  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Layout className={styles.container}>
          <Header themeMode={themeMode} setThemeMode={setThemeMode} />
          <Layout hasSider className={styles.layout}>
            <Sider style={{ background: colorBgContainer }} width={300}>
              <Image
                src='https://epm.edgeros.com/images/default_avatar.png'
                alt='avatar'
                preview={false}
                width={200}
                height={200}
                style={{ margin: '0 50px' }}
              />
              <div style={{ width: 200, height: 200, margin: '0 50px' }}>
                <h1>username</h1>
                <div>
                  <h3>Email</h3>
                  <p>email</p>
                </div>
                <div>
                  <h3>Scope</h3>
                  <p>@edgeros</p>
                </div>
              </div>
            </Sider>
            <Content>
              {/* 这里的包的信息全部从数据库中获取 */}
      


            </Content>
          </Layout>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
