---
title: Rendering Do's and Don'ts
date: 2020-04-26
chapter: 2
lesson: 2
---

Let's go through some of the requirements of the render method inside a Component class. You can try these examples on your ***hello world*** project you created on the previous lesson.

## 1. Root Tag

The render method must only have one root tag

```javascript
// This is correct
class App extends Component {
  render() {
    return <div><h1>Hello World</h1><p>This is a paragraph</p></div>
  }
}
```

```javascript
// This is wrong (more than one root tag)
class App extends Component {
  render() {
    return <h1>Hello World</h1><p>This is a paragraph</p>
  }
}
```

## 2. Multi-line HTML code

You need to put parenthesis around HTML that is more than 1 line.

```javascript
// This is correct
class App extends Component {
  render() {
    return (
    	<div>
    		<h1>Hello World</h1><p>This is a paragraph</p>
        </div>
    )
  }
}
```

```javascript
// This is wrong (no parenthesis)
class App extends Component {
  render() {
    return
    	<div>
    		<h1>Hello World</h1><p>This is a paragraph</p>
        </div>
  }
}
```

## 3. Closing tags

React is extremely strict, therefore you need to be careful with invalid HTML. Always close your tags, even for single tags. An example single tag is the line break tag "\<br>". You will need to close it with a forward slash which results in this tag "\<br />".

```javascript
// This is correct
class App extends Component {
  render() {
    return (
    	<div>
    		<h1>Hello World</h1>
    		<p>This is a paragraph<br />Another line</p>
        </div>
    )
  }
}
```

```javascript
// This is wrong (the line break and paragraph tags are not closed)
class App extends Component {
  render() {
    return (
    	<div>
    		<h1>Hello World</h1>
    		<p>This is a paragraph<br>Another line
        </div>
    )
  }
}
```

