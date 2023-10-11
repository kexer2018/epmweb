import React from 'react'
import { Layout, Space, Divider, Image } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'

const { Sider, Content } = Layout

const layoutStyle: React.CSSProperties = {
  display: 'flex',
  paddingTop: 50
}

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9'
}

const siderStyle: React.CSSProperties = {
  width: 300,
  backgroundColor: '#fff'
}

const footerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea'
}

const ThemeProvider = _ThemeProvider as any

export default function UserPackage () {
  const [themeMode, setThemeMode] = useTheme()
  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Layout>
          <Header themeMode={themeMode} setThemeMode={setThemeMode} />
          <Layout style={layoutStyle} hasSider>
            <Sider style={siderStyle}>
              <div style={{ width: 200, height: 200, margin: '0 50px' }}>
                <Image
                  src='https://epm.edgeros.com/images/default_avatar.png'
                  alt='avatar'
                  preview={false}
                  width={200}
                  height={200}
                />
              </div>
              <div style={{ width: 200, height: 200, margin: '0 50px' }}></div>
            </Sider>
            <Content style={contentStyle}>Content</Content>
          </Layout>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
