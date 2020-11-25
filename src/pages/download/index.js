import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';
import 'antd/dist/antd.css';
import { } from 'antd';

import SideBar from '../sidebar';
const download = (url, device = 'android') => {
  window.open(url);
  //日志埋点
  window.sls.pushLog({
    level: 'INFO',
    message: `Downloading Yingli Broadcasting Class for ${(
      device || ''
    ).toUpperCase()}`,
  });
};
const downloadDesk = (key, e) => {
  let downloadUrl = '';
  let deskTopbaseUrl = 'https://yingliboke.oss-cn-shenzhen.aliyuncs.com/app/';
  let rxdeskbaseUrl = 'https://yingliboke.oss-cn-shenzhen.aliyuncs.com/rxdeskapp/'
  if (key === 'win') {
    // win讲师端
    downloadUrl = deskTopbaseUrl + '英荔播课%20讲师端%20Setup%203.4.3.exe';
  } else if (key === 'mac') {
    // mac讲师端
    downloadUrl = deskTopbaseUrl + 'www英荔播课 讲师端-3.4.3.dmg';
  } else if (key === 'win_audience') {
    // win观众端
    downloadUrl = rxdeskbaseUrl + '英荔播课%20观众端%20Setup%203.4.3.exe'
  } else if (key === 'mac_audience') {
    // mac观众端
    downloadUrl = rxdeskbaseUrl + 'www英荔播课 观众端-3.4.3.dmg'
  }
  // 日志埋点
  window.sls.pushLog({
    level: 'INFO',
    message: `Downloading Yingli Broadcasting Class for ${key.toUpperCase()}`,
  });
  // 创建a标签，触发点击
  const a = document.createElement('a');
  a.href = downloadUrl;
  a.setAttribute('download', '');
  document.body.appendChild(a); // 兼容firefox，firefox不能下载跨域资源
  a.click();
  document.body.removeChild(a);
};

function Download() {
  /**
   * 设置下载资源的配置
   */
  const Android = {
    url:
      'https://yingliboke.oss-cn-shenzhen.aliyuncs.com/android/www%E8%8B%B1%E8%8D%94%E6%92%AD%E8%AF%BE3.4.0_340_jiagu_sign.apk',
    qr_code: useBaseUrl('img/android_download.png'),
    cover: useBaseUrl('img/Android.png'),
  };

  const Ios = {
    url:
      'https://apps.apple.com/cn/app/%E8%8B%B1%E8%8D%94%E6%92%AD%E8%AF%BE/id1467718115',
    qr_code: useBaseUrl('img/ios_down.png'),
    cover: useBaseUrl('img/iphone.png'),
  };

  return (
    <Layout
      title={`下载`}
      description="Description will go into a meta tag in <head />">
      <div className={styles.download}>
        <div className={styles.downloadHeader}>
          <h4>立即下载</h4>
          <small>享受流畅、灵活、高效的直播培训体验</small>
        </div>
        <div className={styles.downloadContainer}>
          <div className={styles.audience}>
            <h5>观众端</h5>
            <div className={styles.downList}>
              <div className={styles.downItem}>
                <div className={styles.downCode}>
                  <div
                    className={styles.downIcon}
                    onClick={() => download(Android.url)}>
                    <img src={Android.qr_code} alt="下载" />
                  </div>
                  <small onClick={() => download(Android.url)}>
                    点击或扫描下载
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={Android.cover} alt="Android" />
                  </div>
                  <small>Android</small>
                </div>
              </div>

              <div className={styles.downItem}>
                <div className={styles.downCode}>
                  <div
                    className={styles.downIcon}
                    onClick={() =>
                      download(
                        'https://apps.apple.com/cn/app/%E8%8B%B1%E8%8D%94%E6%92%AD%E8%AF%BE/id1467718115',
                        'ios',
                      )
                    }>
                    <img src={useBaseUrl('img/ios_down.png')} alt="下载" />
                  </div>
                  <small
                    onClick={() =>
                      download(
                        'https://apps.apple.com/cn/app/%E8%8B%B1%E8%8D%94%E6%92%AD%E8%AF%BE/id1467718115',
                        'ios',
                      )
                    }>
                    点击或扫描下载
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={useBaseUrl('img/iphone.png')} alt="iOS" />
                  </div>
                  <small>iOS</small>
                </div>
              </div>

              <div className={styles.downItem}>
                <div
                  className={styles.downCode}
                  onClick={() => downloadDesk('mac_audience')}>
                  <div className={styles.downIcon}>
                    <img
                      src={useBaseUrl('img/客户端.png')}
                      alt="客户端"
                      className={styles.exe_down_img}
                    />
                  </div>
                  <small onClick={() => downloadDesk('mac_audience')}>
                    点击下载客户端
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={useBaseUrl('img/macOS.png')} alt="macOS" />
                  </div>
                  <small>macOS</small>
                </div>
              </div>

              <div className={styles.downItem}>
                <div className={styles.downCode}>
                  <div
                    className={styles.downIcon}
                    onClick={() => downloadDesk('win_audience')}>
                    <img
                      src={useBaseUrl('img/客户端.png')}
                      alt="客户端"
                      className={styles.exe_down_img}
                    />
                  </div>
                  <small onClick={() => downloadDesk('win_audience')}>
                    点击下载客户端
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={useBaseUrl('img/Windows.png')} alt="Windows" />
                  </div>
                  <small>Windows</small>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.teacher}>
            <h5>讲师端</h5>
            <div className={styles.downList}>
              {/* <div className={styles.downItem}></div> */}

              <div className={styles.downItem}>
                <div
                  className={styles.downCode}
                  onClick={() => downloadDesk('mac')}>
                  <div className={styles.downIcon}>
                    <img src={useBaseUrl('img/客户端.png')} alt="客户端" />
                  </div>
                  <small onClick={() => downloadDesk('mac')}>
                    点击下载开播工具
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={useBaseUrl('img/macOS.png')} alt="macOS" />
                  </div>
                  <small>macOS</small>
                </div>
              </div>

              <div className={styles.downItem}>
                <div className={styles.downCode}>
                  <div
                    className={styles.downIcon}
                    onClick={() => downloadDesk('win')}>
                    <img src={useBaseUrl('img/客户端.png')} alt="客户端" />
                  </div>
                  <small onClick={() => downloadDesk('win')}>
                    点击下载开播工具
                  </small>
                </div>
                <div className={styles.iconContain}>
                  <div className={styles.icon}>
                    <img src={useBaseUrl('img/Windows.png')} alt="Windows" />
                  </div>
                  <small>Windows</small>
                </div>
              </div>

              {/* <div className={styles.downItem}></div> */}
            </div>
          </div>
        </div>
      </div>
      <SideBar />
    </Layout>
  );
}

export default Download;
