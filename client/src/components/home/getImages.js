import axios from "axios"

const getImagesOfDogs = async (reference_image_id) => {
    const {data} = await axios(`https://api.thedogapi.com/v1/images/${reference_image_id}`)
    console.log(data);
    return data.url
}

export default getImagesOfDogs;
