import React, { useState, useEffect } from 'react'
import { Layout, Space, Divider, Button, Table } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from 'antd-style'
import { useRouter } from 'next/router'
import { TableRowSelection } from 'antd/lib/table/interface'

const ThemeProvider = _ThemeProvider as any

interface DataSourceItem {
  key: string
  name: string
  type: string
  token: string
  created: string
  last_used: string
}

export default function UserTokens () {

  // token的信息从数据库中获取
  const [dataSource, setDataSource] = useState<DataSourceItem[]>([
    {
      key: '1',
      name: 'John Brown',
      token: '1222222',
      type: 'read-only',
      created: 'New York No. 1 Lake Park',
      last_used: '2016-10-03'
    },
    {
      key: '2',
      name: 'John Brown',
      type: 'read-only',
      token: 'epm_11111',
      created: 'New York No. 1 Lake Park',
      last_used: '2016-10-05'
    },
    {
      key: '3',
      name: 'John Brown',
      type: 'read-only',
      token: '@333333s',
      created: 'New York No. 1 Lake Park',
      last_used: '2016-10-06'
    },
    {
      key: '4',
      name: 'John Brown',
      type: 'read-only',
      token: 'iopdddddd',
      created: 'New York No. 1 Lake Park',
      last_used: '2016-10-09'
    }
  ])

  // 记录需要删除的键
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])

  const [name, setName] = useState('')
  const [type, setType] = useState('')


  // 读取token中的各种数据
  // useEffect(() => {
  //   let data = localStorage.getItem('access-token')
  //   data ? JSON.parse(data) : null
  // }, [])

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
    }
  ]

  // 这个点击之后会触发一个 删除数据库中token值的方法

  const handleDeleteSelected = () => {
    const updatedDataSource = dataSource.filter(
      item => !selectedRowKeys.includes(item.key)
    )
    setDataSource(updatedDataSource)
    setSelectedRowKeys([])
  }
  const rowSelection: TableRowSelection<DataSourceItem> = {
    selectedRowKeys,
    onChange: selectedRowKeys => {
      setSelectedRowKeys(selectedRowKeys)
    }
  }
  const [themeMode, setThemeMode] = useTheme()
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
        background-color: transparent !important;
      `
    }
  })

  const { styles } = userStyles()
  const router = useRouter()
  const hasItem = dataSource.length === 0
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

            {hasItem ? (
              <span>you have no tokens ,create one</span>
            ) : (
              <Table<DataSourceItem>
                rowSelection={rowSelection}
                columns={columns}
                dataSource={dataSource}
              />
            )}
          </div>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
