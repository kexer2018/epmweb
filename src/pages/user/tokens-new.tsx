import React, { useState, useEffect } from 'react'
import { Image, Button, Radio } from 'antd'
import type { RadioChangeEvent } from 'antd'
import { useRouter } from 'next/router'
import styles from './token-news.module.css'
import Link from 'next/link'

export default function NewTokens () {
  const [value, setValue] = useState('')
  const [inputVaule, setInputValue] = useState('')
  const router = useRouter()

  const createToken = () => {
    try {
      let token = Date.now() //这个token的方法后续要换一个新的算法，暂时用这个代替
      // 这个token的值应该存入数据库里，然后渲染的值都从数据库中获取
      token
        ? localStorage.setItem(
            'access-token',
            JSON.stringify({
              token: `EPM_${value}_${inputVaule}_${token}`,
              name: { inputVaule },
              type: { value }
            }) 
          )
        : null
    } catch (e: any) {
      console.error(e.message)
    }
    setTimeout(() => {
      router.push('/user/tokens')
    })
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
              <Radio.Group onChange={e => setValue(e.target.value)}>
                <div>
                  <Radio value={'Read-only'}>
                    <b>Read-only</b>
                  </Radio>
                  <span>
                    A read-only token can download public or private packages
                    from the npm registry.
                  </span>
                </div>
                <br />
                <div>
                  <Radio value={'Automation'}>
                    <b>Automation</b>
                  </Radio>
                  <span>
                    An automation token will &nbsp;<b>bypass</b>&nbsp;
                    two-factor authentication (2FA) when publishing. If you have
                    2FA enabled, you will not be prompted when using an
                    automation token, making it suitable for CI/CD workflows.
                  </span>
                </div>
                <div>
                  <Radio value={'Publish'}>
                    <b>Publish</b>
                  </Radio>
                  <span>
                    A publish token can read and publish packages to the npm
                    registry. If you have 2FA enabled, it will be required when
                    using this token.
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
