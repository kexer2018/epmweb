import React, { useState, useEffect } from 'react'
import { Image, Button, Radio } from 'antd'
import { useRouter } from 'next/router'
import styles from './token-news.module.css'
import Link from 'next/link'

const REGISTRY = 'http://127.0.0.1:7001'

export default function NewTokens () {
  const [value, setValue] = useState('')
  const [token, setToken] = useState('')
  const [inputVaule, setInputValue] = useState('')
  const router = useRouter()

  useEffect(() => {
    let token = localStorage.getItem('access-token')
    token ? setToken(token) : null
  }, [])

  /**
   * 保存用户生成的token
   */
  async function createToken () {
    // 获取参数
    let payload = {
      name: inputVaule,
      readonly: false,
      automation: false,
      manually: true
    }
    value === 'Read-only'
      ? (payload.readonly = true)
      : (payload.readonly = false)
    value === 'Automation'
      ? (payload.automation = true)
      : (payload.automation = false)
    const tokenURL = `${REGISTRY}/-/npm/v1/tokens`
    const response = await fetch(tokenURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(payload)
    })

    // 传给展示页面token值
    const data = await response.json()
    // const tokenData = {
    //   name: data.name,
    //   token: data.token
    // }
    setTimeout(() => {
      router.push('/user/tokens')
    }, 100)
  }

  return (
    <main className={styles.main}>
      <header>
        <Link href='/'>
          <Image
            src='https://epm.edgeros.com/images/logo.png'
            alt='logo'
            preview={false}
            width={184}
            height={80}
          />
        </Link>
      </header>
      <div className={styles.content}>
        <section>
          <h1>New Access Token</h1>
          <p>
            Access tokens can be used instead of your password when using the
            npm CLI to download or publish packages.
          </p>
          <div className={styles.inputName}>
            <label>Name</label>
            <input type='text' onChange={e => setInputValue(e.target.value)} />
          </div>
          <div>
            <h3>Select type</h3>
            <p>
              The type of access token defines its permissions. &nbsp;
              <a href='https://docs.npmjs.com/about-authentication-tokens'>
                Read more about types of access tokens.
              </a>
              &nbsp;
            </p>
            <div className={styles.select}>
              <Radio.Group
                style={{ color: 'initial' }}
                onChange={e => setValue(e.target.value)}
              >
                <div>
                  <Radio style={{ color: 'initial' }} value={'Read-only'}>
                    <b>Read-only</b>
                  </Radio>
                  <span>
                    A read-only token can download public or private packages
                    from the npm registry.
                  </span>
                </div>
                <br />
                <div>
                  <Radio style={{ color: 'initial' }} value={'Automation'}>
                    <b>Automation</b>
                  </Radio>
                  <span>
                    An automation token will &nbsp;<b>bypass</b>&nbsp;
                    two-factor authentication (2FA) when publishing. If you have
                    2FA enabled, you will not be prompted when using an
                    automation token, making it suitable for CI/CD workflows.
                  </span>
                </div>
              </Radio.Group>
            </div>
          </div>
          <div>
            <Button size='large' onClick={createToken}>
              Generate Token
            </Button>
          </div>
        </section>
        <div
          style={{
            marginTop: 32,
            marginBottom: 16,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Link href='/user/tokens'>Back to Access Tokens</Link>
        </div>
      </div>
    </main>
  )
}
