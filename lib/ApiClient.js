'use strict';

var rest = require('rest');
var mime = require('rest/interceptor/mime');
var url = require('url');

/**
 * Normalises the given "count" query parameter.
 * @param   {*} count
 * @returns {int}
 */
function normalizeCount(count) {
    return Number.isInteger(count) && count >= 0 ? count : 0;
}

/**
 * Constructs the full URI to the given endpoint.
 * @param   {string} baseUrl
 * @param   {string} endpoint
 * @param   {int}    count
 * @returns {string}
 */
function constructUri(baseUrl, endpoint, count) {
    var urlObject;

    urlObject = url.parse(baseUrl);
    urlObject.pathname = urlObject.pathname + '/' + endpoint;

    if (count = normalizeCount(count)) {
        urlObject.query = { count: count };
    }

    return url.format(urlObject);
}

/**
 * Determines whether the given object represents a "successful" response.
 * @param   {object} res
 * @returns {boolean}
 */
function isSuccessfulResponse(res) {
    return res.status.code === 200 && res.entity.success === true;
}

/**
 * Builds a "success" response.
 * @param   {object} res
 * @returns {object}
 */
function buildSuccessResponse(res) {
    return {
        status: res.status.code,
        content: res.entity.content,
    };
}

/**
 * Builds an "error" response.
 * @param   {object} res
 * @returns {object}
 */
function buildErrorResponse(res) {
    var content;

    content = res.entity && res.entity.content ? res.entity.content : 'Unknown error';

    return {
        status: res.status.code,
        content: content,
    };
}

/**
 * ApiClient constructor. We just hard-code the API base URL for now.
 */
function ApiClient() {
    this._baseUrl = 'https://api.donaldipsum.net/v1';
}

/**
 * Makes a request to the specified endpoint.
 * @param   {string} endpoint
 * @param   {int}    count
 * @returns {promise}
 */
ApiClient.prototype._makeRequest = function (endpoint, count) {
    var client;

    client = rest.wrap(mime);

    return client(constructUri(this._baseUrl, endpoint, count)).then(function (res) {
        if (isSuccessfulResponse(res)) {
            return buildSuccessResponse(res);
        } else {
            throw buildErrorResponse(res);
        }
    });
};

/**
 * Retrieves the specified number of paragraphs of Donald Ipsum.
 * @param   {int} count
 * @returns {promise}
 */
ApiClient.prototype.getParagraphs = function (count) {
    return this._makeRequest('paragraphs', count);
};

/**
 * Retrieves the specified number of sentences of Donald Ipsum.
 * @param   {int} count
 * @returns {promise}
 */
ApiClient.prototype.getSentences = function (count) {
    return this._makeRequest('sentences', count);
};

/**
 * Retrieves the specified number of words of Donald Ipsum.
 * @param   {int} count
 * @returns {promise}
 */
ApiClient.prototype.getWords = function (count) {
    return this._makeRequest('words', count);
};

module.exports = ApiClient;
