import gql from 'graphql-tag'

export const ALL_AVATARS = gql`
  query AllAvatarsQuery {
    allAvatars {
      id
      url
    }
  }
`

export default {
  ALL_AVATARS
}
