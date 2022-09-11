import Axios from '../utils/axios'

const getNewsApi = async (category) => {
  return await Axios.get(`top-headlines?language=en&category=${category}`)
}

const searchNewsApi = async (search) => {
  return await Axios.get(`everything?q=${search}`)
}

export { getNewsApi, searchNewsApi }