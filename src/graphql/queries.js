/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFuncion = /* GraphQL */ `
  query GetFuncion($id: ID!) {
    getFuncion(id: $id) {
      id
      sede
      idPelicula
      sala
      fecha
      hora
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
        sede
        idPelicula
        sala
        fecha
        hora
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
export const getPelicula = /* GraphQL */ `
  query GetPelicula($id: ID!) {
    getPelicula(id: $id) {
      id
      pelicula
      valor
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listPeliculas = /* GraphQL */ `
  query ListPeliculas(
    $filter: ModelPeliculaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPeliculas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pelicula
        valor
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const getReserva = /* GraphQL */ `
  query GetReserva($id: ID!) {
    getReserva(id: $id) {
      id
      email
      titulo
      asientos
      valor
      fecha
      url
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listReservas = /* GraphQL */ `
  query ListReservas(
    $filter: ModelReservaFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReservas(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        email
        titulo
        asientos
        valor
        fecha
        url
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
export const funcionPorSedePeliculaSala = /* GraphQL */ `
  query FuncionPorSedePeliculaSala(
    $sede: Sede!
    $salaIdPeliculaFecha: ModelFuncionPorSedePeliculaSalaCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelFuncionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    funcionPorSedePeliculaSala(
      sede: $sede
      salaIdPeliculaFecha: $salaIdPeliculaFecha
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sede
        idPelicula
        sala
        fecha
        hora
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
