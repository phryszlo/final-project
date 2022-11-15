import axios from "axios";
import * as inventoryAPI from "./inventory-api";


export const getModels = async () => {
  const models = await inventoryAPI.getModels();
  return models;
}
export const getLocations = async () => {
  const locs = await inventoryAPI.getLocations();
  return locs;
}
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