
import React, { useEffect, useState, Fragment } from 'react'
import Mock from 'mockjs'

function request (url, params) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(Mock.mock({
                [`list|1-${params.num}`]: [{
                    'name': '@cname',
                }]
            }).list.map(x => x.name));
        }, 2000);
    });
}

const useRequest = (url, params) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        request(url, params).then(data => {
            setData(data);
        });
    }, []);
    function reload () {
        setData(null);
        request(url, params).then(data => {
            setData(data);
        });
    }
    return [data, reload];
};

export default () => {
    const [data, reload] = useRequest('xxx', {
        num: 210
    });
    if (data === null) {
        return <div>loading...</div>;
    }
    return (
        <Fragment>
            <ul>{data.map((item, index) => <li key={index}>{item}</li>)}</ul>
            <br/>
            <button onClick={reload}>刷新</button>
        </Fragment>
    );
}
