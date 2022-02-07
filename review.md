## Looping, revisited

There are multiple ways of looping through an array (and through many array-like objects):

1.  A `for` loop over the indecies of the array
    ```js
    const arr = [...];

    for (let index = 0; index < arr.length; index++) {
      const item = arr[index];
      ...
    }
    ```

2. A `for` loop over the items in the array
    ```js
    const arr = [...];

    for (const [index, item] of arr.entries()) {
      ...
    }
    
    for (const item of arr) { console.log(item) }
    
    for (const entry of arr.entries()) { console.log(entry) }
    
    ```

3.  Using `forEach` with a callback function
    ```js
    const arr = [...];

    arr.forEach((item, index) => {
      ...
    });
    
    arr.forEach((item) => { console.log(item); });
    
    ```

Each method has its advantages, but for the most part they're pretty interchangeable (with one exception: you can't `break` out of a `forEach` loop, but you can get around that by using [`every`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every) instead).

## Object literals

At it's most basic level, an object is a collection of related data. We've used them already and we'll use them a lot more. Object literals are a good way of representing structured data in JavaScript (and, as we'll see later, outside of JavaScript too).

### Object literal syntax

Object attribute keys are always strings (even though we don't always quote them). So, the following object definitions are equivalent:

```js
{
  name: "Schuylkill",
  length: 217000
}
```

```js
{
  "name": "Schuylkill",
  "length": 217000
}
```

The quotes on the keys (not the values) are optional, as long as the key is a valid variable name (i.e., an **"identifier"**). In JavaScript, identifiers can contain letters, `$`, `_`, and digits (0-9), but may not start with a digit. Object attribute keys that are not valid identifiers can still be used, but they must be quoted. For example:

```js
{
  name: "Schuylkill",
  length: 217000,
  source: "Tuscarora, PA",
  "source elevation": 470,          // <-- key contains a space
  "2nd source": "Minersville, PA",  // <-- key starts with a digit
  "2nd source elevation": 350
}
```

Objects can also contain other objects in their values. For example, here is the same data as above, represented slightly differently:

```js
{
  name: "Schuylkill",
  length: 217000,
  sources: [
    {
      place: "Tuscarora, PA",
      elevation: 470
    },
    {
      place: "Minersville, PA",
      elevation: 350
    }
  ]
}
```

> That's an object with an attribute that's an array that contains other objects 🐢!

### Accessing attributes

There are two ways of accessing an attribute on an object.

1.  The first way is with [dot notation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#dot_notation); we've seen this a bunch. In this syntax, you specify the object in question, then a dot (`.`), and then the name of the attribute:

    ```js
    const river = {
      "name": "Schuylkill",
      "length": 217000
    };

    river.name;
    // Result: 'Schuylkill'
    ```

2.  The second way to access an attribute is with [bracket notation](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Basics#bracket_notation). In this syntax, you specify the object, then inside of square brackets you specify the _string value_ of the attribute's name:

    ```js
    const river = {
      "name": "Schuylkill",
      "length": 217000
    };

    river['name'];
    // Result: 'Schuylkill'
    
    river.name;
    // Result: 'Schuylkill'
    
    let attrname = 'name'
    river[attrname]
    // Result: 'Schuylkill'
    
    ```
 **doc length method only can be used in arrays and variables.**

These two ways are equivalent in their results, but there are some important differences. By convention, most JavaScript style guides prefer dot notation whenever possible.

So, when is it not possible to use dot notation?:

* When you have an attribute name that's not a valid identifier:
  ```js
  const person = {
    "given name": "Mjumbe",
    "family name": "Poe"
  };

  person.given name; // <-- 👎; entirely invalid syntax
  person.'given name'; // <-- 👎; entirely invalid syntax

  person['given name']; // <-- 👍
  ```
* When you don't know the name of the attribute, but you have a variable that contains the attribute name:
  ```js
  const person = {
    "given name": "Mjumbe",
    "family name": "Poe"
  };

  const getAttribute = function(obj, attr) {
    return obj.attr;  // <-- 👎; this valid syntax, but will look for an
                      //     attribute named 'attr' on the object, which is
                      //     not what we want.

    return obj[attr]; // <-- 👍; this will substitute the value of the attr
                      //     variable, which in our example is 'given name'.
  }

  getAttribute(person, 'given name');
  ```
  
  ```js
  const arr = [1,2,3,4,5]
  isEven = function(n) { return n%2 == 0}
  arr['filter'](isEven)
  ```
  **??? can't understand**
  
  ```js
  delete river.name  // <-- delete an attribute
  river.name = 'Delaware' // <-- add an attribute 
  ```

> **My opinion:** I also prefer the dot notation for JavaScript, but if I'm dealing with data where some of the attributes names are not valid identifiers, I will often refer to _all_ the attributes in that data using bracket notation, for visual consistency. For example:
>
> ```js
> const person = {
>  "given name": "Mjumbe",
>  "family name": "Poe",
>  age: "mind ya business"
> };
>
> console.log(person['given name']);
> console.log(person['family name']);
> console.log(person['age']);  // <-- could use dot notation here...
> ```
