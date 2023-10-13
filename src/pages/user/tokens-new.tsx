import React from 'react'
import { Image, Button } from 'antd'
import { useRouter } from 'next/router'
import styles from './token-news.module.css'
import Link from 'next/link'

export default function NewTokens () {
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
            <input type='text' />
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
              <div>
                <input type='radio' />
                <label>
                  <b>Read-only</b>
                  <br />
                  <span style={{ paddingBottom: 5 }}>
                    A read-only token can download public or private packages
                    from the npm registry.
                  </span>
                </label>
              </div>
              <div>
                <input type='radio' />
                <label>
                  <b>Automation</b>
                  <br />
                  <span>
                    An automation token will &nbsp;<b>bypass</b>&nbsp;
                    two-factor authentication (2FA) when publishing. If you have
                    2FA enabled, you will not be prompted when using an
                    automation token, making it suitable for CI/CD workflows.
                  </span>
                </label>
              </div>
              <div>
                <input type='radio' />
                <label>
                  <b>Publish</b>
                  <br />
                  <span>
                    A publish token can read and publish packages to the npm
                    registry. If you have 2FA enabled, it will be required when
                    using this token.
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div>
            <Link href='/user/tokens'>
              <Button size='large'>Generate Token</Button>
            </Link>
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
