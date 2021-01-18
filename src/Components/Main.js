import React from 'react'

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
                    <div class='contests-table'>
                        <h3><a href={contest.url} class='contest-title' target='_blank' rel='noopener noreferrer'>{contest.title}</a></h3>
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
                                    <td><a href={contest.url} target='_blank' rel='noopener noreferrer'>{contest.url}</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )
            })}

            {props.displayCount < props.displayList.length && (
                <button
                    class='show-more-button'
                    onClick={() => { onClickShowMore() }}
                >
                    More...
                </button>
            )}

            {props.displayCount >= props.displayList.length && (
                <p class='no-more'>No more</p>
            )}

        </div>
    )
}

export default Main