import axios, { AxiosError } from "axios";
import { ENVIRONMENTS } from "@/core/environments";
import { SimplyHopAPICollectionURL } from "@/core/utils/router/constants/simplyhop_api";
import { PostUserProfileCreatePayloadRequestInterface } from "@/core/models/rest/simplyhop/user_profile";

export const fetchPostUserProfileCreate = async (
  payload: PostUserProfileCreatePayloadRequestInterface
) => {
  try {
    const url = `${
      ENVIRONMENTS.SIMPLY_HOP_API_URL
    }${SimplyHopAPICollectionURL.user_profile.postCreate()}`;

    const res = await axios.post(url, payload.body);
    return res.data;
  } catch (err) {
    throw (err as AxiosError)?.response?.data || (err as AxiosError)?.response;
  }
};
