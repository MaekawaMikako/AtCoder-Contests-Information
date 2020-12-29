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

  // 情報取得
  const getInformation = async () => {
    try {
      const result = await axios.get(
        `${'https://kenkoooo.com/atcoder/resources/contests.json'}`
      )
      setContestsList(result.data)
      setDisplayList(result.data)
      console.log(displayList)
    } catch (error) {
      // リクエストに失敗した時の処理
      console.log('error!!')
    }
  }
  useEffect(() =>{ 
    getInformation()
  }, [])

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
  }

  // 検索
  const keywordChange = (e) => {
    setKeyword(e.target.value)
    searchFilter(e)
  }
  const searchFilter = (e) => {
    return setDisplayList(displayList.filter((contest) => {
      // return contest.id.includes(e.target.value)
      // return contest.start_epoch_second.includes(keyword)
      // return contest.duration_second.includes(keyword)
      // return contest.title.includes(keyword)
      // if(contest.id.includes(keyword) || contest.start_epoch_second.includes(keyword) ||contest.duration_second.includes(keyword) || contest.title.includes(keyword)) return true
      // if(contest.id.includes(e.target.value) !== -1 ) return true
      // else if(contest.start_epoch_second.includes(e.target.value) !== -1) return true
      // else if(contest.duration_second.includes(e.target.value) !== -1) return true
      // else if(contest.title.includes(e.target.value) !== -1 ) return true
    }))
  }

  // 表示件数
  const displayCountHandleChange = (e) => {
    setDisplayCount(e.target.value)
  }

  // 並び替え
  const sortHandleChange = (e) => {
    setSort(e.target.value)
    sortFilter(e)
  }
  const sortFilter = (e) => {
    if(e.target.value === 'newer'){
      setDisplayList(displayList.sort ((a, b) => {
        if (a.start_epoch_second > b.start_epoch_second) {
            return -1;
        } else {
            return 1;
        }
      }))
    }if(e.target.value === 'older'){
      setDisplayList(displayList.sort ((a, b) => {
        if (a.start_epoch_second < b.start_epoch_second) {
            return -1;
        } else {
            return 1;
        }
      }))
    }if(e.target.value === 'abcSort'){
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
            value = {keyword}
            onChange = {(e) => {keywordChange(e)}} 
          />
        </div>
          
        <h2>Information about the contests</h2>

        <select　onChange={displayCountHandleChange} value={displayCount}>
          <option value='10'>10件表示</option>
          <option value='50'>50件表示</option>
          <option value='100'>100件表示</option>
        </select>
        <select onChange={sortHandleChange} value={sort}>
          <option value='newer'>新しい順</option>
          <option value='older'>古い順</option>
          <option value='abcSort'>五十音順</option>
        </select>

        { displayList.map((contest, index) => {
          if(index >= displayCount) return null
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