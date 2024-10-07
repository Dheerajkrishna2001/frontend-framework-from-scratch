import { mountDOM } from "./mount-dom.js";
import { destroyDOM } from "./destroy-dom.js";
import { Dispatcher } from "./dispatcher.js";

export function createApp({state,view, reducers ={}}) {
    parentEl = null;
    vdom = null;
   
    function renderApp(){
        destroyDOM();
        vdom = view(state);
        mountDOM(vdom, parentEl);
    }

    const dispatcher = new Dispatcher();
    
    const subscriptions = [dispatcher.afterCommand(renderApp)];

   for(const actionName in reducers){
    const reducer = reducers[actionName];
    subscriptions.push(dispatcher.subscribe(actionName, (payload)=>{
        state = reducer(state, payload);
    }));
   }

   return {
    mount(parentEl){
        app.parentEl = parentEl;
        renderApp();
    },
    unmount(){
        destroyDOM(vdom);
        subscriptions.forEach(unsubscribe => unsubscribe());
    }
   }
   
}
