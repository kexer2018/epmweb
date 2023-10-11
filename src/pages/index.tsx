import React from 'react'
import styles from './page.module.css'
import 'antd/dist/reset.css'
import Footer from '@/components/Footer'
import Introduce from '@/components/Introduce'
import MainContent from '@/components/MainContent'
import Contact from '@/components/Contact'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import { useTheme } from '@/hooks/useTheme'
import { Divider } from 'antd'

const ThemeProvider = _ThemeProvider as any

export default function Home () {
  const [themeMode, setThemeMode] = useTheme()
  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <img
        src='https://epm.t.e0a.cc/images/banner.png'
        alt='banner'
        style={{
          width: 1902,
          zIndex: -1,
          position: 'absolute',
          display: 'block',
        }}
      />
      <div className={styles.page}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <main className={styles.main}>
          <Introduce />
        </main>
        <Contact />
        <MainContent />
        <Divider />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
