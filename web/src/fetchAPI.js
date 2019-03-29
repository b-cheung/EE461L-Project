import axios from 'axios';
import { proxyUrl, getJoinedTablename } from './constants';

export async function fetchListData(tablename) {
    try {
        const queryUrl = `http://www.iodb.info/api/list/${tablename}`;
        const url = proxyUrl + queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchInstanceData(tablename, id) {
    try {
        const queryUrl = `http://www.iodb.info/api/instance/${tablename}/${id}`;
        const url = proxyUrl + queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchTopTenData(tablename, columnName) {
    try {
        const queryUrl = `http://www.iodb.info/api/top_ten/${tablename}/${columnName}`;
        const url = proxyUrl + queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedInstanceData(tablename1, tablename2, keyModel, id) {
    const tablename = getJoinedTablename(tablename1, tablename2);
    console.log('fetchJoinedTopTenData tablename', tablename);
    try {
        const queryUrl = `http://www.iodb.info/api/joined_instance/${tablename}/${keyModel}/${id}`;
        const url = proxyUrl + queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}

export async function fetchJoinedTopTenData(tablename1, tablename2, keyModel, id, columnName) {
    const tablename = getJoinedTablename(tablename1, tablename2);
    console.log('fetchJoinedTopTenData tablename', tablename);
    try {
        const queryUrl = `http://www.iodb.info/api/joined_top_ten/${tablename}/${keyModel}/${id}/${columnName}`;
        const url = proxyUrl + queryUrl;
        const response = await axios.get(url);
        const { data } = response;
        console.log(`fetch request to ${queryUrl}`, data);
        return data;
    } catch (error) {
        console.log(error.message);
    }
}