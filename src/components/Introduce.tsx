'use client';
import React from 'react';
import { Typography,Button,Image } from 'antd';
import useRegistry from '@/hooks/useRegistry';
import { useRouter } from 'next/router';
import styles from './Introduce.module.css'

const {  Paragraph} = Typography;

export default function Introduce() {
  const { data } = useRegistry();
  const router  = useRouter();


  return (
    <div className= {styles.content}>
      <div className={styles.left}>
        <Paragraph
          style={{paddingTop :100,fontSize :58}}
        >
          <span style={{fontWeight:'bold',}}>为您团队和您的公司</span>
          <span>带来优质的开源软件包</span>
        </Paragraph>
        <Button 
          type='text'
          size={'large'}
          style={{padding:'10px 24px',borderRadius :60,fontWeight :"bold",background:'#75f4cc',color:'#000',}}
          onClick={()=>{
            router.push(`https://id.edgeros.com/register`)
          }}
        >
          注册体验
        </Button>
        <div style={{fontSize:14,paddingTop:20}}>
          <span style={{fontWeight:'bold'}}>EdgerOS</span>&nbsp;
          <span>Package Manager</span>
        </div>
      </div>
      <div className={styles.right}>
        <Image
            src='	https://epm.edgeros.com/images/epm_GIF.gif'
            alt='gif'
            width={700}
            height={700}
            preview= {false}
        />
      </div>
    </div>
  );
}
