var app = require('../app');
const chai = require('chai');
const request = require('supertest');

describe('GET liveness Endpoint', () => {
    it('should be able to make aa get call ', () => {
        // code for testing the api
        request(app).get('/liveness').expect(200).then((res)=>{
            expect(res.text).to.be.eql('API Live!')
        });
});
});