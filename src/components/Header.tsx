import { Segmented, Image, Input, Typography, AutoComplete } from 'antd'
import React, { useState } from 'react'
import { useCachedSearch } from '@/hooks/useSearch'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Login from './LoginButton'
import { createStyles } from 'antd-style'

const userInfo = () => ({ user: null, loading: false })

export default function Header ({
  title,
  themeMode,
  setThemeMode,
  isHome
}: any) {
  const [search, setSearch] = useState('')
  const router = useRouter()

  const imageUrl = isHome
    ? '	https://epm.edgeros.com/images/epm_logo_black.png'
    : 'https://epm.edgeros.com/images/logo.png'

  const { data: searchResult, isLoading } = useCachedSearch({
    keyword: search,
    page: 1
  })

  const userStyles = createStyles(({ css }) => {
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
        margin-bottom: 30px;
      `
    }
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

  const { styles } = userStyles()

  return (
    <nav className={styles.container}>
      <Image
        src={imageUrl}
        width={184}
        alt='logo'
        preview={false}
        style={{ marginRight: 8 }}
        onClick={() => {
          router.push('/')
        }}
      />
      <div>
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
      </div>

      <Login />
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
    </nav>
  )
}
