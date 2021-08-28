import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import PavingSlabs from './app/PavingSlabs';
import reportWebVitals from './reportWebVitals';

import Spinner from './component/Spinner';

function Application() {
    return (
            <Suspense fallback={(<Spinner open={true} />)}>
                <PavingSlabs />
            </Suspense>
    );
}

ReactDOM.render(<Application />, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
