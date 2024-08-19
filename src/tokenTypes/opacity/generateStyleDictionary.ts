import { OpacityToken } from "@supernovaio/sdk-exporters";
import { arrayToDictionary } from "../../utils/arrayToDictionary";
import { opacityTokenToJSON } from "./opacityTokenToJSON";

export const generateOpacityStyleDictionary = (
  tokens: OpacityToken[],
  tokenGroups
) => {
  const values = tokens.map((token) => opacityTokenToJSON(token, tokenGroups));

  // Returning the JSON object here instead of writing to a file
  // since we want to append it to the color dictionary
  return arrayToDictionary(values);
};
