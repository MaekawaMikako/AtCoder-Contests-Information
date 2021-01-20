import React from 'react'
import './styles.css'

const ContestInfomation = (props) => {
    return (
        <div>
            <div class='contests-table'>
                <h3><a href={props.contest.url} class='contest-title' target='_blank' rel='noopener noreferrer'>{props.contest.title}</a></h3>
                <table>
                    <tbody>
                        <tr>
                            <th>開始時刻</th>
                            <td>{props.contest.start}</td>
                        </tr>
                        <tr>
                            <th>コンテスト時間</th>
                            <td>{props.contest.duration_second}</td>
                        </tr>
                        <tr>
                            <th>レーティング変化</th>
                            <td>{props.contest.rate_change}</td>
                        </tr>
                        <tr>
                            <th>コンテストページ</th>
                            <td><a href={props.contest.url} target='_blank' rel='noopener noreferrer'>{props.contest.url}</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ContestInfomation