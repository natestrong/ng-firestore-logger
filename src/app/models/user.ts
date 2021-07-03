export interface User {
  id: string,
  first: string,
  last: string,
  birthday: Date,
  profession: string,
  favoriteAnimal: string,
  twitterFollowers: TwitterUser[],
}

interface TwitterUser {
  handle: string,
  name: string,
}
