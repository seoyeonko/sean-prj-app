import React from 'react';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import Book from './Book';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 0,
          title: '제목1',
          author: '자까1',
          publisher: '덕성1',
          userId: 'seoyeon',
        },
        {
          id: 1,
          title: '제목2',
          author: '자까2',
          publisher: '덕성2',
          userId: 'seoyeon',
        },
        {
          id: 2,
          title: '제목3',
          author: '자까3',
          publisher: '덕성3',
          userId: 'seoyeon',
        },
      ],
    };
  }

  // add: items 배열에 상품 item 추가
  add = (item) => {
    const thisItems = this.state.items; // [ {}, {}, {}, ... ]
    item.id = thisItems.length;
    thisItems.push(item);
    this.setState({ items: thisItems }); // [ {}, {}, {}, ... , {new!}]
    console.log('items: ', this.state.items);
  };

  // delete: items 배열에 title이 일치하는 것 제외하고 다시 저장
  delete = (target) => {
    const thisItems = this.state.items;
    console.log('Before Delete Items:', this.state.items);
    const newItems = thisItems.filter((item) => item.title !== target.title);
    this.setState({ items: newItems }, () => {
      console.log('After Delete Items:', this.state.items);
    });
  };

  render() {
    var bookItems =
      this.state.items.length > 0 &&
      this.state.items.map((item, idx) => <Book item={item} key={item.id} />);

    return (
      <div>
        <AddBook add={this.add} />
        <br />
        <DeleteBook delete={this.delete} />

        <h4>Book Items Table</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Userid</th>
            </tr>
          </thead>
          <tbody>{bookItems}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
