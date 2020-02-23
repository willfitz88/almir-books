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
            <div>
            <div className="row justify-content-between">
                <div className="col-12 mb-4">
                    <h1>Hi {user.firstname}!</h1>
                    <p>You're logged in to Almir Books :) <Link to="/login">Logout</Link></p>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    
                    <h3>All books:</h3>
                    {books.loading &&
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    }
                    {books.error && <span className="text-danger">ERROR: {books.error}</span>}
                    {books.items &&
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                <th scope="col">#</th>
                                <th scope="col">Title</th>
                                <th scope="col">Author</th>
                                <th scope="col">ISBN</th>
                                <th scope="col"><Link to="/add-book" className="btn btn-sm btn-primary float-right">Add Book</Link></th>
                                </tr>
                            </thead>
                            <tbody>
                                {books.items.map((book, index) =>
                                    <tr key={book.ID}>
                                        <th scope="row">{book.ID}</th>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>{book.ISBN}</td>
                                        <td className="text-right">
                                        {<a data-toggle="dropdown" className="btn btn-sm btn-light" aria-haspopup="true" aria-expanded="false"><i className="fas fa-ellipsis-h"></i></a>}
                                        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                            <Link className="dropdown-item" 
                                                  to={{
                                                    pathname: '/edit-book',
                                                    state: { detail: book }
                                                    }}> Edit </Link>
                                            {
                                                book.deleting ? <em> - Deleting...</em>
                                                : book.deleteError ? <span className="text-danger"> - ERROR: {book.deleteError}</span>
                                                : <a className="dropdown-item" onClick={this.handleDeleteBook(book.ID)}>Delete</a>
                                            }
                                        </div>
                                            
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
                    
                </div>
            </div>
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