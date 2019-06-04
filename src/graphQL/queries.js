import gql from 'graphql-tag'

export const GET_USER_REPRESENTATION = gql`
  query UserRepresentationQuery($id: ID!) {
    UserRepresentation(id: $id) {
      id
      avatar {
        id
        url
      }
      picture
    }
  }
`

export const ALL_USER_REPRESENTATION = gql`
  query AllUserRepresentationQuery {
    allUserRepresentation {
      id
      avatar {
        id 
        url
      }
      picture
    }
  }
`

export const GET_AVATAR = gql`
  query AvatarQuery($id: ID!) {
    Avatar(id: $id) {
      id
      url
    }
  }
`

export const ALL_AVATARS = gql`
  query AllAvatarsQuery {
    allAvatars(orderBy: createdAt_DESC) {
      id
      url
    }
  }
`

export default {
  ALL_AVATARS, ALL_USER_REPRESENTATION, GET_USER_REPRESENTATION, GET_AVATAR
}
