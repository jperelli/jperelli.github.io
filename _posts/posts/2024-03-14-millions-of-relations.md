---
layout: page
title: Millions of relations in mongodb not solvable by AI
comments: true
category: post
---

## Mongodb 16MB limit

We have a mongodb database with thousands of records, each one had to be related to millions of users.

By mongodb document logic db design, we had every record related using an array of userId, something like

```json
{ 
  "record": {
    "recordId": ObjectId("123"),
    "users": [{"userId": "B045312"}, {"userId": "B8435021"}, ...]
  }
}
```

But when the array of users is too big (>300.000), we hit a limit of mongodb's row max size of 16MB.

## Designs testing

We tested different solutions that had realy bad performance:

1. Transpose the data: Have the `Users` collection with an array of `records`
    - We wanted to get the original `Users` back, and the operation of recreating the original user list took 2 minutes, this was too much.
2. Relational normalized approach: `RecordUser` Many-to-Many relation table with `recordId, userId` columns.
    - It took too much time to insert every record in the database
    - We hit another mongodb limit of the npm mongodb library not being able to send all the data at once to the database
3. Save the data in Array chunks in the database:
    - We needed to know given a userId and recordId if it was related or not, very fast. This operation took too much time for us, 20 seconds.
    - Creating an index in the array would add too much time to the inserts, and would give us a huge index.

## Working solution

The solution we found was a variation of `3.`, with a "custom" partial index:

- Preprocess the data:
  - Order the array of id strings lexicographically.
  - Take collation into account.
  - Chunk the array into fixed-size parts.
  - Get the first and last element of the array chunk.
- Save the chunked arrays in database.
- Create indexes only on the first and last elements of the array.

Sample structure of the data:

```json
[
    {
        "recordId": "1",
        "arrayId": "123",
        "userschunk": [{"userId": "B045312"}, {"userId": "B8435021"}, ...],
        "order": 1,
        "first": "B045312",
        "last": "C456783",
    },
    {
        "recordId": "1",
        "arrayId": "123",
        "userschunk": [{"userId": "C589432"}, {"userId": "C8435021"}, ...],
        "order": 1,
        "first": "C589432",
        "last": "D444432",
    },
]
```

## Interpretation

This format of the data in database is similar to a Tree with only one level of data and a fixed size of leave.

## Operations

### Insert

Sorting, chunking and inserting in the database was the fastest of all the designs we tried by far.
It took about 20 seconds to do all with a 10 million array.

### Existence of relation

Check if a `userId=A012345` is related to a `RecordId=123`

```javascript
findOne({
        recordId: 123,
        first: { $lt: 'A012345' },
        last: { $gt: 'A012345' },
        'usersChunk.userId': 'A012345'
    }, 
    {
        $project: _id
    }
)
```

This query uses a compound index in `recordId+first+last` and it scans the array in one pass. For chunked arrays of 20.000 items, the result was in about 0.015 seconds to find in a chunked 10 million array.

### Get original array

The original array took more time in being transfered from the database than to be queried. It's about 100 MB of data and it takes around 2 seconds to get into the application.

## AI could not handle this issue (at least for now)

We tried to get a solution with chatgpt and friends, but the solutions we got were always combinations of existing things:
  - Adding indices
  - Transposing data
  - Using another database/technology
  - Relational normalized many-to-many solution

I tried hinting chatgpt with the solution we found, but it was never cooperating, even if I was explicit with the solution, it did not understand it and always proposed a combination of the known ones.

AI in the current LLM form will always depend on the training data. And when given a new problem it will try to throw only existing solutions at it, and just merge or tweak them a little bit.

Many times in Software Engineering we get this kind of issues were we need to hack a system in order to make it work like we need with the limited resources we have, and the AI systems seem to not be able to make this, because they reuse only the solutions they have seen.

It seems AI tries to use "template" soutions, and it seems Software Engineers have a capacity to be more maleable and invent things with more variation.

No idea if it is going to be like this in the future of AI folks will be able to overcome this kind of issues, but as of today (2024-03-14) I think SWE are safe.
