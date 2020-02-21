import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bookActions  } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        this.props.getBooks();
        
    }

    handleDeleteBook(id) {
        return (e) => this.props.deleteBook(id);
    }

    render() {
        const { user, books } = this.props;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hi {user.firstname}!</h1>
                <p>You're logged in with React!!</p>
                <h3>All books:</h3>
                {books.loading && <em>Loading books...</em>}
                {books.error && <span className="text-danger">ERROR: {books.error}</span>}
                {books.items &&
                    <ul>
                        {books.items.map((book, index) =>
                            <li key={book.id}>
                                {book.id}
                                {
                                    book.deleting ? <em> - Deleting...</em>
                                    : book.deleteError ? <span className="text-danger"> - ERROR: {book.deleteError}</span>
                                    : <span> - <a onClick={this.handleDeleteBook(book.id)}>Delete</a></span>
                                }
                            </li>
                        )}
                    </ul>
                }
                <p>
                    <Link to="/login">Logout</Link>
                </p>
            </div>
        );
    }
}


function mapState(state) {
    console.log(state);
    const { books, authentication } = state;
    const { user } = authentication; // state.authentication.user
    return { user, books };
}

const actionCreators = {
    getBooks: bookActions.getAll,
    deleteBook: bookActions.delete
}

const connectedHomePage = connect(mapState, actionCreators)(HomePage);
export { connectedHomePage as HomePage };