---
layout: page
title: Javascript generator to seamlessly query a paginated api
comments: true
category: post
image: /public/images/2020-03-27-generator-query-paginated-api.png
---

Today is the first time I actually use generators in javascript (typescript) to do something useful, in this case it was iterating over objects reachable through a REST painated api.

Initially the code to query one page of data from the API looked like this

{% highlight typescript linenos %}
const getProjects = (userId: number, page = 1): Promise<Response> => {
  return axios.get(
    `https://example.com/api/v1/user/${userId}/projects`,
    { page },
  )
}
{% endhighlight %}

To explain that code line by line
1. function definition as an [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions), receives a userId and a page number as arguments. The page number argument has a default of 1. The return type defined says that this function returns a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) of an object with the `Response` structure. A function that returns a `Promise` is equivalent to an [`async function`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function), and both can be [`await`ed](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)
2. The only line in this function just uses the network library [axios](https://github.com/axios/axios) to do a [GET](https://tools.ietf.org/html/rfc7231#section-4.3.1) request. Axios returns a promise, and that promise is directly returned in this line.
3. The [URL](https://en.wikipedia.org/wiki/URL) to be queried, this line uses a [template string](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals) to interpolate the value of the variable `userId` inside the string
4. This are the GET request [querystring parameters](https://en.wikipedia.org/wiki/Query_string) that are going to be sent to the server when doing the request

the structure of the response in typescript is like the following

```typescript
interface Project {
  id: number
  name: string
}

interface Response {
  total_count: number
  per_page: number
  data: Array<Project>
}
```

Note that the data of the projects is inside the `data` attribute and the total_count and per_page are being returned as data in the response.

Then I created a generator to abstract the pagination out. It iterates page by page on the api and returns (yields) every object inside the array directly. An infamous `do {} while ()` loop is used to avoid repeating code, because it needs to be executed at least once.

{% highlight typescript linenos %}
async function *getProjectsPaginatedGenerator(userId: number) => {
  let page = 0
  let res
  do {
    page += 1
    res = await getProjects(userId, page)
    for (const project of res.data) {
      yield project
    }
  } while (res.total_count > page * res.per_page)
}
{% endhighlight %}

To explain that code line by line
1. async generator definition: this is a [generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) (because of the star) and its async (it returns a promise on each next() call)
2. Initializes the `page` variable to zero
3. Initializes the `res` variable in the scope outside the body of the `do..while` loop
4. Starts inconditionally the loop execution
5. Increments the `page` to the next one (first time this will be one)
6. Calls the API and gets the `Response` object saved in the `res` variable. This `await` call is blocking. It the promise fails (i.e. network error, or server response status code >= 400), it throws an exception and halts execution.
7. Iterates over all the objects (`Project`) inside the `Response.data`
8. It [`yield`s](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) every object separately. Generator magic happens here.
9. Closes for Projects loop
10. Ends while loop when there are no more pages that need to be retrieved.

As a bonus, if throttling is needed, a simple solution can be to use a js sleep function like the following one, and `await` to it just before ending the `do..while` loop.

```typescript
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
```

An example of the generator in use

```typescript
const userId = 1
for await (const project of getProjectsPaginatedGenerator(userId)) {
  console.log(project)
}
```

The `for..of` can iterate throuh a generator items that are being yielded async. The awesomeness here is that the iteration is done directly throuh objects and the pagination is not even visible by the use of the generator.
