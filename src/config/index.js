const urls = new Map()

urls.set('localhost', 'http://localhost:9000')
// urls.set(
//   'react-job-udemy.herokuapp.com/',
//   'https://fastify-udemy.herokuapp.com',
// )

export const baseUrl = urls.get(window.location.hostname)
