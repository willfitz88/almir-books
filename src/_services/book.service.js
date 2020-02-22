import config from 'config';
import { authHeader } from '../_helpers';

export const bookService = {
    create,
    getAll,
    getById,
    update,
    delete: _delete
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log("getAll books");
    return fetch(`${config.apiUrl}api/books.php`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/api/books.php?id=${id}`, requestOptions).then(handleResponse);
}

function create(book) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        headers: authHeader(),
        body: JSON.stringify(book)
    };
    console.log(JSON.stringify(book));

    return fetch(`${config.apiUrl}/api/books.php?create`, requestOptions).then(handleResponse);
}

function update(book) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    };

    return fetch(`${config.apiUrl}/books?id=${book.id}`, requestOptions).then(handleResponse);;
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/books?id=${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                //logout();
                //localStorage.removeItem('user');
                //window.location.reload(true);
            }
            
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}