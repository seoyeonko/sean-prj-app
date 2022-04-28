import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
    this.delete = props.delete;
  }

  deleteEventHandler = () => {
    console.log('delete btn click!');
    this.delete(this.state.item);
  };

  render() {
    const item = this.state.item;

    return (
      <tr>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.author}</td>
        <td>{item.publisher}</td>
        <td>{item.userId}</td>
        <td>
          <button onClick={this.deleteEventHandler}>delete</button>
        </td>
      </tr>
    );
  }
}

export default Book;
