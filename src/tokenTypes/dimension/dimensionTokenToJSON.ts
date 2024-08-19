import { DimensionToken } from "@supernovaio/sdk-exporters";
import { getTokenVariableName } from "../../utils/getTokenVariableName";
import { getValueWithUnit } from "./getValueWithUnit";

export const dimensionTokenToJSON = (token: DimensionToken) => {
  const name = getTokenVariableName(token, []);

  const value = getValueWithUnit(token.value);

  const camelCaseTokenType = dimensionTypeMap[token.tokenType];

  const styleDictionary = {
    [camelCaseTokenType]: {
      [name]: {
        value,
        type: camelCaseTokenType,
      },
    },
  };

  return styleDictionary;
};

const dimensionTypeMap = {
  BorderRadius: "borderRadius",
  BorderWidth: "borderWidth",
  Space: "space",
};
