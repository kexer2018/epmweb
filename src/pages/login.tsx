import React, { useState } from 'react'
import { Button, Form, Input, Image } from 'antd'
import styles from './login.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

type FieldType = {
  loginName?: string
  password?: string
}

export default function Login () {
  const router = useRouter()
  const [message, setMessage] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const onFinish = (values: object) => {
    localStorage.setItem('user', JSON.stringify({ username, password }))
    fetch('https://api.t.e0a.cc/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 200) {
          localStorage.setItem('token', data.data.accessToken)
          router.push('/')
        } else {
          setMessage('Password is not correct,Please check your password!!')
        }
      })
  }

  const checkUser = (event: any) => {
    const value = event.target.value
    fetch(`https://api.t.e0a.cc/user/user/hasUsername?loginName=${value}`, {
      method: 'GET'
    })
      .then(res => res.json())
      .then(data => {
        if (!data.data.hasUsername) {
          setMessage(
            'You are not registered,Please click the link at the bottom to register!!'
          )
        } else {
          setMessage('')
        }
      })
  }

  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Image
          src='https://epm.t.e0a.cc/images/login_logo.png'
          alt='logo'
          height={110}
          width={100}
          preview={false}
        />
      </div>
      <div
        style={{
          height: 45,
          display:'flex',
          justifyContent:'center'
        }}
      >
        <span style={{ color: 'red' }}>{message}</span>
      </div>
      <Form
        name='basic'
        layout='vertical'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete='off'
        onFinish={onFinish}
      >
        <Form.Item<FieldType>
          label='Username'
          name='loginName'
          rules={[{ required: true, message: 'Please input your username!' }]}
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          <Input
            style={{ height: 45, width: 400 }}
            onBlur={checkUser}
            onChange={e => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
          style={{ fontSize: 16, fontWeight: 700 }}
        >
          <Input.Password
            style={{ height: 45, width: 400 }}
            onChange={e => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type='default'
            htmlType='submit'
            style={{ height: 45, width: 400, fontWeight: 'bold' }}
          >
            Sign In
          </Button>
        </Form.Item>
        <div className={styles.link}>
          <Link href='https://id.t.e0a.cc/register' style={{ color: '#000' }}>
            Go to the website to register
          </Link>
        </div>
      </Form>
    </div>
  )
}
