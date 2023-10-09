import React from 'react'
import { Button, Form, Input } from 'antd'
import styles from './login.module.css'
import Link from 'next/link'

type FieldType = {
  username?: string
  password?: string
}



export default function Login () {
  return (
    <div className={styles.main}>
      <div className={styles.logo}> 
        <img src="https://epm.t.e0a.cc/images/login_logo.png" alt="logo" />
      </div>
      <Form
        name='basic'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        autoComplete='off'
      >
        <Form.Item<FieldType>
          label='Username'
          name='username'
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type='primary'
            htmlType='submit'
            onClick={() => {
              alert('click')
            }}
          >
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
