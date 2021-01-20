import React, { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/index.js'
import Main from './Components/Main/index.js'
import axios from 'axios'
import moment from 'moment'

const App = () => {
  const [contestsList, setContestsList] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [displayCount, setDisplayCount] = useState(10)

  // 情報取得  ok
  const getInformation = async () => {
    try {
      const result = await axios.get(
        `${'https://kenkoooo.com/atcoder/resources/contests.json'}`
      )
      result.data.sort((a, b) => {
        if (a.start_epoch_second > b.start_epoch_second) {
          return -1;
        } else {
          return 1;
        }
      })
      objectChange(result.data)
      setContestsList(result.data)
      setDisplayList(result.data)
      console.log(displayCount, 'first')
    } catch (error) {
      // リクエストに失敗した時の処理
      console.log('error!!')
    }
  }

  // 日本時間、コンテスト時間　ok 
  const objectChange = (list) => {
    return list.map(contest => {
      contest.start = moment.unix(contest.start_epoch_second).format('YYYY-MM-DD HH:mm')
      contest.duration_second = contest.duration_second / 60 + '分'// => 試験時間(分)
      contest.url = `https://atcoder.jp/contests/${contest.id}`
      return contest
    })
  }

  useEffect(() => {
    getInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div class='App'>
      <Header contestsList={contestsList} setContestsList={setContestsList} displayList={displayList} setDisplayList={setDisplayList} displayCount={displayCount} setDisplayCount={setDisplayCount} />
      <Main contestsList={contestsList} setContestsList={setContestsList} displayList={displayList} setDisplayList={setDisplayList} displayCount={displayCount} setDisplayCount={setDisplayCount} />
    </div>

  )
}

export default App