import React, { Component } from 'react';
import './App.css';
import PostForm from './PostForm';
import PostList from './PostList';

class App extends Component {

  state = {posts: []}

  fetchAll()
  {
    fetch('/api/notes')
        .then(res => res.json())
        .then(posts => this.setState({ posts }));
  }

  componentDidMount() 
  {
    this.fetchAll();
  }

  handleCreate = (data) => {
    
    console.log("handleCreate() in App.js", data);

    fetch('/api/notes', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status >= 400) 
            {
              throw new Error("Bad response from server");
            }
            console.log("create - response:", response);
            this.fetchAll();
            return response.json();
        }).then((data) => {   
            console.log("create - data:", data);      
        }).catch((err) => {
            console.log(err);
        });
  };

  handleRemove = (id) => {

    console.log("handleRemove() in App.js", id);

    fetch('/api/notes/' + id, {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'}
    }).then((response) => {
          if (response.status >= 400) 
          {
          throw new Error("Bad response from server");
          }
          console.log("delete - response:", response);
          this.fetchAll();
      }).then((data) => {   
          console.log("delete - data:", data);      
      }).catch((err) => {
          console.log(err);
      });
  };

  handleUpdate = (id, data) => {

    console.log("handleUpdate() in App.js", dataObj);

    var dataObj = {...data};

    fetch('/api/notes/' + id, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(dataObj)
    }).then((response) => {
        if (response.status >= 400) 
        {
          throw new Error("Bad response from server");
        }
        console.log("update - response:", response);
        this.fetchAll();
        return response.json();
    }).then((data) => {   
        console.log("update - data:", data);      
    }).catch((err) => {
        console.log(err);
    });
  };

  render() 
  {
    const { posts } = this.state;  
    var divStyle = {'text-align': 'center'}
    return (
      <div>
        <div style={divStyle}>Easy Note</div>
        <br/>
        <PostForm
            onCreate={this.handleCreate}
        />
        <hr />
        <center>
          <h1>Posts</h1>
        </center>
        <PostList
            data={posts}
            onRemove={this.handleRemove}
            onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;