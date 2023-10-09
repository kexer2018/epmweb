import Link from "next/link";

export default function Footer() {
  return (
    <footer
      style={{
        textAlign: 'center',
        fontSize: 14,
        color: 'rgb(102, 102, 102)',
        paddingBottom: 16,
      }}
    >
      <span>Copyright 2021 &copy; ACOINFO.All Rights Reserved.</span>
      <Link
        href='https://beian.miit.gov.cn/'
        target='_blank'
        style={{
          color: '#2db7f5',
          textDecoration: 'none',
          outline: 'none',
        }}
      >
        京ICP备20010248号-5 
      </Link>
      <span> | </span>
      <Link
        href='https://www.edgeros.com/'
        target='_blank'
        style={{
          color: '#2db7f5',
          textDecoration: 'none',
          outline: 'none',
        }}
      >
        Website
      </Link>
    </footer>
  );
}
