import React from 'react';

class UpdateBook extends React.Component {
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
    this.read = props.read;
    this.update = props.update;
  }

  readEventHandler = () => {
    console.log('read btn click!');
    const target = this.read(this.state.item);

    const title_input = document.querySelector('.update_title');
    const author_input = document.querySelector('.update_author');
    const publisher_input = document.querySelector('.update_publisher');
    const userId_input = document.querySelector('.update_userId');

    title_input.value = target[0].title;
    author_input.value = target[0].author;
    publisher_input.value = target[0].publisher;
    userId_input.value = target[0].userId;
  };

  updateEventHandler = (e) => {
    console.log('update btn click!');
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    thisItem.author = e.target.value;
    thisItem.publisher = e.target.value;
    thisItem.userId = e.target.value;
    this.update(this.state.item);
  };

  onTitleInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    // console.log(thisItem);
  };

  onAuthorInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.author = e.target.value;
    this.setState({ item: thisItem });
    // console.log(thisItem);
  };

  onPublisherInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.publisher = e.target.value;
    this.setState({ item: thisItem });
    // console.log(thisItem);
  };

  onUseridInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.userId = e.target.value;
    this.setState({ item: thisItem });
    // console.log(thisItem);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="update_title"
          placeholder="title"
          onChange={this.onTitleInputChange}
        />
        <input
          type="text"
          className="update_author"
          placeholder="author"
          onChange={this.onAuthorInputChange}
        />
        <input
          type="text"
          className="update_publisher"
          placeholder="publisher"
          onChange={this.onPublisherInputChange}
        />
        <input
          type="text"
          className="update_userId"
          placeholder="userId"
          onChange={this.onUseridInputChange}
        />
        <button onClick={this.readEventHandler}>제품 검색</button>
        <button onClick={this.updateEventHandler}>제품 수정</button>
      </div>
    );
  }
}

export default UpdateBook;
