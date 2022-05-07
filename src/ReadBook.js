import React from 'react';

class ReadBook extends React.Component {
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
  }

  readEventHandler = () => {
    console.log('read btn click!');
    console.log(this.state.item);
    const target = this.read(this.state.item);
    console.log(target);

    const title_input = document.querySelector('.read_title');
    const author_input = document.querySelector('.read_author');
    const publisher_input = document.querySelector('.read_publisher');
    const userId_input = document.querySelector('.read_userId');
    const promise1 = Promise.resolve(target);

    // primise 객체의 값에 하나씩 접근
    promise1.then((val) => {
      console.log(val);

      title_input.value = val.title;
      author_input.value = val.author;
      publisher_input.value = val.publisher;
      userId_input.value = val.userId;
    });
  };

  onTitleInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    // console.log(thisItem);
  };

  render() {
    return (
      <div>
        <input
          type="text"
          className="read_title"
          placeholder="title"
          onChange={this.onTitleInputChange}
        />
        <input
          type="text"
          className="read_author"
          placeholder="author"
          disabled
        />
        <input
          type="text"
          className="read_publisher"
          placeholder="publisher"
          disabled
        />
        <input
          type="text"
          className="read_userId"
          placeholder="userId"
          disabled
        />
        <button onClick={this.readEventHandler}>제품 검색</button>
      </div>
    );
  }
}

export default ReadBook;
