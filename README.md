*[Leia a documentação em Português](https://github.com/braziljs/remote-control/blob/master/README-pt.md)*

---

# Remote Control

![logo](http://braziljs.org/wp-content/uploads/2012/11/remote-control.jpg)

A tool to control the slides of your HTML5 presentation through a cell phone.

* [How it works](#how-it-works)
* [Dependencies](#dependencies)
* [How to install](#how-to-install)
* [How to use](#how-to-use)
* [Get involved](#get-involved)

## How it works
Remote Control is based on [WebSockets](https://developer.mozilla.org/en-US/docs/WebSockets), so you may have a good and modern browser, like Firefox, Chrome or Opera.  

The phone send a message through WebSockets to the server.   
The server receive the message as an action that must be executed, like 'next' or 'previous'.   
This action are emited to the HTML5 presentation.

## Dependencies
* [nodejs](http://nodejs.org)
* [socket.io](http://socket.io)
* A modern Web Browser with WebSockets support in your desktop [can i use websockets?](http://caniuse.com/#search=websockets)  
* A modern Web Browser with WebSockets support in your phone [can i use websockets?](http://caniuse.com/#search=websockets)

## How to install
For while, you need to install manually :(

First, if you don't have node, you must to install. Google it, if you don't know how.  
Install socket.io:
```cli
npm install socket.io
```

## How to use
Run app.js:
```cli
node app.js
```
The server will be available at port 81 [http:localhost:81](http:localhost:81), but you can change if you want.  

Now, you need to add 2 JavaScript libraries to your HTML5 presentation:
```html
<script src="http://localhost:81/socket.io/socket.io.js"></script>
<script src="path/to/remote-control.js"></script>
```

You're almost ready to start the presentation!  
Add this code to your presentation file:
```javascript
var remote = new RemoteControl();
remote.connect('http://localhost:81');
remote.on('next', function() {
	// Your method to move to the next slide
});

remote.on('previous', function() {
	// Your method to move to the previous slide
});
```
Now point your phone browser to your IP address on port 81.  
You must see a ugly(i'm working on that) page with 3 buttons.  
If everything is ok, now you are able to control your HTML5 presentation with your phone.

## Get involved
- Fork, run Remote Control in your enviroment, rate all features and send us your feedback through the [mail list](https://groups.google.com/forum/?fromgroups#!forum/braziljs-foundation)
- [Become a bug hunter!](https://github.com/braziljs/remote-control/issues?state=open)
- If you find some bug, [add an issue](https://github.com/braziljs/remote-control/issues/new) with the label "bug"
- If you want to fix the bug by yourself(wow!), make a fix in your enviroment and [make one pull-request](https://github.com/braziljs/remote-control/pulls)
- If you had an great idea of feature, [add an issue](https://github.com/braziljs/remote-control/issues/new) with the label "enhancement"
- If you want to implement the feature by yourself(wow! wow!), do it and [make one pull-request](https://github.com/braziljs/remote-control/pulls)


# Who is behind of it?
**Project Leaders**:  
[Jaydson Gomes](http://github.com/jaydson)  
[Felipe N. Moura](http://github.com/felipenmoura)

# License
*[MIT License](http://braziljs.mit-license.org/)*
