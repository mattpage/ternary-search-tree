/* global after, before, describe, it, xit */
'use strict';

var expect = require('chai').expect;
var _ = require('lodash');
var TernarySearchTree = require('../index.js');
var wordListPath = require('word-list');
var wordArray = require('fs').readFileSync(wordListPath, 'utf8').split('\n');

describe('TernarySearchTree', function () {

  var tst;

  before(function(done){
    tst = new TernarySearchTree();
    done();
  });

  it('should have the method contains', function(){
    expect(tst).to.respondTo('contains');
  });

  it('should have the method search', function(){
    expect(tst).to.respondTo('search');
  });

  it('should have the method add', function(){
    expect(tst).to.respondTo('add');
  });

  it('should have the method empty', function(){
    expect(tst).to.respondTo('empty');
  });

  it('should not do anything if you try to insert an empty string', function(){
    tst.add('');
    expect(tst.length).to.eq(0);
  });

  it('add some words and build a balanced trie', function(){
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
    expect(tst.length).to.eq(12);
    expect(tst.contains('as')).to.be.true;
  });

  it('should be traversible', function(){
    var nodes = 0;
    tst.traverse(function(/*node*/){
      ++nodes;
    });
    expect(nodes).to.eq(tst.length);
  });

  describe('search and contains', function(){

    before(function(){
      tst.empty();
      expect(tst.length).to.eq(0);
      var len = wordArray.length;
      //console.log('total words', len);
      var half = Math.floor(len / 2);
      //console.log('half words', half);
      var i = 0;
      var w;

      for(i=half; i<len; ++i){
        w = wordArray[i];
        //console.log('adding word', w);
        tst.add(w, i);
      }
      for(i=0; i<half; ++i){
        w = wordArray[i];
        //console.log('adding word', w);
        tst.add(w, i);
      }
      expect(tst.length).to.eq(len);
    });

    it('should return false if you call contains with an empty string', function(){
      expect(tst.contains('')).to.be.false;
    });

    it('should be able to tell us if the tree contains a word', function(){
      var result = tst.contains("lollipop");
      expect(_.isBoolean(result)).to.be.true;
      expect(result).to.be.true;
      result = tst.contains("lollipopz");
      expect(result).to.be.false;
      result = tst.contains("lollipo");
      expect(result).to.be.false;
    });

    it('should return null if you search for an empty string', function(){
      var node = tst.search('');
      expect(node).to.be.null;
    });

    it('should be possible to search and retrieve associated data', function(){
      var max = wordArray.length - 1;
      var min = 0;
      var index = Math.floor(Math.random() * (max - min + 1)) + min;
      var word = wordArray[index];
      //console.log('searching for', word);
      var node = tst.search(word);
      //console.log('found', node);
      expect(node).to.not.be.null;
      expect(node.data).to.eql(index);
    });
  });

  it('should have more tests');

});







