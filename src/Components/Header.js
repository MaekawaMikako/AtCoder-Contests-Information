import React, { useState } from 'react'

const Header = (props) => {
    const [type, setType] = useState('')
    const [keyword, setKeyword] = useState('')
    const [sort, setSort] = useState('newer')

    // 種類
    const typeHandleChange = (filterType) => {
        setType(filterType.target.value)
        const searched = searchFilter(filterType.target.value, keyword)
        const sorted = sortFilter(searched, sort)
        props.setDisplayList(sorted)
        sortFilter(sort)
        console.log('type', filterType.target.value, props.contestsList, props.displayList)
    }

    // 検索
    const keywordChange = (filterWord) => {
        setKeyword(filterWord.target.value)
        const searched = searchFilter(type, filterWord.target.value)
        const sorted = sortFilter(searched, sort)
        props.setDisplayList(sorted)
        console.log('text', filterWord.target.value, props.contestsList, props.displayList)
    }

    // 空白のとこ
    const searchFilter = (filterType, filterWord) => {
        const regWord = new RegExp(`.*${filterWord}.*`)
        const regType = new RegExp(`^(?=.*${filterType}).*$`)
        return (props.contestsList.filter((contest) => {
            // console.log(contest.title, 'text:', regWord.test(`${contest.start}${contest.duration_second}${contest.title}${contest.url}${contest.rate_change}`), 'id:', regType.test(`${contest.id}`))
            return regWord.test(`${contest.start}${contest.duration_second}${contest.title}${contest.url}${contest.rate_change}`) && regType.test(`${contest.id}`)
        }))
        console.log(props.contestsList, props.displayList)
    }

    // 表示件数
    const displayCountHandleChange = (count) => {
        props.setDisplayCount(+count.target.value)
        console.log(props.displayCount, "count")
    }

    // 並び替え   ok
    const sortHandleChange = (filterSort) => {
        setSort(filterSort.target.value)
        const sorted = sortFilter(props.displayList, filterSort.target.value)
        props.setDisplayList(sorted)
        console.log(filterSort.target.value)
    }

    const sortFilter = (searchedList, filterSort) => {
        if (filterSort === 'newer') {
            return (searchedList.slice().sort((a, b) => {
                if (a.start_epoch_second > b.start_epoch_second) {
                    return -1;
                } else {
                    return 1;
                }
            }))
        }
        if (filterSort === 'older') {
            return (searchedList.slice().sort((a, b) => {
                if (a.start_epoch_second < b.start_epoch_second) {
                    return -1;
                } else {
                    return 1;
                }
            }))
        }
        if (filterSort === 'abcSort') {
            return (searchedList.slice().sort((a, b) => {
                if (a.title < b.title) {
                    return -1;
                } else {
                    return 1;
                }
            }))
        }
    }

    return (
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
                    <select onChange={displayCountHandleChange} value={props.displayCount}>
                        <option value='10'>10件表示</option>
                        <option value='50'>50件表示</option>
                        <option value='100'>100件表示</option>
                        <option value={props.displayList.length} >全件表示</option>
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
                            onChange={(text) => { keywordChange(text) }}
                        />
                    </label>
                    <span class="focus_line"></span>
                </div>
            </div>
        </div>
    )
}

export default Header