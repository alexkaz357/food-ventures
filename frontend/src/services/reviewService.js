import Axios from 'axios'
import httpService from './httpService';
const BASE_URL = 'http://localhost:3030/api/review'

const axios = Axios.create({
    withCredentials: true
});

export const reviewService = {
    add,
    query
}

async function add(review) {
    const res = await axios.post(`${BASE_URL}`, review)
    return res.data;
}

async function query(filterBy, chef = true) {

    if (Object.keys(filterBy).length) {
        var queryStr = (chef) ? `?chefId=${filterBy}` : `?byUserId=${filterBy}`;
    }
    return httpService.get(`review${queryStr || ''}`);
}