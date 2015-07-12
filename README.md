# Ternary Search Tree

A ternary search tree for Node.js.

## Installation
```shell
$ npm install ternary-search-tree --save
```

## Test
```shell
$ grunt test
```

## Usage
```
var TernarySearchTree = require('ternary-search-tree');
var tst = new TernarySearchTree();
tst.add('is');
tst.add('in');
tst.add('it');
tst.add('be');
tst.add('by');
tst.add('he');
tst.add('as');
tst.add('at');
tst.add('on');
tst.add('of');
tst.add('or');
tst.add('to');

console.log(tst.contains('as')); // = true
console.log(tst.length); // 12
console.log(tst.search('as')); // { node }
console.log(tst.partialMatch('a')); // [{ node(as) },{ node(at) }]
```

## Insertion Order

You want to avoid inserting strings into the tree in sorted order.
This can result in a long skinny tree that will not perform well.

This Dr. Dobb's article [Ternary Search Trees By Jon Bentley and Bob Sedgewick](http://www.drdobbs.com/database/ternary-search-trees/184410528?pgno=1)
provides the following guidance:

> You can build a completely balanced tree by inserting the median element of the input set, then recursively inserting all lesser elements and greater elements.
> A simpler approach first sorts the input set.
> The recursive build function inserts the middle string of its subarray, then recursively builds the left and right subarrays.
> We use this method in our experiments; it is fast and produces fairly well-balanced trees.
> The cost of inserting all words in a dictionary with function insert3 is never more than about 10 percent greater than searching for all words.
> D.D. Sleator and R.E. Tarjan describe theoretical balancing algorithms for ternary search trees in "Self-Adjusting Binary Search Trees" (Journal of the ACM, July 1985).


## Associated Data

The tree stores just the strings themselves, but no other information.
To associate additional information, we add a "data" member to each node.
When you add a string to the tree (via the method 'add'), you can provide arbitrary data as the second parameter.

```
tst.add('foo', 'bar');
tst.add('bas', 42);
tst.add('baz', { .. });
tst.add('chicken');
```

Data is retrieved via the "search" method.

```
var node = tst.search('foo');
console.log(node.data); //'bar'
node = tst.search('chicken');
console.log(node.data); //null
```

## Docs

Generate docs

```shell
$ grunt docs
```

## Resources
[Ternary Search Trees](http://www.drdobbs.com/database/ternary-search-trees/184410528?pgno=1)
