export default {
  base: {
    get: {
      tags: ['Image Endpoints'],
      description: 'Get images. Returns public id and url of image',
      operationId: 'getImages',
      parameters: [],
      responses: {
        200: {
          description: '200 OK',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    publicId: {
                      type: 'string',
                      example: 'unused/34bd9208cbh3124',
                      description: 'public id'
                    },
                    url: {
                      type: 'string',
                      example: 'https://example.com/unused/34bd9208cbh3124',
                      description: 'url'
                    }
                  }
                }
              }
            }
          }
        },
        500: {
          description: '500 Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    },
    post: {
      tags: ['Image Endpoints'],
      description: 'create image',
      operationId: 'createImages',
      parameters: [
        {
          name: 'img',
          in: 'body',
          schema: {
            type: 'file'
          },
          description:
            'image to upload. has to be filetype jpg, jpeg, tif or png'
        }
      ],
      responses: {
        201: {
          description: '201 Created',
          headers: {
            Location: {
              description: 'Location of created image',
              type: 'string'
            }
          }
        },
        400: {
          description: '400 Bad Request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        500: {
          description: '500 Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  },
  id: {
    get: {
      tags: ['Image Endpoints'],
      description: 'Get image by id',
      operationId: 'getImageById',
      parameters: [
        {
          name: 'id',
          in: 'params',
          schema: {
            type: 'string',
            example: '89sd0bc290c'
          },
          description: 'public id of image'
        }
      ],
      responses: {
        200: {
          description: '200 OK',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'object',
                    properties: {
                      publicId: {
                        type: 'string',
                        example: 'unused/34bd9208cbh3124',
                        description: 'public id'
                      },
                      url: {
                        type: 'string',
                        example: 'https://example.com/unused/34bd9208cbh3124',
                        description: 'url'
                      }
                    }
                  }
                }
              }
            }
          }
        },
        400: {
          description: '400 Bad Request',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ValidationError'
              }
            }
          }
        },
        500: {
          description: '500 Internal Server Error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/HttpError'
              }
            }
          }
        }
      }
    }
  }
};
