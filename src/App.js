import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import moment from 'moment'

const App = () => {
  const [contestsList, setContestsList] = useState([])
  const [displayList, setDisplayList] = useState([])
  const [type, setType] = useState('all')
  const [keyword, setKeyword] = useState('')
  const [displayCount, setDisplayCount] = useState(10)
  const [sort, setSort] = useState('newer')

  useEffect(() => {
    getInformation()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      console.log(displayCount, "first")
      console.log("a")
    } catch (error) {
      // リクエストに失敗した時の処理
      console.log('error!!')
    }
  }

  // 日本時間、コンテスト時間　ok 
  const objectChange = (list) => {
    return list.map(contest => {
      contest.start = moment.unix(contest.start_epoch_second).format("YYYY-MM-DD HH:mm")
      contest.duration_second = contest.duration_second / 60 + 'min'// => 試験時間(分)
      contest.url = `https://atcoder.jp/contests/${contest.id}`
      return contest
    })
  }

  // もっと見る   ok
  const onClickShowMore = () => {
    setDisplayCount(displayCount => displayCount + 10)
    console.log(displayCount, "more")
  }

  // 種類  ok
  const typeHandleChange = (e) => {
    setType(e.target.value)
    if (displayList.length === contestsList.length) {
      setDisplayList(contestsList.filter((contest) => {
        return contest.id.indexOf(e.target.value) !== -1
      }))
    } else {
      setDisplayList(contestsList.filter((contest) => {
        return (contest.id.indexOf(e.target.value) !== -1
          && (contest.id.toLowerCase().indexOf(keyword) >= 0
            || contest.start.toString().indexOf(keyword) >= 0
            || contest.duration_second.toString().indexOf(keyword) >= 0
            || contest.title.toLowerCase().indexOf(keyword) >= 0
          ))
      }))
    }
    console.log(e.target.value, sort)
    sortFilter(sort)
  }

  // 検索    ok
  const keywordChange = (e) => {
    setKeyword(e.target.value)
    searchFilter(e.target.value)
  }

  const searchFilter = (e) => {
    // filter()で絞り込み、絞り込んだ配列をline変数に格納
    const line = contestsList.filter((contest) => (
      // キーワードが含まれていればtrueを返す
      (contest.id.toLowerCase().indexOf(e) >= 0
        || contest.start.toString().indexOf(e) >= 0
        || contest.duration_second.toString().indexOf(e) >= 0
        || contest.title.toLowerCase().indexOf(e) >= 0)
      && contest.id.indexOf(type) !== -1
    ))
    setDisplayList(line)
    console.log(e)
  }

  // 表示件数  ok
  const displayCountHandleChange = (e) => {
    setDisplayCount(+e.target.value)
    console.log(displayCount, "change")
  }

  // 並び替え   ok
  const sortHandleChange = (e) => {
    setSort(e.target.value)
    sortFilter(e.target.value)
    console.log(e.target.value)
  }

  const sortFilter = (e) => {
    if (e === 'newer') {
      setDisplayList(displayList => displayList.sort((a, b) => {
        if (a.start_epoch_second > b.start_epoch_second) {
          return -1;
        } else {
          return 1;
        }
      }))
    }

    if (e === 'older') {
      setDisplayList(displayList => displayList.sort((a, b) => {
        if (a.start_epoch_second < b.start_epoch_second) {
          return -1;
        } else {
          return 1;
        }
      }))
    }

    if (e === 'abcSort') {
      setDisplayList(displayList => displayList.sort((a, b) => {
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
        <h1 className='header-logo'>Atcoder Contests Information</h1>

        <div className="formats">
          <div className='format select'>
            <select onChange={typeHandleChange} value={type}>
              <option value=''>ALL</option>
              <option value='abc'>ABC</option>
              <option value='arc'>ARC</option>
              <option value='agc'>AGC</option>
              <option value='past'>PAST</option>
              <option value='joi'>JOI</option>
              <option value='jag'>JAG</option>
            </select>
          </div>
          <div className='format select'>
            <select onChange={displayCountHandleChange} value={displayCount}>
              <option value='10'>10件表示</option>
              <option value='50'>50件表示</option>
              <option value='100'>100件表示</option>
              <option value={displayList.length} >全件表示</option>
            </select>
          </div>
          <div className='format select'>
            <select onChange={sortHandleChange} value={sort} className="sortSelect">
              <option value='newer'>新しい順</option>
              <option value='older'>古い順</option>
              <option value='abcSort'>五十音順</option>
            </select>
          </div>
          <div className='format'>
            <label class="format-focus">
              <input
                className='text-format'
                type='text'
                value={keyword}
                placeholder='Keyword'
                onChange={(e) => { keywordChange(e) }}
              />
            </label>
            <span class="focus_line"></span>
          </div>
        </div>
      </div>

      <div className='main'>
        <div className='title'>
          <h2>Information about the contests</h2>
        </div>

        {displayList.map((contest, index) => {
          if (index >= displayCount) return null
          return (
            <div className="contests-table">
              <h3><a href={contest.url} className='contest-title' target="_blank" rel="noopener noreferrer">{contest.title}</a></h3>
              <table>
                <tbody>
                  <tr>
                    <th>Start Time</th>
                    <td>{contest.start}</td>
                  </tr>
                  <tr>
                    <th>Duration</th>
                    <td>{contest.duration_second}</td>
                  </tr>
                  <tr>
                    <th>Rated Range</th>
                    <td>{contest.rate_change}</td>
                  </tr>
                  <tr>
                    <th>URL</th>
                    <td><a href={contest.url} target="_blank" rel="noopener noreferrer">{contest.url}</a></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })}

        {displayCount < displayList.length && (
          <button
            className='show-more-button'
            onClick={() => { onClickShowMore() }}
          >
            More...
          </button>
        )}

        {displayCount >= displayList.length && (
          <p className='no-more'>No more</p>
        )}

      </div>

    </div>

  )
}

export default App