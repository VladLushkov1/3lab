import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from "./components/form"
import Note from "./components/note"
import Header from "./components/header"
import Footer from "./components/footer"
import DrawImage from "./components/drawimage"

class App extends Component {






constructor(props) {
    super(props);

    this.state = {
      header: [],
      foundeditem: undefined,
      image: undefined,
      info: undefined

    };

  }

// state = {
//   header: undefined,
//   note: undefined
// }


findNote= (e) =>{
  e.preventDefault();
  var headtext = e.target.elements.header_find.value;

  for (var index = 0; index < this.state.header.length; index+=3)
  {
    if( this.state.header[index] == headtext)
    {
      this.setState({
          header:   this.state.header,
          foundeditem: index
        });
    }
  }


}

addNote= (e) =>{
  e.preventDefault();
  var headtext = e.target.elements.header_note.value;
  var notetext = e.target.elements.text_note.value;

var Data = new Date();
var Year = Data.getFullYear();
var Month = Data.getMonth();
var Day = Data.getDate();
var Hour = Data.getHours();
var Minutes = Data.getMinutes();
var Seconds = Data.getSeconds();
var fMonth;

// Преобразуем месяца
switch (Month)
{
  case 0: fMonth="января"; break;
  case 1: fMonth="февраля"; break;
  case 2: fMonth="марта"; break;
  case 3: fMonth="апреля"; break;
  case 4: fMonth="мае"; break;
  case 5: fMonth="июня"; break;
  case 6: fMonth="июля"; break;
  case 7: fMonth="августа"; break;
  case 8: fMonth="сентября"; break;
  case 9: fMonth="октября"; break;
  case 10: fMonth="ноября"; break;
  case 11: fMonth="декабря"; break;
}
var cuurenttime = " "+Hour+":"+Minutes+":"+Seconds+"  "+Day+" "+fMonth+" "+Year+" года";


if(notetext == "")
    notetext = "-";

  this.state.header.push(headtext);
  this.state.header.push(notetext);
  this.state.header.push(cuurenttime);


  console.log(this.state.header);
  console.log(this.state.note);


  this.setState({
      header:   this.state.header

    });
}

onClearArray = () => {
    this.setState({ header: [] });
  };

  gettingImageText(e){
    e.preventDefault();
    var log=e.target;
    var info = log.getAttribute("info");
    var tmp=log.getAttribute("image");
    console.log(tmp, e.target);
    this.setState({
        image:   tmp,
        info:  info
      });
  }

  render() {
    return (
      <div className="main">

      <Header source={this.gettingImageText.bind(this)}></Header>
      <DrawImage
      image = {this.state.image}
      info = {this.state.info}
      />


          <Form noteMethod={this.addNote} />

          <button className="deletebutton" onClick={this.onClearArray}>Удалить заметки</button>


            <Note
              headertext = {this.state.header}
            />





  <Footer />
      </div>

    );
  }
}

export default App;
