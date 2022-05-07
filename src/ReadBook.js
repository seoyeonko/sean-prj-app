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
      // readItem: props.readItem,
    };
    this.read = props.read;
  }

  // componentDidUpdate(prevProps, prevState) {
  //   console.log('Component Did Update!');
  //   console.log(prevProps);
  //   console.log(prevState);
  //   console.log(this.state);
  //   console.log(this.props);

  //   // if (this.state.readItem.title !== prevProps.readItem.title) {
  //   // Get- 전체 조회
  //   call('/book', 'GET', null).then(
  //     (response) => this.setState({ readItem: response.data })
  //     // console.log('hi')
  //   );
  //   // }
  //   console.log(this.state.readItem);
  // }

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

    // title_input.value = title;
    // author_input.value = author;
    // publisher_input.value = publisher;
    // userId_input.value = userId;

    // target 배열에서 this.state.item.title 과 동일한 것을 추출
    // title_input.value = target.title;
    // author_input.value = target.author;
    // publisher_input.value = target.publisher;
    // userId_input.value = target.userId;

    // const test = target.filter((item) => item.title === target.title);
    // console.log(test);
    // title_input.value = test.title;
    // author_input.value = test.author;
    // publisher_input.value = test.publisher;
    // userId_input.value = test.userId;
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
