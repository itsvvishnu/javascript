/**
 * 
 * Validation with “set” trap
 * Let’s say we want an array exclusively for numbers.
 * If a value of another type is added, there should be an error.
 */

const numbers = [1];

const numberProxy = new Proxy(numbers, {
    set(target:any,prop,val){
        if( typeof val === "number"){
            console.log(target,val,prop);
            target[prop] = val;
            return true;
        }
        return false;
    }
});

try {
    console.log(numberProxy.push(2),numbers)
    console.log(numberProxy.push("string"),numbers)
    console.log(numberProxy.push([]),numbers)
} 
catch (err){}

console.clear();

