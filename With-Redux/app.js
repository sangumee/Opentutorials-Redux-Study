 /* If I want to change all the boxes background color When I clicks the button,
  Without Redux I have to add event code in to all functions 
 */

 /* Redux Reducer Function */
 function reducer(state, action){
    if(state === undefined){
        return {color:'yellow'}
    }
    var newState;
    if(action.type === 'CHANGE_COLOR'){
        newState = Object.assign({}, state, {color:action.color});
    }
    console.log(action.type, action, state, newState);
    return newState;
}
var store = Redux.createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()    
);

 function red() {
     let state = store.getState();
     document.querySelector('#red').innerHTML = `
        <div class="container" id="component_red" style="background-color:${state.color}">
            <h1>red</h1>
            <input type="button" value="fire" onclick="
                store.dispatch({type:'CHANGE_COLOR', color:'red'});
            ">
        </div>
    `;
 }
 store.subscribe(red);
 red();

 function blue() {
     let state = store.getState();
     document.querySelector('#blue').innerHTML = `
        <div class="container" id="component_blue" style="background-color:${state.color}">
            <h1>blue</h1>
            <input type="button" value="fire" onclick="
                store.dispatch({type:'CHANGE_COLOR', color:'blue'});
            ">
        </div>
    `;
 }
 store.subscribe(blue);
 blue();

 function green() {
     let state = store.getState();
     document.querySelector('#green').innerHTML = `
        <div class="container" id="component_green" style="background-color:${state.color}">
            <h1>green</h1>
            <input type="button" value="fire" onclick="
                store.dispatch({type:'CHANGE_COLOR', color:'green'});
            ">
        </div>
    `;
 }
 store.subscribe(green);
 green();