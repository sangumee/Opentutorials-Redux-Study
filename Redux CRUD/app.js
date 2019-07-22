function subject() {
    document.querySelector('#subject').innerHTML = `
    <header>
        <h1>WEB</h1>
        Hello, WEB!
    </header>
`
}

function TOC() {
    let state = store.getState();
    let liTags = '';
    for (let i = 0; i < state.contents.length; i++) {
        liTags = liTags + `
        <li>
            <a onclick="
                event.preventDefault();
                let action = {type:'SELECT', id:${state.contents[i].id}}
                store.dispatch(action);" 
                href="${state.contents[i].id}">
                ${state.contents[i].title}
            </a>
        </li>`
    }
    document.querySelector('#toc').innerHTML = `
    <nav>
        <ol>
            ${liTags}
        </ol>
    </nav>`
}

function control() {
    document.querySelector('#control').innerHTML = `
    <ul>
        <li><a onclick="
            event.preventDefault();
            store.dispatch({
                type:'CHANGE_MODE',
                mode:'create'
            })
        "
        href="/create">create</a></li>
        <li><input onclick="
            store.dispatch({
                type:'DELETE'
            })
        "
        type="button" value="delete"></li>
    </ul>`
}

function article() {
    let state = store.getState();
    if (state.mode === 'create') {
        document.querySelector('#content').innerHTML = `
        <article>
            <form onsubmit="
                event.preventDefault();
                let _title = this.title.value;
                let _desc = this.desc.value;
                store.dispatch({
                    type:'CREATE',
                    title: _title,
                    desc: _desc
                })
            ">
                <p>
                    <input type="text" name="title" placeholder="title" />
                </p>
                <p>
                    <textarea name="desc" paceholder="description"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
        </article>
        `
    } else if (state.mode === 'read') {
        let aTitle, aDesc;
        for (let i = 0; i < state.contents.length; i++) {
            if (state.contents[i].id === state.selected_id) {
                aTitle = state.contents[i].title;
                aDesc = state.contents[i].desc;
            }
        }
        document.querySelector('#content').innerHTML = `
        <article>
            <h2>${aTitle}</h2>
            ${aDesc}
        </article>
        `
    } else if (state.mode === 'welcome') {
        document.querySelector('#content').innerHTML = `
        <article>
            <h2>Welcome</h2>
            Hello Redux!!
        </article>
        `
    }
}

function reducer(state, action) {

    if (state === undefined) {
        return {
            max_id: 3,
            mode: 'welcome',
            selected_id: 2,
            contents: [{
                    id: 1,
                    title: 'HTML',
                    desc: 'HTML is Awesome'
                },
                {
                    id: 2,
                    title: 'CSS',
                    desc: 'CSS is for Design'
                },
                {
                    id: 3,
                    title: 'JavaScript',
                    desc: 'JavaScript is for some Actions'
                }
            ]
        }
    }
    let newState;
    if (action.type === 'SELECT') {
        newState = Object.assign({}, state, {
            selected_id: action.id,
            mode: 'read'
        });
    } else if (action.type === 'CREATE') {
        let newMaxId = state.max_id + 1;
        let newContents = state.contents.concat();
        newContents.push({
            id: newMaxId,
            title: action.title,
            desc: action.desc
        })
        newState = Object.assign({}, state, {
            max_id: newMaxId,
            contents: newContents,
            mode: 'read'
        })
    } else if (action.type === 'DELETE') {
        let newContents = [];
        for (let i = 0; i < state.contents.length; i++) {
            if (state.selected_id !== state.contents[i].id) {
                newContents.push(
                    state.contents[i]
                );
            }
        }
        newState = Object.assign({}, state, {
            contents: newContents,
            mode: 'welcome'
        })
    } else if (action.type === 'CHANGE_MODE') {
        newState = Object.assign({}, state, {
            mode: action.mode
        })
    }
    console.log(action, state, newState);
    return newState;
}
const store = Redux.createStore(reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
store.subscribe(article);
store.subscribe(TOC);
subject();
TOC();
control();
article();