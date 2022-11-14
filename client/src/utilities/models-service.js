import * as usersAPI from "./users-api";


export const getModels = async () => {
  const models = await modelsAPI.getModels();
  return models;
}
