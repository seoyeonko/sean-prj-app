import React from 'react';

class AddBook extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onButtonClick = () => {
    console.log('add');
  };

  render() {
    return (
      <div>
        <input type="text" placeholder="title" />
        <input type="text" placeholder="author" />
        <input type="text" placeholder="publisher" />
        <input type="text" placeholder="userId" />
        <button onClick={this.onButtonClick}>제품 추가</button>
      </div>
    );
  }
}

export default AddBook;
