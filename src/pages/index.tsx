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
import { Divider, Image } from 'antd'

const ThemeProvider = _ThemeProvider as any

export default function Home () {
  const [themeMode, setThemeMode] = useTheme()

  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <div className={styles.banner}>
        <Image
          src='https://epm.t.e0a.cc/images/banner.png'
          alt='banner'
          width={'100%'}
          height={889}
        />
      </div>
      <div className={styles.page}>
        <Header
          isHome={true}
          themeMode={themeMode}
          setThemeMode={setThemeMode}
        />
        <Introduce />
        <MainContent />
        <Divider />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
