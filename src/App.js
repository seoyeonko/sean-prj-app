import React from 'react';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';
import ReadBook from './ReadBook';
import Book from './Book';
import { call } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
    };
  }

  componentDidMount() {
    // GET: 전체 책 조회
    call('/book', 'GET', null).then((response) =>
      this.setState({ items: response.data })
    );
  }

  // ADD
  add = (item) => {
    call('/book', 'POST', item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  // DELETE
  delete = (target) => {
    call('/book', 'DELETE', target).then((response) => {
      this.setState({ items: response.data });
    });
  };

  // READ
  read = async (target) => {
    // 한 권의 책 조회
    let book;

    await call('/book/read', 'POST', target).then((response) => {
      this.setState({ items: response.data });

      book = {
        title: response.data[0].title,
        author: response.data[0].author,
        publisher: response.data[0].publisher,
        userId: response.data[0].userId,
      };
    });

    return book;
  };

  // UPDATE
  update = (target) => {
    call('/book', 'PUT', target).then((response) => {
      this.setState({ items: response.data });
    });
  };

  // 부가 기능1: 전체 상품 조회 버튼
  findAll = async () => {
    let allBooks;
    this.resetInput();
    await call('/book', 'GET', null).then((response) => {
      this.setState({ items: response.data });
      allBooks = this.state.items;
    });

    return allBooks;
  };

  // 부가 기능2: input 초기화 버튼
  resetInput = () => {
    const inputs = document.getElementsByTagName('input');
    for (let i = 0; i < inputs.length; i++) inputs[i].value = '';
  };

  render() {
    let bookItems =
      this.state.items.length > 0 &&
      this.state.items.map((item, _) => (
        <Book item={item} key={item.id} delete={this.delete} />
      ));

    return (
      <div>
        <button onClick={this.findAll}>전체 상품 조회</button>
        <button onClick={this.resetInput}>입력창 초기화</button>

        <AddBook add={this.add} />
        <ReadBook read={this.read} />
        <UpdateBook
          read={this.read}
          update={this.update}
          findAll={this.findAll}
        />
        <DeleteBook delete={this.delete} />

        <h1>Book Items Table</h1>
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
