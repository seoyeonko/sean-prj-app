import React from 'react';
import AddBook from './AddBook';
import DeleteBook from './DeleteBook';
import UpdateBook from './UpdateBook';
import ReadBook from './ReadBook';
import Book from './Book';
import {
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { call, signout } from './service/ApiService';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      loading: true, // state에 담아둔 이유; 값이 변하면 다시 rendering
    };
  }

  componentDidMount() {
    // GET: 전체 책 조회
    call('/book', 'GET', null).then((response) =>
      this.setState({ items: response.data, loading: false })
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
    // 전체 책 조회
    let book;

    await call('/book/read', 'POST', target).then((response) => {
      book = {
        title: response.data[0].title,
        author: response.data[0].author,
        publisher: response.data[0].publisher,
        userId: response.data[0].userId,
      };
    });

    return book;
  };

  readOne = async (target) => {
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

  // 부가 기능1: 전체 상품 조회
  findAll = async () => {
    let allBooks;
    this.resetInput();
    await call('/book', 'GET', null).then((response) => {
      this.setState({ items: response.data });
      allBooks = this.state.items;
    });

    return allBooks;
  };

  // 부가 기능2: input 초기화
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

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static" className="navigation_bar">
        <Toolbar>
          <Grid justify="space-between" container>
            <Grid item>
              <Typography varient="h6" style={{ fontWeight: '700' }}>
                오늘의 할일
              </Typography>
            </Grid>
            <Grid>
              <Button
                color="inherit"
                onClick={signout}
                style={{ fontWeight: '700' }}
              >
                Logout
              </Button>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    );

    // !loading rendering ui
    var bookListPage = (
      <div>
        {navigationBar} {/* navigationBar rendering */}
        <Container maxWidth="md" style={{ marginTop: '4%' }}>
          <button onClick={this.resetInput}>입력창 초기화</button>
          <AddBook add={this.add} />
          <ReadBook read={this.read} />
          <UpdateBook
            readOne={this.readOne}
            update={this.update}
            findAll={this.findAll}
          />
          <DeleteBook delete={this.delete} />

          <h1 style={{ marginTop: '8%' }}>📚 Book List</h1>
          <table border="1">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Author</th>
                <th>Publisher</th>
                <th>UserId</th>
                <th>Delete Btn</th>
              </tr>
            </thead>
            <tbody>{bookItems}</tbody>
          </table>
        </Container>
      </div>
    );

    // loading(true) rendering ui
    var loadingPage = <h1>Loading...</h1>;
    var content = loadingPage;

    if (!this.state.loading) {
      // !laodign(!false) - 로딩중 아니면; todoListPage
      content = bookListPage;
    }

    return <div className="App">{content}</div>;
  }
}

export default App;
