import React, { Component } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './components/video_list'
import VideoDetail from './components/video_detail'

import SearchBar from './components/search_bar';

const API_KEY = 'AIzaSyBCh_OQ5RmE5kqAfsirICVco1CU1nudI2w'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      videos: [],
      selectedVideo: null
    };

    this.videoSearch('Bourdain');
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        selectedVideo: videos[0]
      });
    });
  }

  render() {
    const videoSearch = _.debounce(term => { this.videoSearch(term) }, 9000) // the function passed can only be called every 300 ms.

    return (
      <div>
        <SearchBar onSearchTermChange={videoSearch} />
        <VideoDetail video={this.state.selectedVideo}/>
        <VideoList
          videos={this.state.videos}
          onVideoSelect={(selectedVideo) => this.setState({selectedVideo})}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.querySelector('.container'))

