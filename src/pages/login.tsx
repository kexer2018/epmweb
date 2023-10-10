import React, { useState } from 'react'
import { Button, Form, Input } from 'antd'
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

  const onFinish = (values: object) => {
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
        <img src='https://epm.t.e0a.cc/images/login_logo.png' alt='logo' />
      </div>
      <div></div>
      <div>
        <textarea name='meaasge' id='meaasge' value={message}></textarea>
      </div>
      <Form
        name='basic'
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
        >
          <Input onBlur={checkUser} />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Sign In
          </Button>
        </Form.Item>

        <Link href='https://id.t.e0a.cc/register'>
          Go to the website to register
        </Link>
      </Form>
    </div>
  )
}