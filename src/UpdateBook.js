import React from 'react';

class UpdateBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: {
        id: '',
        title: '',
        author: '',
        publisher: '',
        userId: '',
      },
    };
    this.read = props.read;
    this.update = props.update;
    this.findAll = props.findAll;
  }

  readEventHandler = () => {
    console.log('read btn click!');
    const target = this.read(this.state.item);
    const title_input = document.querySelector('.update_title');
    const author_input = document.querySelector('.update_author');
    const publisher_input = document.querySelector('.update_publisher');
    const userId_input = document.querySelector('.update_userId');
    const promise1 = Promise.resolve(target); // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

    // promise 객체의 값에 하나씩 접근
    promise1.then((val) => {
      title_input.value = val.title;
      author_input.value = val.author;
      publisher_input.value = val.publisher;
      userId_input.value = val.userId;
    });
  };

  updateEventHandler = async () => {
    console.log('update btn click!');
    const thisItem = this.state.item;
    const title_input = document.querySelector('.update_title');
    const author_input = document.querySelector('.update_author');
    const publisher_input = document.querySelector('.update_publisher');
    const userId_input = document.querySelector('.update_userId');

    thisItem.title = title_input.value;
    thisItem.author = author_input.value;
    thisItem.publisher = publisher_input.value;
    thisItem.userId = userId_input.value;
    // console.log(thisItem);

    let findAll = this.findAll();
    const promise1 = Promise.resolve(findAll); // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

    // primise 객체의 값에 하나씩 접근
    await promise1.then((val) => {
      // console.log('HERE: ', val);
      let updateTargetId = val[0].id;
      thisItem.id = updateTargetId;
    });
    // console.log('thisItem: ', thisItem);
    this.update(thisItem);
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
