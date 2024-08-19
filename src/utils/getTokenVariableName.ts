import { Token, TokenGroup } from "@supernovaio/sdk-exporters";
import { camelCase } from "change-case";

export function getTokenVariableName(
  token: Token,
  tokenGroups: Array<TokenGroup>
): string {
  const parent = tokenGroups.find((group) => group.id === token.parentGroupId)!;

  let fragments: Array<string> = [];
  if (parent) {
    fragments = parent.path.map((item) => camelCase(item));
    if (!parent.isRoot) {
      fragments.push(camelCase(parent.name));
    }
  }
  fragments.push(camelCase(token.name));

  let sentence =
    typeof fragments === "string" ? fragments : fragments.join(" ");

  // Only allow letters, digits, underscore and hyphen
  sentence = sentence.replaceAll("_", "").replaceAll(/[^a-zA-Z0-9_-]/g, ".");

  if (
    token.tokenType === "Color" &&
    token.propertyValues.tokenSet === "token-set-semantic"
  ) {
    // console.log(fragments);
  }

  return sentence;
}
