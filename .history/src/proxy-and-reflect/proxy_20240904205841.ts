/**
 * A Proxy object wraps another object and intercepts operations, like reading/writing properties and others,
 * optionally handling them on its own, or transparently allowing the object to handle them.
 * Proxies are used in many libraries and some browser frameworks. 
 */

// Syntax
const target = {};
const handler = () => console.log("handler");
const proxy = new Proxy(target, handler as any)

/**
 * target – is an object to wrap, can be anything, including functions.
 * handler – proxy configuration: an object with “traps”, methods that intercept operations. 
 * – e.g. get trap for reading a property of target, 
 * set trap for writing a property into target, and so on.
 */

/**
 * For operations on proxy, if there’s a corresponding trap in handler, then it runs, 
 * and the proxy has a chance to handle it, 
 * otherwise the operation is performed on target.
 * As a starting example, let’s create a proxy without any traps:
 */

let noTrapTarget: any = {};
let noTrapProxy = new Proxy(noTrapTarget, {}) // Empty handler

noTrapProxy.test = 2;

// we can read it from proxy and target

console.log(noTrapProxy.test, noTrapTarget.test,noTrapProxy);
for(const key in noTrapProxy){
    console.log(key);
}

/**
 * A writing operation proxy.test= sets the value on target.
 * A reading operation proxy.test returns the value from target.
 * Iteration over proxy returns values from target.
 * As we can see, without any traps, proxy is a transparent wrapper around target.
 */

/**
 * Default value with “get” trap
 * The most common traps are for reading/writing properties.
 * 
 * To intercept reading, the handler should have a method get(target, property, receiver).
 * 
 * It triggers when a property is read, with following arguments:
 * 
 * target – is the target object, the one passed as the first argument to new Proxy,
 * property – property name,
 * receiver – if the target property is a getter, then receiver is the object that’s going to be used as this in its call. 
 * Usually that’s the proxy object itself (or an object that inherits from it, if we inherit from proxy). 
 */

