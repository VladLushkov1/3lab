import React, { Component } from 'react';


class Header extends Component {

  getimage = (e) => {
     var tmp = e.target.getAttribute("image");
    };

  render() {
    return (
      <div id="header">
        <ul onClick={this.props.source}>
          <li className="headli"><a onClick={this.getimage} info="Программа позволяет добавлять заметки, а также удалять их" image="https://www.ibtindia.com/sites/default/files/ONLINE%20TEST%20SERIES_2.png" href="#">О ПРОГРАММЕ</a></li>
          <li className="headli"><a onClick={this.getimage} info="г.Брянск, БГТУ , Лушков Владислав Игоревич" image="https://openclipart.org/image/2400px/svg_to_png/36559/folder-saved-search.png" href="#">КОНТАКТЫ</a></li>

        </ul>


      </div>

    );
  }
}

export default Header;
