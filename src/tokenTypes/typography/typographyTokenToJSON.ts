import { TypographyToken } from "@supernovaio/sdk-exporters";
import { getTokenVariableName } from "../../utils/getTokenVariableName";
import { getValueWithUnit } from "../dimension/getValueWithUnit";

export const typographyTokenToJSON = (token: TypographyToken) => {
  const name = getTokenVariableName(token, []);

  const value = {
    fontFamily: token.value.fontFamily.text,
    fontWeight: token.value.fontWeight.text,
    fontSize: getValueWithUnit(token.value.fontSize),
    lineHeight: getValueWithUnit(token.value.lineHeight),
    letterSpacing: getValueWithUnit(token.value.letterSpacing),
  };

  const styleDictionary = {
    [name]: {
      value,
      type: "typography",
    },
  };

  return styleDictionary;
};
