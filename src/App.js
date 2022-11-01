import React, { Component } from 'react'; //引入 react定義好的 components
import GoogleMapReact from 'google-map-react'
import { API_KEY } from './api_key'

const AnyReactComponent = ({ text }) => <div>{text}</div>;

//Map
//用 SimpleMap繼承 component類別，要用 render()去搜集畫面裡要渲染的內容
class SimpleMap extends Component { 

  // 用 defaultProps預設 SimpleMap component的預設值
  static defaultProps = {
    center: {
      lat: 25.04,
      lng: 121.50
    },
    zoom: 17
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>

        {/* GoogleMapReact是地圖本身， AnyReactComponent是自己位置的Marker*/}
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />

        </GoogleMapReact>
      </div>
    );
  }
}

// App
function App() {
  return (
    <div className="App">
      <SimpleMap/>
    </div>
  )
}

export default App;
