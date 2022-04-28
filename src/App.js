import React from 'react';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';
import ReadBook from './ReadBook';
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

  // read: items 배열에 title이 일치하는 것만 저장
  read = (target) => {
    const thisItems = this.state.items;
    console.log('Before Read Items:', this.state.items);
    const newItems = thisItems.filter((item) => item.title === target.title);
    // console.log(newItems);
    return newItems;
  };

  // update:
  // update = (target) => {
  //   const thisItems = this.state.items;
  //   console.log('Before Read Items:', this.state.items);

  //   const newItems = thisItems.map((item) => console.log(item));

  //   this.setState({ items: newItems }, () => {
  //     console.log('After Read Items:', this.state.items);
  //   });
  // };

  render() {
    var bookItems =
      this.state.items.length > 0 &&
      this.state.items.map((item, _) => (
        <Book item={item} key={item.id} delete={this.delete} />
      ));

    return (
      <div>
        <AddBook add={this.add} />
        <br />
        <DeleteBook delete={this.delete} />
        <br />
        <UpdateBook read={this.read} update={this.update} />
        <br />
        <ReadBook read={this.read} />

        <h4>Book Items Table</h4>
        <table border="1">
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Userid</th>
              <th>삭제버튼</th>
            </tr>
          </thead>
          <tbody>{bookItems}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
