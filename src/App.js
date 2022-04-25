import React from 'react';
import AddBook from './AddBook';
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

  render() {
    var bookItems =
      this.state.items.length > 0 &&
      this.state.items.map((item, idx) => <Book item={item} key={item.id} />);

    return (
      <div>
        <AddBook />

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
