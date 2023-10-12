'use client'
import React from 'react'
import styles from './MainContent.module.css'
import Link from 'next/link'
import Contact from '@/components/Contact'

export default function MainContent () {
  return (
    <div className={styles.main}>
      <Contact />
      <p>
        This site hosts open source Javascript packages that run on EdgerOS®.
      </p>
      <p>
        <strong>
          Note, here we serve
          <code>@edgeros</code>
          scoped packages only.
        </strong>
      </p>
      <h2>Usage</h2>
      <p>
        All you need is the
        <code>npm</code>
        command and an
        <Link
          href='https://id.edgeros.com/register'
          style={{
            textDecoration: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          <strong>&nbsp; AcoID &nbsp;</strong>
        </Link>
        to consume from or publish to this registry.
      </p>
      <br />
      <h3>Login</h3>
      <pre>
        <code>
          <span>
            # will be prompt for your AcoID username, password and a public
            email
          </span>
          <br />
          <span className={styles.pln}>
            npm login --registry=https://registry.epm.edgeros.com
            --scope=@edgeros
          </span>
        </code>
      </pre>
      <h3>Install</h3>
      <pre>
        <code>
          <span className={styles.pln}>npm install @edgeros/welcome</span>
        </code>
      </pre>
      <p>
        <strong>
          Please be noted, the
          <Link
            href='https://github.com/npm/cli/issues/3515'
            target='_blank'
            style={{
              color: '#2db7f5',
              textDecoration: 'none',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            &nbsp;npm 7.7.0+ has a bug &nbsp;
          </Link>
          that &apos;scope &apos; might be lost during
          <code>npm login</code>
          .You should manually add below line into your .npmrc after successful
          EPM login.
        </strong>
      </p>
      <code>@edgeros:registry=https://registry.epm.edgeros.com/</code>
      <h3>Publish</h3>
      <pre>
        <code>
          <span># create an empty project direcotry</span>
          <br />
          <span className={styles.pln}>mkdir my_package</span>
          <br />
          <span># change current directory into the project</span>
          <br />
          <span className={styles.pln}>cd my_package</span>
          <br />
          <span>
            # be sure to name the package with &apos;@edgeros/&apos; scope
            prefix here!
          </span>
          <br />
          <span className={styles.pln}>npm init</span>
          <br />
          <span>
            # be sure to include your awesome code before publish step
          </span>
          <br />
          <span className={styles.pln}>touch index.js</span>
          <br />
          <span># the publish should success if the name is available</span>
          <br />
          <span className={styles.pln}>npm publish</span>
          <br />
        </code>
      </pre>
      <p>
        Check
        <Link
          href='https://docs.npmjs.com/cli/v7/commands/npm-publish'
          target='_blank'
          style={{
            color: '#2db7f5',
            textDecoration: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          {' '}
          &nbsp;npm publish &nbsp;
        </Link>
        for more information about package publishing.
      </p>
      <h2>Contact</h2>
      <p>
        Contact us
        <Link
          href='mailto:epm@edgeros.com'
          style={{
            color: '#2db7f5',
            textDecoration: 'none',
            outline: 'none',
            cursor: 'pointer'
          }}
        >
          &nbsp;epm@edgeros.com&nbsp;
        </Link>
      </p>
    </div>
  )
}
