/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFuncion = /* GraphQL */ `
  mutation CreateFuncion(
    $input: CreateFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    createFuncion(input: $input, condition: $condition) {
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
export const updateFuncion = /* GraphQL */ `
  mutation UpdateFuncion(
    $input: UpdateFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    updateFuncion(input: $input, condition: $condition) {
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
export const deleteFuncion = /* GraphQL */ `
  mutation DeleteFuncion(
    $input: DeleteFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    deleteFuncion(input: $input, condition: $condition) {
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
export const createPelicula = /* GraphQL */ `
  mutation CreatePelicula(
    $input: CreatePeliculaInput!
    $condition: ModelPeliculaConditionInput
  ) {
    createPelicula(input: $input, condition: $condition) {
      id
      pelicula
      valor
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updatePelicula = /* GraphQL */ `
  mutation UpdatePelicula(
    $input: UpdatePeliculaInput!
    $condition: ModelPeliculaConditionInput
  ) {
    updatePelicula(input: $input, condition: $condition) {
      id
      pelicula
      valor
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deletePelicula = /* GraphQL */ `
  mutation DeletePelicula(
    $input: DeletePeliculaInput!
    $condition: ModelPeliculaConditionInput
  ) {
    deletePelicula(input: $input, condition: $condition) {
      id
      pelicula
      valor
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const createReserva = /* GraphQL */ `
  mutation CreateReserva(
    $input: CreateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    createReserva(input: $input, condition: $condition) {
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
export const updateReserva = /* GraphQL */ `
  mutation UpdateReserva(
    $input: UpdateReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    updateReserva(input: $input, condition: $condition) {
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
export const deleteReserva = /* GraphQL */ `
  mutation DeleteReserva(
    $input: DeleteReservaInput!
    $condition: ModelReservaConditionInput
  ) {
    deleteReserva(input: $input, condition: $condition) {
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
