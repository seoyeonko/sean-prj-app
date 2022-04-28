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

  onButtonClick = () => {
    console.log('delete btn click!');
    // this.delete(this.state.item.title);
    this.delete('a');
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

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="title"
          onChange={this.onTitleInputChange}
        />
        <button onClick={this.onButtonClick}>제품 삭제</button>
      </div>
    );
  }
}

export default DeleteBook;
