import styles from './Spinner.module.css';

export function Spinner({size = 30} : {size?: number}) {
  return (
    <div className={styles.spinner} style={{
      width: size,
      height: size,
    }}/>
  );
}
