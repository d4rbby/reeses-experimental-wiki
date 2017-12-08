**Javascript** is the primary programming language used on the web. It is used in conjunction with [HTML](?HTML) and [CSS](?CSS). It uses the [Semicolon](?Semicolon) but doesn't require the use of them.

## Examples
### Hello World (Console)
```javascript
console.log("Hello World!");
```

### Hello World (DOM)
```javascript
document.write("Hello World!");
```

### FizzBuzz
Fizz buzz is a group word game for children to teach them about division. Players take turns to count incrementally, replacing any number divisible by three with the word "fizz", and any number divisible by five with the word "buzz".
```javascript
for (var i=1; i <= 20; i++) {
    if (i % 15 == 0)
        console.log("FizzBuzz");
    else if (i % 3 == 0)
        console.log("Fizz");
    else if (i % 5 == 0)
        console.log("Buzz");
    else
        console.log(i);
}
```

### DOM
Pressing the button with the id `btn` will cause the element with the id `status` to change its text to `Clicked!` and change its text color to `red`.
```javascript
var btn = document.getElementById("btn");
var status = document.getElementById("status");
btn.addEventListener("click", function() {
  status.innerHTML = "Clicked!";
  status.style.color = "green";
});
```

## Popular Libraries and Frameworks
- [React](?React)
- [jQuery](?jQuery)
