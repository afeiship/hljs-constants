import './dev.scss';
import ReactUploadWeiboB64 from './main';
import tokenJson from './token.json';

/*===example start===*/

// install: npm install afeiship/react-upload-weibo-b64 --save
// import : import ReactUploadWeiboB64 from 'react-upload-weibo'

class App extends React.Component{
  state = {
    token: tokenJson.token
  };

  constructor(props){
    super(props);
    window.demo = this;
    window.refs = this.refs;
    window.rc = this.refs.rc;
  }

  _onChange = e=>{
    console.log(e.target.value)
  };

  render(){
    return (
      <div className="hello-react-upload-weibo">
        <ReactUploadWeiboB64 token={this.state.token} onChange={this._onChange} ref='rc' />
      </div>
    );
  }
}
/*===example end===*/

ReactDOM.render(
    <App />,
    document.getElementById('app')
);
