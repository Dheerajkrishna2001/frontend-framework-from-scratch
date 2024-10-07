export class Dispatcher {
  #subs = new Map();
  #afterCommandHandlers = [];

  subscribe(commandName, handler) {
   if(!this.#subs.has(commandName)){
    this.#subs.set(commandName, []);
   }

   const handlers = this.#subs.get(commandName);
   if(handlers.has(handler)){
    return ()=>{}
   }

   handlers.push(handler);

   return ()=>{
    handlers.splice(handlers.indexOf(handler), 1);
   }
  }

  afterCommand(handler) {
    this.#afterCommandHandlers.push(handler);

    return ()=>{
      this.#afterCommandHandlers.splice(this.#afterCommandHandlers.indexOf(handler), 1);
    }
  }

  dispatch(commandName, payload) {
    const handlers = this.#subs.get(commandName);
    if (handlers) {
      handlers.forEach(handler => handler(payload));
    }
    else {
        console.warn(`No handlers for command: ${commandName}`);
    }

    this.#afterCommandHandlers.forEach(handler => handler(payload));
  }
}
