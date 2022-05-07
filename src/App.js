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
      readItem: [
        {
          id: '',
          title: '',
          author: '',
          publisher: '',
          userId: '',
        },
      ],
    };
  }

  componentDidMount() {
    console.log('Component Did Mount!');

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

    let book; // 1)
    // var that;
    await call('/book/read', 'POST', target).then((response) => {
      // this.setState({ items: response.data });

      // that = response.data[0];
      // console.log('that', that);

      this.setState({ items: response.data });
      console.log(response.data); // 한 권의 책이 나옴
      console.log(response.data[0]); // 한 권의 책이 나옴

      // 1)
      book = {
        title: response.data[0].title,
        author: response.data[0].author,
        publisher: response.data[0].publisher,
        userId: response.data[0].userId,
      };
    });
    // 1)
    console.log(book);
    return book;
    // 93번 라인이 74번의 call 함수보다 먼저 실행 (비동기 -> 이거 해결해야 readBook.js 컴포넌트에서 target값ㅇㄹ 제대로 리턴받을 듯)

    // 2)
    // return this.state.items;

    // return that;

    // const thisItems = this.state.items;
    // console.log('Before Read Items:', this.state.items);
    // const newItems = thisItems.filter((item) => item.title === target.title);
    // // console.log(newItems);
    // return newItems;
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
