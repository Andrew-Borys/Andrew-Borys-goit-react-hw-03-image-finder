import axios from 'axios';

const API_key = '25338128-340729dab9479fd19989242a2';
const type = 'image_type=photo';
const orientation = 'orientation=horizontal';

axios.defaults.baseURL = `https://pixabay.com/api/`;

export const getGallary = async (searchQuery, page) => {
  const response = await axios.get(
    `?key=${API_key}&q=${searchQuery}&${type}&${orientation}&page=${page}&per_page=12`
  );
  return response.data;
};
