import React from 'react'
import { Image } from 'antd'
import { useRouter } from 'next/router'

export default function NewTokens () {
  return (
    <main>
      <header></header>
      <div>
        <section>
          <h1>New Access Token</h1>
          <p>
            Access tokens can be used instead of your password when using the
            npm CLI to download or publish packages.
          </p>
          <div>
            <label>Name</label>
            <input type='text' />
          </div>
          <div>
            <p>Select type</p>
            <p>
              The type of access token defines its permissions.
              <a href='https://docs.npmjs.com/about-authentication-tokens'>
                Read more about types of access tokens.
              </a>
            </p>
            <div>
              <div>
                <input type='radio' />
                <label>
                  <b>Read-only</b>
                  <span>
                    A read-only token can download public or private packages
                    from the npm registry.
                  </span>
                </label>
              </div>
              <div>
                <input type='radio' />
                <label>
                  <b>Automation</b>
                  <span>
                    An automation token will
                    <b>bypass</b>
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
            <button type='submit'>Generate Token</button>
          </div>
        </section>
        <div>
          <a href=''>Back to Access Tokens</a>
        </div>
      </div>
    </main>
  )
}
