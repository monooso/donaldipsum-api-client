'use strict';

var expect = require('chai').expect;
var nock = require('nock');
var ApiClient = require('../lib/ApiClient');

describe('ApiClient unit tests', function () {
    let apiUrl;
    let errorResponse;
    let successResponse;
    let subject;

    beforeEach(function () {
        apiUrl = 'http://example.com/api';

        errorResponse = {
            success: false,
            content: ['There was an error']
        };

        successResponse = {
            success: true,
            content: ["Let's build a wall"],
        };

        subject = new ApiClient();
        subject._baseUrl = apiUrl;
    });

    // Paragraphs.
    describe('GET paragraphs', function () {
        it('should request some paragraphs of Donald Ipsum', function () {
            nock(apiUrl).get('/paragraphs').reply(200, successResponse);

            return subject.getParagraphs().then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should request a specific number of paragraphs of Donald Ipsum', function () {
            var count;

            count = 5;

            nock(apiUrl).get('/paragraphs?count=' + count).reply(200, successResponse);

            return subject.getParagraphs(count).then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should return an error if the API returns a "failure" response', function () {
            nock(apiUrl).get('/paragraphs').reply(500, errorResponse);

            return subject.getParagraphs().catch(function (err) {
                expect(err).to.deep.equal({ status: 500, content: errorResponse.content });
            });
        });
    });

    // Sentences.
    describe('GET sentences', function () {
        it('should request some sentences of Donald Ipsum', function () {
            nock(apiUrl).get('/sentences').reply(200, successResponse);

            return subject.getSentences().then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should request a specific number of sentences of Donald Ipsum', function () {
            var count;

            count = 5;

            nock(apiUrl).get('/sentences?count=' + count).reply(200, successResponse);

            return subject.getSentences(count).then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should return an error if the API returns a "failure" response', function () {
            nock(apiUrl).get('/sentences').reply(500, errorResponse);

            return subject.getSentences().catch(function (err) {
                expect(err).to.deep.equal({ status: 500, content: errorResponse.content });
            });
        });
    });

    // Words.
    describe('GET words', function () {
        it('should request some words of Donald Ipsum', function () {
            nock(apiUrl).get('/words').reply(200, successResponse);

            return subject.getWords().then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should request a specific number of words of Donald Ipsum', function () {
            var count;

            count = 5;

            nock(apiUrl).get('/words?count=' + count).reply(200, successResponse);

            return subject.getWords(count).then(function (data) {
                expect(data).to.deep.equal({ status: 200, content: successResponse.content });
            });
        });

        it('should return an error if the API returns a "failure" response', function () {
            nock(apiUrl).get('/words').reply(500, errorResponse);

            return subject.getWords().catch(function (err) {
                expect(err).to.deep.equal({ status: 500, content: errorResponse.content });
            });
        });
    });
});

describe('ApiClient integration tests', function () {
    let subject;

    this.timeout(500);

    before(function () {
        subject = new ApiClient();
    });

    // Paragraphs.
    describe('GET paragraphs', function () {
        it('should request some paragraphs of Donald Ipsum', function () {
            return subject.getParagraphs().then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content).to.have.length.above(1);
            });
        });

        it('should request a specific number of paragraphs of Donald Ipsum', function () {
            return subject.getParagraphs(5).then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content).to.have.length(5);
            });
        });
    });

    // Sentences.
    describe('GET sentences', function () {
        it('should request some sentences of Donald Ipsum', function () {
            return subject.getSentences().then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content).to.have.length.above(1);
            });
        });

        it('should request a specific number of sentences of Donald Ipsum', function () {
            return subject.getSentences(5).then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content).to.have.length(5);
            });
        });
    });

    // Words.
    describe('GET words', function () {
        it('should request some words of Donald Ipsum', function () {
            return subject.getWords().then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content).to.have.length(1);
            });
        });

        it('should request a specific number of words of Donald Ipsum', function () {
            return subject.getWords(5).then(function (data) {
                expect(data.status).to.equal(200);
                expect(data.content).to.be.an.instanceof(Array);
                expect(data.content[0].split(' ')).to.have.length(5);
            });
        });
    });
});
