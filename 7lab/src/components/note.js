import React, { Component } from 'react';
import Write from "./writetext"




class Note extends Component {



  render() {
    return (



<div>
<div className="note">
    <ul>


    {this.props.headertext.map(item => (
        <li>{item}</li>
    ))}

    </ul>





  </div>

</div>



  )
  }
}

export default Note;
