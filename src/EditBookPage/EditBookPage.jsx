import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bookActions } from '../_actions';

class EditBookPage extends React.Component {
    constructor(props) {
        super(props);

        // set existing book info to prepopulate fields
        this.state = {
            book: {
                title: this.props.location.state.detail.title,
                author: this.props.location.state.detail.author,
                ISBN: this.props.location.state.detail.ISBN
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
       

    }

    handleChange(event) {
        const { name, value } = event.target;
        const { book } = this.state;
        this.setState({
            book: {
                id: this.props.match.params.bookId,
                ...book,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { book } = this.state;
        if (book.title && book.author && book.ISBN) {
            this.props.update(book);
        }
    }

    render() {


        const { registering  } = this.props;
        const { book, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>Edit Book</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !book.title ? ' has-error' : '')}>
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" value={book.title} onChange={this.handleChange} />
                        {submitted && !book.title &&
                            <div className="text-danger">Name of book is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !book.author ? ' has-error' : '')}>
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" name="author" value={book.author} onChange={this.handleChange} />
                        {submitted && !book.author &&
                            <div className="text-danger">Author is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !book.ISBN ? ' has-error' : '')}>
                        <label htmlFor="ISBN">ISBN</label>
                        <input type="text" className="form-control" name="ISBN" value={book.ISBN} onChange={this.handleChange} />
                        {submitted && !book.ISBN &&
                            <div className="text-danger">ISBN is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Update</button>
                        {registering && 
                            <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                        }
                        <Link to="/" className="btn btn-link">Cancel</Link>
                        
                    </div>
                </form>
            </div>
        );
    }
}

function mapState(state) {
    const { registering } = state.registration;
    return { registering };
}

const actionCreators = {
    update: bookActions.update
}

const connectedEditBookPage = connect(mapState, actionCreators)(EditBookPage);
export { connectedEditBookPage as EditBookPage };