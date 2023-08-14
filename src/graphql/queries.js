/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFuncion = /* GraphQL */ `
  query GetFuncion($id: ID!) {
    getFuncion(id: $id) {
      id
      pelicula
      sede
      sala
      horario
      asientos
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listFuncions = /* GraphQL */ `
  query ListFuncions(
    $filter: ModelFuncionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFuncions(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pelicula
        sede
        sala
        horario
        asientos
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
