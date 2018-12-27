import React, { Component } from 'react';


class Form extends Component {
  render() {
    return (
      <div>

        <form onSubmit={this.props.noteMethod}>
          <input type="text" name="header_note" placeholder="Напиши заголовок заметки!!"/>
          <input type="text" name="text_note" placeholder="Напиши заметку!"/>
          <button>Добавить заметку !</button>
        </form>

      </div>

    );
  }
}

export default Form;
