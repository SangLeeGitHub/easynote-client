import React, { Component } from 'react';

export default class PostForm extends Component {
    
    state = {
        title: '',
        content: ''
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    };
    
    handleSubmit = (e) => {
        // 페이지 리로딩 방지
        e.preventDefault();
        
        // 빈입력 방지
        if (this.state.title === '' || this.state.content === '')
        {
            alert("빈입력은 허용되지 않습니다.");
            return;
        }
        
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);

        // 상태 초기화
        this.setState({
            title: '',
            content: ''
        })
    };

    render() {
        var formStyle = {'text-align': 'center'}
        return (
            <form onSubmit={this.handleSubmit} style={formStyle}>
                <div>
                    <input
                        type="text"
                        placeholder="제목"
                        value={this.state.title}
                        onChange={this.handleChange}
                        name="title"
                    />
                </div>
                <br/>
                <div>
                    <textarea                    
                        placeholder="노트 내용"
                        value={this.state.content}
                        onChange={this.handleChange}
                        name="content" 
                        rows="15" cols="75">
                    </textarea>
                </div>
                <div>
                    <button type="submit">등록</button>
                </div>
            </form>
        );
    } 
}