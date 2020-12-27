import React from 'react'
import './App.css'

function App() {

  return (
    <div className="App">

      <div className='header'>
        <h1>Atcoder Contests Information</h1>
      </div>

      <div className='main'>

        <div id="format">
            <button onClick>ALL</button>
            <input type="search" name="search" value=""/>
        </div>
          
        <h2>Information about the contests</h2>

        <div id="contests">
            <button onClick>10件表示</button>
            <button onClick>新着順</button>
        </div>

        <div id="view">
            <button onClick>もっと見る</button>
        </div>

      </div>

    </div>
  );
}

export default App