import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postAccountCreate } from '../../../partners/rest';

import './Create.scss';

function Card() {
    const navigate = useNavigate();
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordCheck, setPasswordCheck] = useState<string>("");
    const [warnMsg, setWarnMsg] = useState<string>("");
    const [errorMsg, setErrorMsg] = useState<string>("");

    useEffect(() => {
        if (warnMsg) {
            setTimeout(() => setWarnMsg(""), 4000);
        }
    }, [warnMsg]);
    useEffect(() => {
        if (errorMsg) {
            setTimeout(() => setErrorMsg(""), 4000);
        }
    }, [errorMsg]);

    function triggerCreate() {
        if (!(name && password && passwordCheck)) {
            setWarnMsg("Empty field(s)");
            return;
        }

        if (password != passwordCheck) {
            setWarnMsg("Differents passwords");
            return;
        }

        postAccountCreate(name, password)
        .then((data) => {
            if (data.success == "already exist") {
                setErrorMsg("Username already used");
                return;
            }
            navigate('/user/login');
        })
        .catch(error => {
            setErrorMsg("Internal error");
            console.log("Error:", error);
        });
    }

    return (
        <div className='card'>
            <div className='input_group'>
                <label>Username</label>
                <br/>
                <input type='text' onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className='input_group'>
                <label>Password</label>
                <br/>
                <input type='password'  onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className='input_group'>
                <label>Password check</label>
                <br/>
                <input type='password'  onChange={(event) => setPasswordCheck(event.target.value)}/>
            </div>
            <div className='button' onClick={triggerCreate}>Create</div>
            { warnMsg && <div className='warning'>{warnMsg}</div> }
            { errorMsg && <div className='error'>{errorMsg}</div> }
        </div>
    );
}

export function Create() {
    return (
        <section id="create">
            <h1>Create account</h1>
            <Card/>
        </section>
    );
}
