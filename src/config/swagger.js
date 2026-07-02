import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Parking API",
      version: "1.0.0",
      description: "공공데이터 기반 주차장 검색 API",
    },

    tags: [
      {
        name: "Auth",
        description: "인증 API",
      },
      {
        name: "Parking",
        description: "주차장 조회 API",
      },
      {
        name: "Favorite",
        description: "즐겨찾기 API",
      },
      {
        name: "History",
        description: "최근 조회 API",
      },
      {
        name: "Search History",
        description: "검색 기록 API",
      },
    ],
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },

  apis: ["./src/routes/*.js", "./src/controllers/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
