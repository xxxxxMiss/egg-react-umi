import React from 'react'
import { connect } from 'umi'
import videoIcon from '@/assets/imgs/icon_video.svg'
// import { ReactComponent as IconVideo } from '@/assets/icon_video.svg'
import styles from './index.less'
import classNames from 'classnames/bind'
const cx = classNames.bind(styles)

const User = () => {
  return (
    <div className={cx('page-user')}>
      <span className="user-logo"></span>
      <span className={cx('user-logo')}></span>
      <img src={videoIcon} alt="" />
      <img src={require('@/assets/imgs/icon_audio.svg')} alt="" />
      {/* <IconVideo width={90} /> */}
      <h2>this is user page</h2>
    </div>
  )
}

export default connect()(User)
