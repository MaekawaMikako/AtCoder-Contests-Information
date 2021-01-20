import React from 'react'
import ContestInfomation from '../ContestInfomation'
import './styles.css'

const Main = (props) => {
    // もっと見る   ok
    const onClickShowMore = () => {
        props.setDisplayCount(props.displayCount + 10)
        console.log(props.displayCount, 'more')
    }

    return (
        <div class='main'>
            <div class='title'>
                <h2>Information about the contests</h2>
            </div>

            {props.displayList.map((contest, index) => {
                if (index >= props.displayCount) return null
                return (
                    <ContestInfomation contest={contest} />
                )
            })}

            {props.displayCount < props.displayList.length && (
                <button
                    class='show-more-button'
                    onClick={() => { onClickShowMore() }}
                >
                    もっと見る
                </button>
            )}

            {props.displayCount >= props.displayList.length && (
                <p class='no-more'>これ以上該当ページはありません</p>
            )}

        </div>
    )
}

export default Main