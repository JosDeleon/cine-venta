/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createFuncion = /* GraphQL */ `
  mutation CreateFuncion(
    $input: CreateFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    createFuncion(input: $input, condition: $condition) {
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
export const updateFuncion = /* GraphQL */ `
  mutation UpdateFuncion(
    $input: UpdateFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    updateFuncion(input: $input, condition: $condition) {
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
export const deleteFuncion = /* GraphQL */ `
  mutation DeleteFuncion(
    $input: DeleteFuncionInput!
    $condition: ModelFuncionConditionInput
  ) {
    deleteFuncion(input: $input, condition: $condition) {
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
