import gql from 'graphql-tag'

export const CREATE_AVATAR_MUTATION = gql`  
  mutation CreateAvatarMutation($url: String!) {
    createAvatar(
      url: $url,
    ) {
      id
      createdAt
      url
    }
  }
`

export const CREATE_USER_REPRESENTATION_MUTATION = gql`
  mutation CreateUserRepresentationMutation($avatar: String!, $picture: String!) {
    createUserRepresentation(
      picture: $picture,
    ) {
      id
      createdAt
      picture
      avatar
    }
  }
`
