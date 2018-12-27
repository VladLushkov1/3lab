import React, { Component } from 'react';


class DrawImage extends Component {
  render() {
    return (
      <div >

<img src={this.props.image}></img>
<div id="information">{this.props.info}</div>






      </div>

    );
  }
}

export default DrawImage;
