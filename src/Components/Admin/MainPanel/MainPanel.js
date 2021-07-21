//실시간으로 업데이트 되지 않는 오류가 있어서 클래스형 컴포넌트로 정의함(예외)

import React, { Component } from 'react'
import MessageHeader from './MessageHeader';
import Message from './Message';
import MessageForm from './MessageForm';

export class MainPanel extends Component {
    render() {
        return (
            <div style={{ padding: '2rem 2rem 0 2rem' }}>

                <MessageHeader />

                <div style={{
                    width: '100%',
                    height: '450px',
                    border: '.2rem solid #ececec',
                    borderRadius: '4px',
                    padding: '1rem',
                    marginBottom: '1rem',
                    overflowY: 'auto'
                }}>

                </div>

                <MessageForm />

            </div>
        )
    }
}

export default MainPanel
