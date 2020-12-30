import React, {useState, useEffect} from 'react'
import './App.css'
import axios from 'axios'

const App = () => {
  const [contestsList, setContestsList] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [type, setType] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [displayCount, setDisplayCount] = useState(10)
  const [sort, setSort] = useState('newer')

  useEffect(() =>{ 
    getInformation()
  }, [])

  // 情報取得
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
      const changedObject = objectChange(result.data)
      setContestsList(changedObject)
      setDisplayList(changedObject)
    } catch (error) {
      // リクエストに失敗した時の処理
      console.log('error!!')
    }
  }

  const objectChange = (e) => {
    return e.map((time) => {
      time.start = new Date(time.start_epoch_second * 1000).toString() // => Wed Sep 04 2019 12:03:35 GMT+0900 (日本標準時)
      time.finish = new Date((time.start_epoch_second + time.contest.duration_second) * 1000).toString()
      time.duration_second /= 60 // => 試験時間(分)
      time.url = 'https://atcoder.jp/contests/' + e.id
      console.log(time.start_epoch_second, time.duration_second)
    })
  }

  // もっと見る
  const onClickShowMore = () => {
    setDisplayCount(displayCount + 10)
  }

  // 種類
  const typeHandleChange = (e) => {
    setType(e.target.value)
    setDisplayList(contestsList.filter((contest) => {
      if(contest.id.indexOf(e.target.value) !== -1) return true
    }))
    console.log(e.target.value, sort)
  }


  // 検索    ok
  const keywordChange = (e) => {
    setKeyword(e.target.value)
    searchFilter(e)
  }
  const searchFilter = (e) => {
    // filter()で絞り込み、絞り込んだ配列をline変数に格納
    const line = contestsList.filter((contest) => (
      // キーワードが含まれていればtrueを返す
      contest.id.toLowerCase().indexOf(e.target.value) >= 0
      || contest.start_epoch_second.toString().indexOf(e.target.value) >= 0
      || contest.duration_second.toString().indexOf(e.target.value) >= 0
      || contest.title.toLowerCase().indexOf(e.target.value) >= 0
    ));
    setDisplayList(line)
    console.log(e.target.value)
  }

  
  // 表示件数
  const displayCountHandleChange = (e) => {
    setDisplayCount(e.target.value)
  }

  // 並び替え
  const sortHandleChange = (e) => {
    setSort(e.target.value)
    sortFilter(e.target.value)
    console.log(e.target.value)
  }
  const sortFilter = (e) => {
    if (e === 'newer') {
      setDisplayList(displayList.sort ((a, b) => {
        if (a.start_epoch_second > b.start_epoch_second) {
            return -1;
        } else {
            return 1;
        }
      }))
    }if (e === 'older') {
      setDisplayList(displayList.sort ((a, b) => {
        if (a.start_epoch_second < b.start_epoch_second) {
            return -1;
        } else {
            return 1;
        }
      }))
    }if (e === 'abcSort') {
      setDisplayList(displayList.sort ((a, b) => {
        if (a.title < b.title) {
            return -1;
        } else {
            return 1;
        }
      }))
    }
  }

  return (
    <div className="App">

      <div className='header'>
        <h1>Atcoder Contests Information</h1>
      </div>

      <div className='main'>

        <div id="format">
          <select　onChange={typeHandleChange} value={type}>
            <option value=''>ALL</option>
            <option value='abc'>ABC</option>
            <option value='arc'>ARC</option>
            <option value='agc'>AGC</option>
            <option value='past'>PAST</option>
            <option value='joi'>JOI</option>
            <option value='jag'>JAG</option>
          </select>
          <input
            type='text'
            value = {keyword}
            onChange= {(e) => {keywordChange(e)}} 
          />
        </div>
          
        <h2>Information about the contests</h2>

        <select　onChange={displayCountHandleChange} value={displayCount}>
          <option value='10'>10件表示</option>
          <option value='50'>50件表示</option>
          <option value='100'>100件表示</option>
          <option value= {displayList} >全件表示</option>
        </select>
        <select onChange={sortHandleChange} value={sort}>
          <option value='newer'>新しい順</option>
          <option value='older'>古い順</option>
          <option value='abcSort'>五十音順</option>
        </select>

        { displayList.map((contest, index) => {
          if (index >= displayCount) return null
          return (
            <div>
              {contest.id}
              {contest.start_epoch_second}
              {contest.duration_second}
              {contest.title}
            </div>
          )
        })}

        { displayCount < displayList.length && (
          <button
            className = 'showMoreButton'
            onClick = {() => {onClickShowMore()}}
          >
            もっと見る
          </button>
        )}

      </div>

    </div>

  )
}

export default App