import { bookConstants } from '../_constants';
import { bookService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const bookActions = {
    create,
    update,
    getById,
    getAll,
    delete: _delete
};


function create(book) {
    return dispatch => {
        dispatch(request(book));

        bookService.create(book)
            .then(
                book => { 
                    dispatch(success());
                   // history.push('/login');
                    dispatch(alertActions.success('Book Added!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(book) { return { type: bookConstants.CREATE_REQUEST, book } }
    function success(book) { return { type: bookConstants.CREATE_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.CREATE_FAILURE, error } }
}

function update(book) {
    return dispatch => {
        dispatch(request(book));

        bookService.update(book)
            .then(
                book => { 
                    dispatch(success());
                   // history.push('/login');
                    dispatch(alertActions.success('Book Updated!'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(book) { return { type: bookConstants.UPDATE_REQUEST, book } }
    function success(book) { return { type: bookConstants.UPDATE_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.UPDATE_FAILURE, error } }
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


function getById($id) {
    return dispatch => {
        dispatch(request());

        bookService.getById($id)
            .then(
                book => dispatch(success(book)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: bookConstants.GETONE_REQUEST } }
    function success(book) { return { type: bookConstants.GETONE_SUCCESS, book } }
    function failure(error) { return { type: bookConstants.GETONE_FAILURE, error } }
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