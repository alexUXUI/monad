/**
 * What is a monad?:
 *  - Way of encapsulating data
 *  - Way of specifying the rules of retrieving and working with the data
 *  - A lot like a functor but needs to implement the following:
 *    - Of: Insert a value into monad. EX: monad.of('a value') it is a way of bringing data into the container
 *    - Bind: function, this makes it chainable
 *    - Join: Will flatten the layers and layers of wrappers
 *    - Constructor: Creates a Monadic Type
 */

class Monad {
  constructor(value) {
    this.value = value
  }

  static of(x) {
    return new Monad(x);
  }

  join () {
    /**
     * if there is no wrapper around the inner value, then we have flatten the wrappers
     */
    if(!(this.value instanceof Monad)) {
      return this;
    }

    /**
     * else, recursilvely call this function if this.value has a wrapper
     */
    return this.value.join();
  }

  bindToMonad(mapFunc) {
    return Monad.of(mapFunc(this.value));
  }
}

var doubleWrapped = Monad.of(Monad.of('yo')); // Monad { value : Monad { value: 'yo'} }

console.log(doubleWrapped.join()); // Monad { value: 'yo' }

const upper = string => string.toUpperCase();

var text = Monad.of('Some text');

console.log(text.bindToMonad(upper)); // A WORD

