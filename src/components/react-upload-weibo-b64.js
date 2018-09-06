import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import noop from 'noop';
import objectAssign from 'object-assign';
import ReactUpload from 'react-upload';
import NxFileUpload from 'next-file-upload';
import NxWeiboToPics from 'next-weibo-to-pics';


const WEIBO_API = '/weibo_api/interface/pic_upload.php?data=base64';
const WEIBO_IMG = 'https://ws2.sinaimg.cn';
const WaterMARK_IMG = require('../logo.png');

// Refused to set unsafe header "Cookie"
// DO NOT USE xhr.setHeader to set cookie

export default class extends Component {
  /*===properties start===*/
  static propTypes = {
    className: PropTypes.string,
    onChange: PropTypes.func,
    watermark: PropTypes.string,
    token: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array
    ]),
  };

  static defaultProps = {
    onChange: noop,
    token: []
  };
  /*===properties end===*/

  initialToken() {
    const { token } = this.props;
    let subCookie = token;
    if (typeof token !== 'string') {
      subCookie = token.find(item => {
        return item.indexOf('SUB=') > -1;
      });
    }
    document.cookie = subCookie.split(';')[0];
  }

  base64Data(inData) {
    return inData.split('base64,')[1];
  }

  _onChange = inEvent => {
    const { onChange } = this.props;
    const { value, dataURLs } = inEvent.target;
    const request = {};
    //SET COOKIE BEFORE:
    this.initialToken();
    // request[`b64_data`] = this.base64Data(dataURLs[0]);
    const apis = dataURLs.map(dataURL => {
      return NxFileUpload(WEIBO_API, {
        b64_data: dataURL
      });
    });
    return Promise.all(apis).then(response=>{

    })

    // NxFileUpload(WEIBO_API, request).then(response => {
    //   const _response = JSON.parse(response.split('\n')[2]);
    //   const data = _response.data;
    //   if (data.count > 0) {
    //     const pics = NxWeiboToPics(data.pics);
    //     const value = pics.map(item => {
    //       item.type = item.pid.charAt(21) === 'g' ? 'gif' : 'jpg';
    //       item.url = `${WEIBO_IMG}/large/${item.pid}.${item.type}`;
    //       return item;
    //     });
    //     onChange({ target: { value } });
    //   } else {
    //     console.error('[UPLOAD FAILED]:', response, _response);
    //   }
    // });
  };

  render() {
    const { token, onChange, ...props } = this.props;
    return (
      <ReactUpload onChange={this._onChange} {...props} />
    );
  }
}
