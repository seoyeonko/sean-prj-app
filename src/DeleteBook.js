import React from 'react';

class DeleteBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        title: '',
        author: '',
        publisher: '',
        userId: '',
      },
    };
    this.delete = props.delete;
  }

  deleteEventHandler = () => {
    console.log('delete btn click!');
    this.delete(this.state.item);
  };

  onTitleInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;

    this.setState({ item: thisItem });
  };

  render() {
    return (
      <div className="tabContent delete d-none">
        <input
          type="text"
          placeholder="title"
          onChange={this.onTitleInputChange}
        />
        <button onClick={this.deleteEventHandler}>제품 삭제 🗑</button>
      </div>
    );
  }
}

export default DeleteBook;
