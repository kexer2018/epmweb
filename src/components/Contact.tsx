import React, { useEffect, useState } from 'react'
import { List } from 'antd'
import styles from './Contact.module.css'

const DataUrl = 'https://registry.npmmirror.com/'
const data = [
  'total packages',
  'total versions',
  'total deletes',
  'downloads today',
  'downloads week',
  'downloads month',
  'downloads last day',
  'downloads last week',
  'downloads last month'
]

export default function Contact () {
  const [value, setValues] = useState<any>(null)

  useEffect(() => {
    fetch(DataUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setValues(data)
      })
  }, [])

  let values: Array<number> = [
    value?.doc_count,
    value?.doc_version_count,
    0,
    value?.download.today,
    value?.download.thisweek,
    value?.download.thismonth,
    value?.download.yesterday,
    value?.download.lastweek,
    value?.download.lastmonth
  ]

  let combine: Array<any> = []
  for (let i = 0; i < data.length; i++) {
    combine.push([data[i], values[i]])
  }
  return (
    <div className= {styles.list}>
      <List
        bordered
        style={{backgroundColor:'#fff'}}
        dataSource={combine}
        renderItem={item => (
          <List.Item>
            <div>{item[0]}</div>
            <div>{item[1]}</div>
          </List.Item>
        )}
      />
    </div>
  )
}
