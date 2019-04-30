import gql from 'graphql-tag'

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

export const ALL_AVATARS = gql`
  query AllAvatarsQuery {
    allAvatars {
      id
      url
    }
  }
`

export default {
  ALL_AVATARS, LAST_AVATAR
}
