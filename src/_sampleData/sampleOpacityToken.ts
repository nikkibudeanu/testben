const opacityToken = {
  id: "fb43d95f-8bdb-429b-bb68-d53b96d37755",
  idInVersion: "12342667",
  brandId: "8e5f1a6a-9da2-4fe5-bd6b-31be14a06ccf",
  themeId: null,
  designSystemVersionId: "117328",
  name: "Backdrop",
  description: "Used for overlay backdrop opacity",
  tokenType: "Opacity",
  origin: null,
  parentGroupId: "cae422ab-cda3-4408-935c-7a8c8f46f12d",
  createdAt: null,
  updatedAt: "2024-08-14T20:26:37.052Z",
  sortOrder: -1,
  properties: [
    {
      idInVersion: "250202",
      id: "5d7eb185-4e39-4ee6-8aad-9b3dfb9c3c50",
      designSystemVersionId: "117328",
      name: "Token set",
      codeName: "tokenSet",
      description: "This token is part of a set",
      propertyType: "Select",
      targetElementType: "Token",
      linkElementType: null,
      options: [
        { id: "token-set-core", name: "Core", backgroundColor: "#F5F2FD" },
        {
          id: "token-set-semantic",
          name: "Semantic",
          backgroundColor: "#FEF0F5",
        },
        {
          id: "token-set-component",
          name: "Component",
          backgroundColor: "#CDFDFD",
        },
      ],
    },
  ],
  propertyValues: {},
  value: { unit: "Raw", measure: 0.2, referencedTokenId: null },
};

const r = {
  "100": { value: 0.1, type: "opacity", description: "" },
  "200": { value: 0.2, type: "opacity", description: "" },
  "300": { value: 0.3, type: "opacity", description: "" },
  "400": { value: 0.4, type: "opacity", description: "" },
  "500": { value: 0.5, type: "opacity", description: "" },
  "600": { value: 0.6, type: "opacity", description: "" },
  "700": { value: 0.7, type: "opacity", description: "" },
  "800": { value: 0.8, type: "opacity", description: "" },
  "900": { value: 0.9, type: "opacity", description: "" },
  overlay: {
    backdrop: {
      value: 0.2,
      type: "opacity",
      description: "Used for overlay backdrop opacity",
    },
  },
};
