import React, { useState, useEffect } from 'react'
import { Layout, Space, Divider, Button, Table } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import moment from 'moment'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'
import { useRouter } from 'next/router'
import { TableRowSelection } from 'antd/lib/table/interface'
import styles from './tokens.module.css'

const ThemeProvider = _ThemeProvider as any

interface DataSourceItem {
  key: number
  name: string
  type: string
  token: string
  created: string
  last_used: string
}

const REGISTRY = 'http://127.0.0.1:7001'

export default function UserTokens () {
  const [dataSource, setDataSource] = useState<DataSourceItem[]>()
  const [tokenKey, setTokenKey] = useState<Array<any>>([])
  const router = useRouter()

  // 读取token中的数据
  useEffect(() => {
    let token = localStorage.getItem('access-token')
    fetch(`${REGISTRY}/-/npm/v1/tokens`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        const p: any = data.objects
        setTokenKey(p)
        // 对数据进行处理
        let tokenRes: Array<DataSourceItem> = []
        const tokenArray = p.filter((obj: any) => obj.manually === true)
        tokenArray.map((item: any, index: number) => {
          let obj = {
            key: index + 1,
            name: item.name,
            type: item.readonly
              ? 'readonly'
              : item.automation
              ? 'automation'
              : '',
            token: item.token,
            created: moment(item.created).format('YYYY-MM-DD HH:mm:ss'),
            last_used: item.lastUsedAt
              ? moment(item.lastUsedAt).format('YYYY-MM-DD HH:mm:ss')
              : ''
          }
          tokenRes.push(obj)
        })
        setDataSource(tokenRes)
      })
  }, [])

  // 记录需要删除的键
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name'
    },
    {
      title: 'Access_Token',
      dataIndex: 'token'
    },
    {
      title: 'Type',
      dataIndex: 'type'
    },

    {
      title: 'Created',
      dataIndex: 'created'
    },
    {
      title: 'Last_used',
      dataIndex: 'last_used'
    },
    {
      title: ' expiredAt',
      dataIndex: 'expiredat'
    }
  ]

  //这个点击之后会触发一个 删除数据库中token值的方法
  const handleDeleteSelected = async () => {
    // 根据tokenKey 删除数据库中token值
    let token = localStorage.getItem('access-token')
    const needDeleteToken = dataSource?.filter(item => {
      return selectedRowKeys.includes(item.key)
    })

    // 需要根据选中的token名找出对应的tokenKey
    const keys: string[] = []
    needDeleteToken?.forEach(obj2 => {
      const name = obj2.name
      const matchingObj = tokenKey.find(obj => obj.name === name)
      if (matchingObj) {
        keys.push(matchingObj.key)
      }
    })
    const urls = keys?.map(item => `${REGISTRY}/-/npm/v1/tokens/token/${item}`)
    const fetchPromises = urls?.map(url =>
      fetch(url, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    )
    await Promise.all(fetchPromises as any)
    router.reload()
  }
  const rowSelection: TableRowSelection<DataSourceItem> = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }
  const [themeMode, setThemeMode] = useTheme()
  const emptyDataMessage = <span>you have no token ,create one</span>


  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <Layout className={styles.container}>
          <Header
            isHome={false}
            themeMode={themeMode}
            setThemeMode={setThemeMode}
          />
          <div style={{ padding: 40 }}>
            <div>
              <h1>Access Tokens</h1>
              <div
                style={{
                  display: 'flex',
                  width: '40%',
                  justifyContent: 'space-between'
                }}
              >
                <Button
                  size='large'
                  onClick={() => {
                    router.push('/user/tokens-new')
                  }}
                >
                  Generate New Token
                </Button>
                <Button
                  size='large'
                  onClick={handleDeleteSelected}
                  disabled={selectedRowKeys.length === 0}
                >
                  <span style={{ color: 'red' }}>Delete Selected Tokens</span>
                </Button>
              </div>
            </div>
            <Divider />
            <Table<DataSourceItem>
              rowSelection={rowSelection}
              columns={columns}
              dataSource={dataSource}
              locale={{ emptyText: emptyDataMessage }}
            />
          </div>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
