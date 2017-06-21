import React from 'react'

class GoogleMap extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      startCoords: {},
      endCoords: {}
    }

    this.setGeocode = (tag, results, status) => {
      if(status === 'OK'){
        let coords = {
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        }
        if(tag === 'start'){
          this.setState({ startCoords: coords })
        }
        if(tag === 'end'){
          this.setState({ endCoords: coords })
        }
      }
    }
    this.setStartCoords = this.setGeocode.bind(null, 'start')
    this.setEndCoords = this.setGeocode.bind(null, 'end')

    this.displayRoutes = (results, status) => {
      if(status === 'OK'){
        this.directionDisplay.setDirections(results)
      }
    }
  }

  componentDidMount(){
    const google = window.google
    this.geocoder = new google.maps.Geocoder()

    if(!this.props.endPlace){
      // Display the map of Hong Kong
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 22.3964, lng: 114.1095},
        scrollwheel: false,
        zoom: 11
      })
    }else{
      if(this.props.startPlace){
        this.geocoder.geocode({
          address: this.props.startPlace,
          region: 'hk'
        }, this.setStartCoords)
      }
      this.geocoder.geocode({
        address: this.props.endPlace,
        region: 'hk'
      }, this.setEndCoords)
    }

    if(this.props.startPlace){
      // Set startCoords and endCoords for displaying directions
      this.geocoder.geocode({
        address: this.props.startPlace,
        region: 'hk'
      }, this.setStartCoords)

      this.geocoder.geocode({
        address: this.props.endPlace,
        region: 'hk'
      }, this.setEndCoords)
    }else if(this.props.endPlace){
      this.geocoder.geocode({
        address: this.props.endPlace,
        region: 'hk'
      }, this.setEndCoords)
    }else{
      // Display the map of Hong Kong
      this.map = new google.maps.Map(this.refs.map, {
        center: {lat: 22.3964, lng: 114.1095},
        scrollwheel: false,
        zoom: 11
      })
    }
  }

  shouldComponentUpdate(nextProps, nextState){
    if(this.props !== nextProps){
      return false
    }
    return true
  }

  componentWillUpdate(nextProps, nextState){
    const google = window.google

    // Display a Marker
    if(!this.props.startPlace){
      this.map = new google.maps.Map(this.refs.map, {
        center: nextState.endCoords,
        zoom: 11
      })
      this.marker = new google.maps.Marker({
        map: this.map,
        position: nextState.endCoords,
        animation: google.maps.Animation.DROP
      })
    }else{
      // Display a Direction - at this point, this.state.startCoords has already been set
      if(this.state.endCoords !== nextState.endCoords){
        this.map = new google.maps.Map(this.refs.map, {
          center: this.state.startCoords,
          zoom: 11
        })

        this.directionDisplay = new google.maps.DirectionsRenderer({
          map: this.map
        })

        this.DirectionsService = new google.maps.DirectionsService()

        let request = {
          origin: this.state.startCoords,
          destination: nextState.endCoords,
          travelMode: 'DRIVING'
        }

        this.DirectionsService.route(request, this.displayRoutes)
      }
    }
  }

  render(){
    return (
      <div className='map' ref='map'/>
    )
  }
}

export default GoogleMap
