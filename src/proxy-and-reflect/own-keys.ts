/**
 * Iteration with “ownKeys” and “getOwnPropertyDescriptor”
 */

let user = {
    name: "John",
    age: 30,
    _password: "***"
  };

  user = new Proxy(user , {
    ownKeys(target){
        return Object.keys(target).filter( key => key[0]!== "_")
    }
  })

  for(let key in user) console.log(key); // name, then: age

  let user2 = {};

  user2 = new Proxy(user2, {
    ownKeys(target) {
        return ["a","b", "c"]
    }
  })

  for(let key in user2) console.log(key); // empty


  let user3 = {}

  user3 = new Proxy(user3, {
    ownKeys(target) {
        return ["a","b", "c"]
    },
    getOwnPropertyDescriptor(target,prop){
        return {
            enumerable:true,
            configurable: true
        }
    }
  })

  for(let key in user3) console.log(key); // empty




/**
 * Protected properties with “deleteProperty” and other traps
    There’s a widespread convention that properties and methods prefixed by an underscore _ are internal. They shouldn’t be accessed from outside the object.

    Technically that’s possible though:

    let user = {
    name: "John",
    _password: "secret"
    };

    alert(user._password); // secret
    Let’s use proxies to prevent any access to properties starting with _.

    We’ll need the traps:

    get to throw an error when reading such property,
    set to throw an error when writing,
    deleteProperty to throw an error when deleting,
    ownKeys to exclude properties starting with _ from for..in and methods like Object.keys.
 */


    let protectedUser:any = {
         name: "John",
        _password: "secret",
        hasPassword: function() {
            if(this._password) return true;
            return false;
        }
    }

    const propStartsWith_ = (prop:string) => prop[0] === "_";

    protectedUser = new Proxy(protectedUser, {
        set(target:any,prop,val){
            if(propStartsWith_(prop as string)){
                throw new Error("Access denied");
            }
            target[prop] = val
            return true;
        },
        get(target,prop){
            if(propStartsWith_(prop as string)){
                throw new Error("Access denied");
            }
            return typeof prop === "string" ? target[prop].bind(target):target[prop]
        },
        deleteProperty(target,prop){
            if(propStartsWith_(prop as string)){
                throw new Error("Access denied");
            }
            delete target[prop]
            return true;
        },
        ownKeys(target){
            return Object.keys(target).filter( (key:any) => !propStartsWith_(key))
        }
    });

    console.log(protectedUser["age"] = 23,protectedUser);
    // console.log(protectedUser["_age"] = 23, protectedUser);
    // console.log(protectedUser["_age"])
    // console.log(delete protectedUser["age"])

    console.log(protectedUser.hasPassword())

    for( let key in protectedUser ) console.log(key)

    /**
     * Has trap
     */

    let range = {
        start: 1,
        end: 10
    };

    range = new Proxy(range, {
        has(target:any, prop:any):boolean{
            return  prop > target.start && prop < target.end
        }
    })

    console.log( 2 in range)
    console.log( 5 in range)
    console.log( 15 in range)

    /**
     * Wrapping functions: "apply"
    We can wrap a proxy around a function as well.

    The apply(target, thisArg, args) trap handles calling a proxy as function:

    target is the target object (function is an object in JavaScript),
    thisArg is the value of this.
    args is a list of arguments.
     */


    function delay(fn:any,ms:number) {
        return new Proxy(fn,{
            apply(target,thisArg,args){
                setTimeout( target.apply(thisArg,args), ms)
            }
        })
    }

    function sayHi(user:any) {
        console.log(`Hello ${user}!`)
    }

    const sayHi2 = delay(sayHi, 3000);

    console.log(sayHi2.name,sayHi2.length)

    sayHi2("John")