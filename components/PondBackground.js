import React from 'react';
import styles from '../styles/PondBackground.module.css';

const PondBackground = () => {
  return (
    <div className={styles.landscape}>
      <div className={styles.mountain}></div>
      <div className={`${styles.mountain} ${styles['mountain-2']}`}></div>
      <div className={`${styles.mountain} ${styles['mountain-3']}`}></div>
      <div className={`${styles['sun-container']} ${styles['sun-container-1']}`}>
      </div>
      <div className={styles['sun-container']}>
        <div className={styles.sun}></div>
      </div>
      <div className={styles.cloud}></div>
      <div className={`${styles.cloud} ${styles['cloud-1']}`}></div>
      <div className={`${styles['sun-container']} ${styles['sun-container-reflection']}`}>
        <div className={styles.sun}></div>
      </div>
      <div className={styles.light}></div>
      <div className={`${styles.light} ${styles['light-1']}`}></div>
      <div className={`${styles.light} ${styles['light-2']}`}></div>
      <div className={`${styles.light} ${styles['light-3']}`}></div>
      <div className={`${styles.light} ${styles['light-4']}`}></div>
      <div className={`${styles.light} ${styles['light-5']}`}></div>
      <div className={`${styles.light} ${styles['light-6']}`}></div>
      <div className={`${styles.light} ${styles['light-7']}`}></div>
      <div className={styles.water}></div>
      <div className={styles.splash}></div>
      <div className={`${styles.splash} ${styles['delay-1']}`}></div>
      <div className={`${styles.splash} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-2']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-4']} ${styles['delay-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['delay-3']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-4']}`}></div>
      <div className={`${styles.splash} ${styles['splash-stone']} ${styles['splash-5']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-1']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-2']}`}></div>
      <div className={`${styles.lotus} ${styles['lotus-3']}`}></div>
      <div className={styles.front}>
        <div className={styles.stone}></div>
        <div className={styles.grass}></div>
        <div className={`${styles.grass} ${styles['grass-1']}`}></div>
        <div className={`${styles.grass} ${styles['grass-2']}`}></div>
        <div className={styles.reed}></div>
        <div className={`${styles.reed} ${styles['reed-1']}`}></div>
      </div>
    </div>
  );
};

export default PondBackground;
