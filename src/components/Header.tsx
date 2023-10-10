import { Segmented, Image, Input, Typography, AutoComplete, Button } from 'antd'
import { createStyles, cx } from 'antd-style'
import React, { useState } from 'react'
import { useCachedSearch } from '@/hooks/useSearch'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Login from './LoginButton'

const useStyles = createStyles(({ token, css }) => {
  return {
    container: css`
      position: relative;
      width: 100%;
      height: 5rem;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      top: 30px;
    `,
    btn: css`
      height:'50px',
      font-size:'18px',
      padding:'12px 24px',
      border:'1px solid #000',
      borderRadius:'6px'
    `
  }
})

const userInfo = () => ({ user: null, loading: false })
export default function Header ({ title, themeMode, setThemeMode }: any) {
  const { styles } = useStyles()
  const [search, setSearch] = useState('')
  const router = useRouter()

  const { user, loading } = userInfo()
  const { data: searchResult, isLoading } = useCachedSearch({
    keyword: search,
    page: 1
  })

  const options = React.useMemo(() => {
    if (!searchResult?.objects) {
      return []
    }

    return searchResult.objects.map(object => ({
      label: (
        <Link href={`/package/${object.package.name}`}>
          <Typography.Text>
            {object.package.name}@{object.package.version}
          </Typography.Text>
          <br />
          <Typography.Text type='secondary'>
            {object.package.description}
          </Typography.Text>
        </Link>
      ),
      value: object.package.name
    }))
  }, [searchResult])

  return (
    <header>
      <nav className={styles.container}>
        <span>
          <Link href='/'>
            <Image
              src='	https://epm.edgeros.com/images/epm_logo_black.png'
              width={184}
              alt='logo'
              preview={false}
              style={{ marginRight: 8 }}
              onClick={() => {
                router.push('/')
              }}
            />
          </Link>
          {title}
        </span>
        <span>
          <AutoComplete
            size='large'
            style={{
              width: 550,
              height: 50,
              padding: '6px 24px',
              fontSize: 20,
              color: '#000'
            }}
            options={options}
            onChange={setSearch}
          >
            <Input.Search
              placeholder='输入 NPM 包名、作者、关键字等信息即可搜索...'
              enterButton
              size='large'
              onSearch={() => {
                router.push(`/packages?q=${search}`)
              }}
              loading={!!(search && isLoading)}
            />
          </AutoComplete>
        </span>
        <Login/>
        <span style={{ marginRight: 16 }}>
          <Segmented
            value={themeMode}
            options={[
              { label: '🌞', value: 'light' },
              { label: '🌛', value: 'dark' }
            ]}
            onChange={v => {
              setThemeMode(v as 'dark' | 'light')
            }}
          />
        </span>
      </nav>
    </header>
  )
}
