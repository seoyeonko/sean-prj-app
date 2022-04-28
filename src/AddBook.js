import React from 'react';

class AddBook extends React.Component {
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
    this.add = props.add;
  }

  addEventHandler = () => {
    console.log('add btn click!');
    this.add(this.state.item);
    this.setState({
      item: {
        title: '',
        author: '',
        publisher: '',
        userId: '',
      },
    });
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
          placeholder="title"
          value={this.state.item.title}
          onChange={this.onTitleInputChange}
        />
        <input
          type="text"
          placeholder="author"
          value={this.state.item.author}
          onChange={this.onAuthorInputChange}
        />
        <input
          type="text"
          placeholder="publisher"
          value={this.state.item.publisher}
          onChange={this.onPublisherInputChange}
        />
        <input
          type="text"
          placeholder="userId"
          value={this.state.item.userId}
          onChange={this.onUseridInputChange}
        />
        <button onClick={this.addEventHandler}>제품 추가</button>
      </div>
    );
  }
}

export default AddBook;
