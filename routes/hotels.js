"use strict";

const Joi = require('joi');
const hotelsDB = require("../lib/hotelsDB.js");

function hotels(server){
    server.route({
        method: 'GET',
        path: '/api/v1/hotels',
        config: {
            plugins: {
                'hapi-swagger': {
                    responses: {'400': {'description': 'Bad Request'},'200':{'description':'ok'}},
                    payloadType: 'json'
                }
            },
            validate:{
                query: {
                    limit: Joi.number().required().min(1).max(100).integer().positive().description('Page Limit between 1 and 100'),
                    offset: Joi.number().required().min(0).max(100).integer().description('Pagination offset. '),
                }
            },
            tags: ['api']
        },
        handler: function (req, reply) {
            let params = {
                limit: typeof req.query.limit != "undefined" ? req.query.limit : 0,
                offset: typeof req.query.offset != "undefined" ? req.query.offset : 0
            };
            hotelsDB.getHotels(params,(err,hotel) => {
                if(err)
                    return reply(err);
                return reply(hotel);
            });
        }
    });
}

module.exports = hotels;