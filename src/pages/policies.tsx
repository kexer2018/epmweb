import React from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import styles from './policies.module.css'
import { useTheme } from '@/hooks/useTheme'
import { ThemeMode, ThemeProvider as _ThemeProvider } from 'antd-style'

const ThemeProvider = _ThemeProvider as any

export default function Policies () {
  const [themeMode, setThemeMode] = useTheme()
  return (
    <ThemeProvider themeMode={themeMode as ThemeMode}>
      <div className={styles.container}>
        <Header themeMode={themeMode} setThemeMode={setThemeMode} />
        <div className={styles.yue}>
          <p>
            EPM is here to support EdgerOS developers who wish to share their
            works with the community. As open as it is, anyone is welcomed to
            share his/her code by following below terms and policies.
          </p>
          <h2>Code of Conduct</h2>
          <ul>
            <li>Be respectful.</li>
            <li>We are here to help.</li>
            <li>Abusive behavior is never tolerated.</li>
            <li>
              Data published to epm is hosted at the discretion of the service
              administrators, and may be removed.
            </li>
            <li>
              Violations of this code may result in swift and permanent
              expulsion from the EdgerOS community.
            </li>
          </ul>
          <h2>Policies &amp; Terms</h2>
          <ul>
            <li>
              <a href='https://epm.edgeros.com/policies/privacy'>
                Privacy Policy (TBD)
              </a>{' '}
              limits use and sharing of information about you collected by epm
              Services.
            </li>
            <li>
              <a href='https://epm.edgeros.com/policies/copyright'>
                Copyright (TBD)
              </a>{' '}
              includes how to report violations thereof.
            </li>
            <li>
              <a href='https://epm.edgeros.com/policies/disputes'>
                Dispute Policy (TBD)
              </a>{' '}
              addresses how to resolve disputes over the control of a package
              name, user name, or organization name in the Public Registry.
            </li>
          </ul>
          <h2>Receiving Report</h2>
          <p>
            If you think your package has been mistakenly accused of violation,
            please contact us via email:{' '}
            <a href='mailto:epm@edgeros.com'>epm@edgeros.com</a>. We had do our
            best to assure the report being addressed appropriately, with a
            approach to build a healthier and prosperous community.
          </p>
          <h2>Contact US</h2>
          <p>
            If any, please submit violation report or any other issue via{' '}
            <a href='https://epm.edgeros.com/support'>
              https://epm.edgeros.com/support
            </a>
            . We had love to hear from you!
          </p>
          <h2>行为准则</h2>
          <ul>
            <li>尊重他人。</li>
            <li>我们是来帮忙的。</li>
            <li>滥用行为是绝对不能容忍的。</li>
            <li>发布在npm上的数据由服务管理员酌情托管，并可能被删除。</li>
            <li>违反本守则的行为可能会导致迅速和永久地被驱逐出npm社区。</li>
          </ul>
          <h2>政策和条款</h2>
          <ul>
            <li>
              <a href='https://epm.edgeros.com/policies/privacy'>
                隐私政策（待更新）
              </a>{' '}
              描述 EPM 收集和使用用户数据相关约定。
            </li>
            <li>
              <a href='https://epm.edgeros.com/policies/copyright'>
                版权（待更新）
              </a>{' '}
              描述 EPM 的版权政策以及违反相关政策的处理策略。
            </li>
            <li>
              <a href='https://epm.edgeros.com/policies/disputes'>
                争议解决（待更新）
              </a>{' '}
              描述如何解决包名、用户名冲突问题。
            </li>
          </ul>
          <h2>违规处理</h2>
          <ul>
            <li>
              我们希望 EPM
              社区的是一个、友好、安全、开放的环境。任何包含、煽动、引诱、不健康的行为都是不受欢迎的，也不会被容忍。请在发布包时确保您的模块，安全，健康。
            </li>
            <li>
              如果社区成员发布的模块有违规范时，EPM
              管理员有权采取他们认为适当的任何行动，包括在没有告知的情况下删除模块或将违规成员永久驱逐出社区。
            </li>
          </ul>
          <h2>申诉</h2>
          <p>
            如果您认为自己的模块被错误的指控为违反规范的模块时，请您及时联系我们(Email
            : <a href='mailto:epm@edgeros.com'>epm@edgeros.com</a>
            )，我们将近最大努力确保您的申诉得到妥善的处理。
            我们会选择我们认为有利于社区友好安全的处理方案。
          </p>
          <h2>联系方式</h2>
          <p>
            如果您需要报告违规模块，请在
            <a href='https://epm.edgeros.com/support'>
              (https://epm.edgeros.com/support)
            </a>{' '}
            对我们进行反馈。我们会及时进行确认及处理。
          </p>
        </div>
        <Footer />
      </div>
    </ThemeProvider>
  )
}
