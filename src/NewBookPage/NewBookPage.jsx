import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { bookActions } from '../_actions';

class NewBookPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            book: {
                title: '',
                author: '',
                IBAN: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { book } = this.state;
        this.setState({
            book: {
                ...book,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { book } = this.state;
        if (book.title && book.author && book.IBAN) {
            this.props.create(book);
        }
    }

    render() {
        const { registering  } = this.props;
        const { book, submitted } = this.state;
        return (
            <div className="col-md-6 col-md-offset-3">
                <h2>New Book</h2>
                <form name="form" onSubmit={this.handleSubmit}>
                    <div className={'form-group' + (submitted && !book.title ? ' has-error' : '')}>
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" name="title" value={book.title} onChange={this.handleChange} />
                        {submitted && !book.title &&
                            <div className="help-block">Name of book is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !book.author ? ' has-error' : '')}>
                        <label htmlFor="author">Author</label>
                        <input type="text" className="form-control" name="author" value={book.author} onChange={this.handleChange} />
                        {submitted && !book.author &&
                            <div className="help-block">Author is required</div>
                        }
                    </div>
                    <div className={'form-group' + (submitted && !book.IBAN ? ' has-error' : '')}>
                        <label htmlFor="IBAN">IBAN</label>
                        <input type="text" className="form-control" name="IBAN" value={book.IBAN} onChange={this.handleChange} />
                        {submitted && !book.IBAN &&
                            <div className="help-block">IBAN is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">Add Book</button>
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
    create: bookActions.create
}

const connectedNewBookPage = connect(mapState, actionCreators)(NewBookPage);
export { connectedNewBookPage as NewBookPage };