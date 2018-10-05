import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';
const API_KEY = 'xxxxxx';
const ROOT_URL = 'https://www.googleapis.com/youtube/v3/search';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('s');
  }

  mySearch(params, callback) {
    axios.get(ROOT_URL, { params: params })
      .then(function(response) {
        if (callback) { callback(response.data.items); }
      })
      .catch(function(error) {
        console.error(error);
      });
  };

  videoSearch(term) {
    var params = {
      key: API_KEY,
      part: 'snippet',
      q: term,
      type: 'video',
      maxResults: 7,
      channelId: 'UCwRXb5dUK4cvsHbx-rGzSgw',
    };

    this.mySearch(params, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }
  // Darwin UCkPjHTuNd_ycm__29dXM3Nw
  // Derek Banas UCwRXb5dUK4cvsHbx-rGzSgw

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 500);

    return (
      <div>
        <SearchBar onSearchTermChange = {videoSearch}/>
        <VideoDetail video = {this.state.selectedVideo} />
        <VideoList
          onVideoSelect = { selectedVideo => this.setState({selectedVideo}) }
          videos = {this.state.videos} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'));
