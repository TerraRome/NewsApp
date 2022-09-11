import { showErrorToast } from "../../components/toast";
import { getNewsApi, searchNewsApi } from "../../services/news_service";

export const setNewsStore = (data) => ({
  type: 'SET_NEWS',
  payload: data,
})

export const searchNewsStore = (data) => ({
  type: 'SEARCH_NEWS',
  payload: data,
})

export const resetSearchStore = () => ({
  type: 'RESET_SEARCH',
})

export const getDataNews = (setLoading, category) => async (dispatch) => {
  try {
    setLoading(true)
    const res = await getNewsApi(category);
    if (res.status === 200) {
      dispatch(setNewsStore(res.data.articles))
    } else {
      showErrorToast('Something Went Wrong!')
    }
  } catch (error) {
    showErrorToast(error)
  } finally {
    setLoading(false)
  }
}

export const getSearchNews = (search, setLoading) => async (dispatch) => {
  try {
    setLoading(true);
    const res = await searchNewsApi(search);
    if (res.status === 200) {
      dispatch(searchNewsStore(res.data.articles));
    } else {
      showErrorToast('Something Went Wrong!')
    }
  } catch (error) {
    showErrorToast(error);
  } finally {
    setLoading(false);
  }
};