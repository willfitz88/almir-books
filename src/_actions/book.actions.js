import { bookConstants } from '../_constants';
import { bookService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const bookActions = {
    create,
    getAll,
    delete: _delete
};


function create(book) {
    return dispatch => {
        dispatch(request(book));

        bookService.register(book)
            .then(
                book => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Book Added!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(book) { return { type: bookConstants.REGISTER_REQUEST, book } }
    function success(book) { return { type: bookConstants.REGISTER_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        bookService.getAll()
            .then(
                books => dispatch(success(books)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: bookConstants.GETALL_REQUEST } }
    function success(books) { return { type: bookConstants.GETALL_SUCCESS, books } }
    function failure(error) { return { type: bookConstants.GETALL_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        bookService.delete(id)
            .then(
                book => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: bookConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: bookConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: bookConstants.DELETE_FAILURE, id, error } }
}