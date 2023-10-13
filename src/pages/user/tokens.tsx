import React, { useState, useEffect } from 'react'
import { Layout, Space, Divider, Button, Table } from 'antd'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { useTheme } from '@/hooks/useTheme'
import { createStyles } from 'antd-style'
import { useRouter } from 'next/router'
import type { ColumnsType } from 'antd/es/table'

const ThemeProvider = _ThemeProvider as any

interface DataType {
  key: React.Key
  name: string
  type: string
  created: string
  last_used: string
  delete: any
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text: string) => <a>{text}</a>
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
    title: 'Delete',
    dataIndex: 'delete'
  }
]

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    type: 'read-only',
    created: 'New York No. 1 Lake Park',
    last_used: '2016-10-03',
    delete: false
  },
  {
    key: '2',
    name: 'John Brown',
    type: 'read-only',
    created: 'New York No. 1 Lake Park',
    last_used: '2016-10-05',
    delete: false
  },
  {
    key: '3',
    name: 'John Brown',
    type: 'read-only',
    created: 'New York No. 1 Lake Park',
    last_used: '2016-10-06',
    delete: false
  },
  {
    key: '4',
    name: 'John Brown',
    type: 'read-only',
    created: 'New York No. 1 Lake Park',
    last_used: '2016-10-09',
    delete: false
  }
]

export default function UserTokens () {
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
      `
    }
  })

  const { styles } = userStyles()
  const router = useRouter()
  const isLoading = true

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
                  onClick={() => {
                    router.push('/')
                  }}
                >
                  <span style={{ color: 'red' }}>Delete Selected Tokens</span>
                </Button>
              </div>
            </div>
            <Divider />

            {/* {isLoading ? <Button></Button> : <div></div>} */}
            <Table
              rowSelection={{
                type: 'checkbox'
              }}
              columns={columns}
              dataSource={data}
            />
          </div>
          <Divider />
          <Footer />
        </Layout>
      </Space>
    </ThemeProvider>
  )
}
