import React from 'react';

class Book extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item,
    };
    this.delete = props.delete;
  }

  // book item 수정; update값 바로 적용
  componentDidUpdate(prevProp) {
    let updateData = this.props.item;
    let originData = prevProp.item;

    if (updateData.title !== originData.title) {
      this.setState({ item: this.props.item });
    }
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
