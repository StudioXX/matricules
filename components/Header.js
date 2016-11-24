import React from 'react';
import css from 'next/css';
import Link from 'next/link';

const styles = {
  menu: css({
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '50px',
  }),
  menuitem: css({
    padding: '5px 25px 5px 5px',
  }),
};



export default () => <div className={styles.menu}>
  <span className={styles.menuitem}><Link href="/">studio xx matricules app</Link></span>
  <span className={styles.menuitem}><Link href="/documents">documents list</Link></span>
  <span className={styles.menuitem}><Link href="/about">about</Link></span>
</div>;
