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
 * handler – proxy configuration: an object with “traps”, methods that intercept operations. – e.g. get trap for reading a property of target, set trap for writing a property into target, and so on.
 */
