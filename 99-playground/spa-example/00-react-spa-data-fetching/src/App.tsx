import {Suspense, useState} from 'react'
import {Greeter} from './Greeter.tsx';
import styles from "./App.module.css";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className={styles.wrapper}>
      <h1>React SPA</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <Suspense fallback={<h1>Loading...</h1>}>
        <Greeter/>
      </Suspense>
    </div>
  )
}

export default App
