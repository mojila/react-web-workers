import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import workerScript from './worker'
import WebWorker from './workerSetup'

function App() {
  const worker = new WebWorker(workerScript)

  const runWorker = (data) => {
    worker.postMessage(data)
  }

  const showTen = () => {
    for (let i = 0; i < 10; i++) {
      runWorker(i)
    }
  }

  useEffect(() => {
    worker.addEventListener('message', (e) => {
      console.log(`from worker: ${e.data}`)
      localStorage.setItem('data', e.data)
    })
  }, [worker])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={showTen}>Run Worker</button>
      </header>
    </div>
  );
}

export default App;
