# In-Browser Editable Excel Table (React.js)

Demo: https://9899ojyx5o.codesandbox.io/

## Features

- Upload Excel/CSV file (nothing is actually being uploaded; the file is processed by your browser).
- Add/edit/delete rows.
- Add/edit/delete column.
- Edit headers.
- Write custom `validate` functions to validate the content of each cell in a given column.
- Mobile number validation function included. All cells in column `Mobile` are validated using `libphonenumber-js`.
- Set headers as `read-only`, ie. preventing a column to be deleted.

## Stack

- xlsx
- libphonenumber-js
- redux + redux-thunk
