import { deserialise } from './'

describe('kitsu-core', () => {
describe('deserialise', () => {
  it('should deserialise a resource without included relationships', async () => {
    expect.assertions(1)
    expect(await deserialise({
      data: {
        id: '9',
        type: 'roles',
        attributes: {
          name: 'mod'
        }
      }
    })).toEqual({
      data: {
        id: '9',
        type: 'roles',
        name: 'mod'
      }
    })
  })

  it('should deserialise a collection without attributes and included relationships', async () => {
    expect.assertions(1)
    expect(await deserialise({
      data: [
        {
          id: '1',
          type: 'userRoles'
        },
        {
          id: '2',
          type: 'userRoles'
        }
      ]
    })).toEqual({
      data: [
        {
          id: '1',
          type: 'userRoles'
        },
        {
          id: '2',
          type: 'userRoles'
        }
      ]
    })
  })

  it('should deserialise a collection of resources with included relationships', async () => {
    expect.assertions(1)
    expect(await deserialise({
      data: [
        {
          id: '1',
          type: 'users',
          attributes: {
            name: 'Josh'
          },
          relationships: {
            waifu: {
              data: {
                id: '1',
                type: 'characters'
              }
            }
          }
        }
      ],
      included: [
        {
          id: '1',
          type: 'characters',
          attributes: {
            name: 'Genkai'
          }
        }
      ]
    })).toEqual({
      data: [
        {
          name: 'Josh',
          waifu: {
            name: 'Genkai',
            id: '1',
            type: 'characters'
          },
          id: '1',
          type: 'users'
        }
      ]
    })
  })

  it('should deserialise a single resource with included relationships', async () => {
    expect.assertions(1)
    expect(await deserialise({
      data: {
        id: '1',
        type: 'users',
        attributes: {
          name: 'Josh'
        },
        relationships: {
          waifu: {
            data: {
              id: '1',
              type: 'characters'
            }
          }
        }
      },
      included: [
        {
          id: '1',
          type: 'characters',
          attributes: {
            name: 'Genkai'
          }
        }
      ]
    })).toEqual({
      data: {
        name: 'Josh',
        waifu: {
          name: 'Genkai',
          id: '1',
          type: 'characters'
        },
        id: '1',
        type: 'users'
      }
    })
  })

  it('should deserialise with empty data arrays', async () => {
    expect.assertions(1)
    expect(await deserialise({
      data: {
        id: '1',
        type: 'users',
        attributes: {
          data: []
        }
      }
    })).toEqual({
      data: {
        data: [],
        id: '1',
        type: 'users'
      }
    })
  })
})
})
