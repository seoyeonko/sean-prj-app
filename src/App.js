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
    // console.log('Component Did Mount!');

    // Get- 전체 조회
    call('/book', 'GET', null).then((response) =>
      this.setState({ items: response.data })
    );

    // const requestOptions = {
    //   method: 'GET',
    //   headers: { 'Content-Type': 'application/json' },
    // };

    // fetch('http://localhost:8080/book', requestOptions)
    //   .then((response) => response.json())
    //   .then((response) => {
    //     console.log(response);
    //     this.setState({
    //       items: response.data,
    //     });
    //   });
  }

  // add: items 배열에 상품 item 추가
  add = (item) => {
    call('/book', 'POST', item).then((response) =>
      this.setState({ items: response.data })
    );

    // const thisItems = this.state.items; // [ {}, {}, {}, ... ]
    // item.id = thisItems.length;
    // thisItems.push(item);
    // this.setState({ items: thisItems }); // [ {}, {}, {}, ... , {new!}]
    // console.log('items: ', this.state.items);
  };

  // delete: items 배열에 title이 일치하는 것 제외하고 다시 저장
  delete = (target) => {
    call('/book', 'DELETE', target).then((response) => {
      console.log(target);
      console.log(response);
      this.setState({ items: response.data });
    });

    // const thisItems = this.state.items;
    // console.log('Before Delete Items:', this.state.items);
    // const newItems = thisItems.filter((item) => item.title !== target.title);
    // this.setState({ items: newItems }, () => {
    //   console.log('After Delete Items:', this.state.items);
    // });
  };

  // read: items 배열에 title이 일치하는 것만 저장
  read = async (target) => {
    // Get - 한 권의 책 조회
    let book;

    await call('/book/read', 'POST', target).then((response) => {
      this.setState({ items: response.data });
      console.log(response.data); // [{}]: 한 권의 책이 나옴
      console.log(response.data[0]); // {}: 한 권의 책이 나옴

      book = {
        title: response.data[0].title,
        author: response.data[0].author,
        publisher: response.data[0].publisher,
        userId: response.data[0].userId,
      };
    });
    console.log(book);

    return book;
    // book={} object 값 할당이 call 함수보다 먼저 실행 (비동기 -> 이거 해결해야 readBook.js 컴포넌트에서 target값을 제대로 리턴받을 듯)
  };

  // update:
  update = (target) => {
    call('/book', 'PUT', target).then((response) => {
      console.log(target);
      console.log(response); // undefined
      // console.log(response.data);
      this.setState({ items: response.data });
    });
    console.log(this.state.items);
  };

  // 부가 기능1 - 전체 상품 조회 버튼
  findAll = () => {
    console.log('click find all btn!');

    this.resetInput();
    call('/book', 'GET', null).then((response) =>
      this.setState({ items: response.data })
    );
  };

  // 부가 기능2 - input 초기화 버튼
  resetInput = () => {
    console.log('click reset input btn!');

    const inputs = document.getElementsByTagName('input');
    console.log(inputs);

    for (let i = 0; i < inputs.length; i++) inputs[i].value = '';
  };

  render() {
    var bookItems =
      this.state.items.length > 0 &&
      this.state.items.map((item, _) => (
        <Book item={item} key={item.id} delete={this.delete} />
      ));

    return (
      <div>
        <button onClick={this.findAll}>전체 상품 조회</button>
        <button onClick={this.resetInput}>입력창 초기화</button>

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
