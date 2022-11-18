import * as inventoryAPI from "./inventory-api";


export const getEq = async (id) => {
  const eq = await inventoryAPI.getEq(id);
  console.log(`inv svc getEq(id): eq=${JSON.stringify(eq)}`)
  return eq;
}

export const getAllEqAndRelated = async () => {
  const eq = await inventoryAPI.getAllEqAndRelated();
  return eq;
}

export const getAllEq = async () => {
  const eq = await inventoryAPI.getAllEq();
  return eq;
}

export const insertEq = async (newEq) => {
  const result = await inventoryAPI.postEq(newEq);
  return result;
}

export const updateEq = async (id, updated) => {
  const result = await inventoryAPI.patchEq(id, updated);
  return result;
}

export const getModels = async () => {
  const models = await inventoryAPI.getModels();
  return models;
}

export const insertModel = async (newModel) => {
  const result = await inventoryAPI.postModel(newModel);
  return result;
}

export const updateModel = async (id, updated) => {
  const result = await inventoryAPI.patchModel(id, updated);
  return result;
}


export const getModel = async (id) => {
  const model = await inventoryAPI.getModel(id);
  return model;
}
export const getLocation = async (id) => {
  const loc = await inventoryAPI.getLocation(id);
  return loc;
}

export const getLocations = async () => {
  const locs = await inventoryAPI.getLocations();
  return locs;
}

export const insertLocation = async (newLocation) => {
  const result = await inventoryAPI.postLocation(newLocation);
  return result;
}

export const updateLocation = async (id, updated) => {
  const result = await inventoryAPI.patchLocation(id, updated);
  return result;
}