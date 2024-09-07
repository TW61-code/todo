import React from 'react';

function Form({onHandleSubmit, setState, value}) {
    return (
        <form onSubmit={onHandleSubmit}>
            <input type="text" value={value} onChange={(e) => setState(e.target.value)} />
            <button>Submit</button>
        </form>
    );
}

export default Form;