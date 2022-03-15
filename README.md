# GraphQL

- Graph Query Language로 그래프 자료구조에 담긴 데이터에 질의하는 형식, 명세이다.
    - 어떠한 솔루션, 구현체가 아닌 명세, 형식 또는 스펙으로 특정 언어나 프레임워크의 런타임에 종속되지 않고, 어디서든 사용할 수 있다.
        - https://graphql-kr.github.io/code/ 가보면 특정언어에서 GraphQL을 어떻게 사용하는지 알 수 있다.

```graphql
type Movie {
  id: Int!
  title: String!
  rating: Int!
  description: String!
  actors: [Actor]!
}

type Actor {
  id: Int!
  nickname: String!
  career: Int
  isfamous: Boolean
  user: User!
}

type Person{
  id: Int!
  name: String!
  gender: Gender
  age: Int
}
```

Movie - Actor - Person (노드와 간선으로 이루어진 그래프 형태)
-> 서비스 도메인을 그래프 형태로 모델링 하고, 해당 그래프에 GraphQL쿼리를 요청 한다.

- REST API와 같은 언어 형식일 뿐이기에, GraphQL 형식대로 요청하고, 응답하기 위해선 솔루션(라이브러리)가 필요하다. GraphQL만으로 할수 있는건 없다.
    - Apollo, GraphQL.js, Relay.... 다양한 라이브러리들이 존재하고, 다양한 언어와 프레임워크에서 지원한다.

> SQL은 Structured Query Language로 구조화된 (표) 자료구조의 데이터에 질의하는 언어 명세. 
> GraphQL은 Graph Query Language로 그래프 자료구조의 데이터에 질의하는 언어 명세!

# GraphQL query

- GraphQL query
```graphql
query{
  pets{
    id
    name
    type
  }
}
```

- Json Response
```json
{
  "data": {
    "pets": [
      {
        "id": 1,
        "name": "Mambo",
        "type": null
      },
      {
        "id": 2,
        "name": "nabi",
        "type": null
      }
    ]
  }
}
```

- JSON의 key이름으로만 요청하면 해당 key에 해당되는 데이터만 응답받을 수 있다.
    - 비교적 사용은 간단하다.
- 응답받고 싶은 데이터의 필드만 적으면 해당 key에 해당되는 데이터만 응답된다. (GraphQL의 특징)
  - pets GraphQL query id, name만 요청하면 id, name에 해당되는 데이터만 응답한다.

# GraphQL, REST API 실행해 볼수 있는 예제
- 영화 CRUD api를 직접 요청하며 GraphQL과 REST API의 차이를 느껴보자아~

1. `git clone https://github.com/YeomJaeSeon/GraphQL.git graphql` 
2. `cd graphql/nest-graphql-code_first`
3. `yarn`
4. `yarn start:dev`
5. api 요청해보기
  - REST API를 이용한 요청: 포스트맨 Team workspace의 GraphQL example/REST API/영화 에서 요청
  - GraphQL을 이용한 요청: 포스트맨 Team workspace의 GraphQL example/GraphQL/영화 에서 요청 or localhost:3000/graphql 요청 후, graphql에서 제공하는 playground 에서 요청(docs, schema등을 제공해줌)

> 코드를 보기보단, 일단 Rest API 를 이용하여 요청할 때와, GraphQL을 이용하여 요철할 때의 차이점을 몸소 느껴보자아

# Node환경에서 GraphQL 적용해보기
- NestJS + GraphQL을 바로 적용하려 했던 나는, 뭐가 뭘 의미하는지 몰라서 오히려 어려웠다. 노드환경에서 매우 간단한 예제로 '리졸버는 뭐고', '오브젝트 타입은 뭐고', '루트 타입은 뭐구나'.. 등을 이해하고 CRUD간단한 CRUD api를 만들어 본 뒤, NestJS + GraphQL을 적용하니 이해가 쉬웠다. 그래서 간단한 그래프큐엘을 적용해보자아.

1. `cd graphql/node-graphql`
2. yarn을 이용해 global 하게 `nodemon`라이브러리를 설치하자 `yarn global add nodemon`
3. `yarn global list` 명령어로 `nodemon` 잘 설치 되었나 확인
4. `yarn` 명령어로 현재 프로젝트 의존성 모듈 설치
5. `yarn start` 명령어로 노드 어플리케이션 실행
6. 브라우저에서 `localhost:4000/graphql`를 요청하여 schema를 보고 요청해보자.

### 간단한 코드 설명
node-graphql 디렉토리의 간단한 프로젝트는 index.js와 database.js 파일로 이루어져있다. index.js 파일은 리졸버 역할을 하고, database.js는 데이터베이스 역할을 한다고 생각하자

> Apollo server를 이용하여 GraphQL을 사용하였다.

```javascript
const typeDefs = gql`
# 루트쿼리 Query
    type Query{
        movies: [Movie]
        movie(id: Int!):Movie
        actors: [Actor]
        actor(id: Int!): Actor
    }
# 루트 쿼리 Mutation
    type Mutation{
        createMovie(
            createMovieInput: CreateMovieInput
        ): Movie
        updateMovie(
            id: Int!
            description: String!
        ): Movie
        deleteMovie(
            id: Int!
        ): String
    }

# Object type
    type Movie{
        id: Int!
        title: String!
        description: String
        actors: [Actor!] 
        # 요렇게 Movie - Actor 타입간의 관계를 그래프형태로 설정할 수 있다. (관계 설졍에 유용하겠다는 생각이 든다.)
    }

    type Actor{
        id: Int
        name: String
    }

# input type
    input CreateMovieInput{
        title: String!
        description: String
        actorIds: [Int]
    }
` 
```
- typeDefs변수에 literal template을 이용해, GraphQL에서 사용할 스키마를 정의했다
  - Query, Mutation은 루트 쿼리로, Http Method와 비교해보면 Query는 Get, Mutation은 Post Put Delete 와 대응된다. 
  - Query, Mutation 루트 쿼리에서 GraphQL 쿼리의 이름을 지정해주고, 어떤 데이터를 응답받을 지도 지정해준다.
    (Query를 보면 movies로 요청하면, Movie 리스트를 응답한다는 의미이다.)
  - 루트 쿼리 위외에도 Object type, input type, enum등을 지정해줘야한다. Movie, Actor은 Object type이고 서로간의 관계를 설정할 수 있다.
  - GraphQL 쿼리의 인자에 넣을 input type도 지정할수 있다. 위 예에서는 `CreateMovieInput`이라는 input type을 지정하여 createMovie 쿼리의 인자로써 사용하고 있다.


이렇게 어떤 쿼리를 날리면 어떤 데이터를 응답할지, 내가 만든 오브젝트 타입, enum(여기선 안했음), input type을 지정해줘야 한다.

이제 서버에선 GraphQL쿼리가 왔을 때 어떻게 처리할지에 대한 **resolver**를 정의해야한다.

```javascript
const resolvers = {
    Query: {
        movies: () => movies,
        movie: (parent, args) => movies.find(movie => movie.id === args.id),
        actors: () => actors,
        actor: (parent, args) => actors.find(actor => actor.id === args.id)
    },
    Mutation: {
        createMovie: (parent, args) => {
            const {title, description, actorIds} = args.createMovieInput

            const resultActors = actors.filter(actor => actorIds.includes(actor.id))

            if(resultActors.length !== actorIds.length){
                throw new Error("존재하지 않는 배우입니다.")
            }

            const newId = ++movies[movies.length - 1].id

            const newMovie = {
                id: newId,
                title,
                description,
                actors: resultActors
            }
            movies.push(newMovie)

            return newMovie
        },
        updateMovie: (parent, args) => {
            const {id, description} = args;

            movies.forEach(movie => {
                if(movie.id === id) movie.description = description
            })

            return movies.filter(movie=> movie.id === id)[0]
        },
        deleteMovie: (parent, args) => {
            const id = args.id
            const foundMovie = movies.find(movie => movie.id === id)

            if(!foundMovie){
                return `#${id}의 영화 없음`
            }

            const deleteIdx = movies.indexOf(foundMovie)
            movies.splice(deleteIdx, 1)
            
            return "삭제 성공"
        }
    }
} 
```
- typeDefs변수에 정의한 스키마에 대응되게, 어떤 쿼리에는 어떻게 처리할지를 지정해주면 된다.

> 나는 이정도로 대충 뭐가 뭔지, 어떤게 어떤건지만 알아도 NestJS + GraphQL 조합에서 사용하는데 문제가 없었다.!!

# 왜 GraphQL? REST API만으론 안되나?
GraphQL과 REST API를 비교하며 요청도 해보고, GraphQL 코드도 간단하게 알아 보았으니, 가장 중요한 **왜? why?**에 대해서 알아보자아

- GraphQL을 왜 사용하는지 구글링 바로 나오는 두가지가 있다.

1. REST API의 오버 패칭
  - 당장 필요한 데이터 외에 필요 없는 데이터들 까지 받아오는 것
2. REST API의 언더 패칭
  - 필요한 데이터를 요청하기 위해 서브데이터를 추가적으로 요청하는것 (즉, 원하는 데이터를 얻기 위해 여러번의 api 요청을 한뒤, 데이터를 가공하는 것을 의미한다.)


- 읽으면 이해는된다. 그러나 공감은 잘 되지 않았다. 왜냐면 오버패칭, 언더패칭은 굳이 GraphQL을 도입하지 않더라도, REST API를 다시 설계하여 만들면 해결가능하다고 느꼈기 때문이다. (필요한 데이터를 응답하는 API를 다시 만들거나, 여러개 만들면 해결 할 수 있다.)
- 단순히 위 두가지의 문제때문에 REST API대신 GraphQL을 사용한다라고 하기엔 하나의 문맥이 빠져있다고 느꼈다.
- 바로 **개발 생산성**이라는 문맥이다.

> 아래에는 제가 생각하는 'GraphQL을 사용하면서 얻을수 있는 이점'을 얘기할 건데, GraphQL을 도입하면서 소모되는 비용(배우는 시간, 도입하는데 겪는 문제 등)과 비교하며 도입하는 것이 꼭 필요한지 비교하며 읽으면 좋을듯 합니다.

## 개발 생산성 문맥에서의 GraphQL 도입

### 1. 팀원간 단순한 요청이 필요가 없다.

먼저 우리 팀이 프로젝트를 시작할 때 어떤 방식으로 프로젝트를 시작하는지, 어떤 문제가 발생하여 개발 생산성이 저하될 수 있는지 알아보자.

- 우리 팀이 프로젝트를 시작할 때의 흐름이다.
1. 프로젝트 시작
2. 기획팀 기획 완료
3. 서버 개발자 api 생성 및 개발 서버에 배포 및 api 명세 작성
4. 클라이언트 개발자는 서버개발자가 만든 api로 UI 개발

이때 문제가 발생한다.
- 기획팀이 어떤게 마음에 들지 않아, 기획을 변경하였다. 그래서 기획자는 클라이언트 개발자에게 ~이 변경되었다고 알려준다. 클라이언트 개발자는 변경내용을 확인한뒤, 서버 개발자에게 현재 프로젝트의 api에 A라는 필드가 추가되어야 한다고 알려준다. 서버 개발자는 클라이언트 개발자에게 요청을 받아 api를 수정한뒤, 다시 개발서버에 배포하고, api명세도 수정한다.

이제 GraphQL을 이용하면 어떤 점이 해소 될수 있는지 알아보자.

- 어떠한 프로젝트에 대해 서버개발을 완료하고 클라이언트 개발도 완료 했다. 그런데, 기획이 변경되어 수정을 해야한다. 그래서 기획팀은 클라이언트 개발자에게 변경된 기획을 알려준다. 클라이언트 개발자는 응답받는 데이터를 변경해야한다 느껴 GraphQL 요청 쿼리에 하나의 필드를 추가한다.

즉, 기획안이 변경 되었을 때, **클라이언트 개발자가 서버 개발자에게 요청하는 프로세스가 사라졌다.** 

api 수정해달라는 요청은 비교적 사소하고 단순한 문제라 생각한다. 만약 서버개발자가 트래픽이 몰려 서버가 터졌을 때 문제를 해결하고 있었더라면, 굉장히 골치아파하는 서버 개발자에게 'api에 필드 하나추가해주세요'의 요청은 서버 개발자의 집중력을 방해하는 큰 문제일 수도 있다.
클라이언트 개발자 또한, 불필요한 서버 개발자에게 불필요한 요청을 없앨 수 있기에 개발자들 모두의 생산성을 높일 수 있다고 생각한다.

> 이렇게 GraphQL을 도입하면 단순한 요청에 대한 프로세스를 없애, 개발자들의 개발 생산성을 높일 수있다.

### 2. api end point에 대한 고민을 줄여준다.
- REST API는 URI를 통해 리소스를 명시하고, HTTP Method로 리소스에 CRUD operation을 적용한다.

하나의 예로, 공업사의 전체 리뷰를 조회하는 api의 end point는 `GET /v1/repair/shop/:shopId/reviews` 이다.

그러나 GraphQL을 이용하면 url은 `/graphql`로 가져가고 요청 쿼리는
```graphql
query{
  reviewsOfShop(id: 1){
    id
    content
    regdttm
    rating
    ..
  }
}
```
이런식으로 가져갈 수 있다. 

단순하게 GraphQL을 이용하면  URL을 `/graphql` 하나로 끝낼수 있어서 URL의 고민을 줄여준다는게 아니다. 

공업사의 리뷰를 조회하기 위해 요청하는 식별자를
`/v1/repair/shop/:shopId/review` 에서 `reviewsOfShop`로 좀더 직관적으로 정할 수 있다는 것이다.

- 이렇게 GraphQL을 사용하면 응답받고 싶은 데이터를 식별하는 요청을 좀 더 **직관적**으로 정할 수 있다. 이는 클라이언트 개발자도, 서버 개발자도 한눈에 이 api가 뭘 의미하는지 알 수 있어 개발자간 불필요한 소통이 생기지 않아 개발 생산성에 도움을 준다 생각한다.
- 또한 GraphQL을 사용하여 api end point를 직관적으로 정하는 것은 서버 개발자로 하여금 URL은 명사로, Http Method는 행동으로 정해야하는 Rest API보다 고민하는 시간을 줄여줄 수 있다고 생각한다.

> GraphQL을 이용하면 api end point를 좀더 직관적으로 가져갈 수 있고, 정하는데 소모되는 비용을 줄여주기에, 개발 생산성을 높여줄 것이라 생각한다.

### 3. api 명세를 만드는데 걸리는 시간을 줄여준다.
- GraphQL을 이용하면 graphql-playground라는 developer tool을 제공해준다. (예제를 실행했을 때, localhost:3000/graphql 을 요청하면 응답하는 페이지가 그것이다.) 이 developer tool은 오른쪽에 docs, schema를 누르면 어떤 스키마들이 존재하는지, query root 타입에는 어떤 스키마들이 있고 어떻게 요청 할수 있는지, 파라미터엔 뭘 넣어 요청 해야하는지 알려준다.
<img width="1785" alt="스크린샷 2022-03-13 오후 5 57 12" src="https://user-images.githubusercontent.com/67785334/158052399-176969c4-983d-44af-99a5-fa14932d982d.png">

- 기존의 REST API를 이용하면, 서버개발자가 api를 다 만들었으면 이 api는 어떤 데이터를 응답하는지, 이 필드는 뭘 의미하는 지를 문서화 해야하는데, 이 과정의 수고로움을 줄여준다.(문서화할 필요가 없다는 건아니다. 어떤 에러가 발생하면 뭘 응답하는지 등은 graphql을 이용하더라도 문서화 해야한다 생각한다.)
- GraphQL을 이용하여 api를 만들어 배포하기만 해도, graphql은 자동으로 문서화가 되기에, 기존에 개발자가 직접 문서에 '이 필드는 뭘의미한다, 저 필드는 뭘의미한다...'같은 내용을 쓰는 것 보다 오류도 당연히 적을 것이다.

> GraphQL이 api 명세를 자동으로 만들어주는 것도 개발 생산성을 높여줄 것이라 생각한다.!


# 굳이 GraphQL을 도입해야할까?

### 1. 복잡한 요청 데이터
- 조회하는 api에 대해서, 응답받아야할 데이터가 100개가 된다면, GraphQL을 사용하면 클라이언트는 이 필드를 모두 지정해줘야한다.
```graphql
query{
  movies{
    id
    name
    actors
    dataA
    dataB
    dataC
    ...
    //굉장히 많은 데이터를 요청해야함
  }
}
```
- 이렇게 응답받고싶은 데이터가 많을 경우 GraphQL을 사용하면 요청보내는 데이터가 복잡하다.

> GraphQL을 이용하면 요청은 복잡한 반면 응답받는 데이터는 원하는 데이터만 받을 수 있기 때문에 효율적이다.

> GraphQL 쿼리를 요청하면, 단순히 조회에 대한 것도 내부적으로 Post요청이 실행되며, 요청 데이터가 http request message의 body에 담겨 요청이 간다. REST API를 이용했으면, 조회이기에 http request message body에 데이터가 담겨 요청이 갈 필요가 없을 텐데... REST API의 오버패칭의 문제를 해결하기 위해 요청을 보낼때 데이터를 http request body에 담아 요청하는 GraphQL은 REST API보다 성능 측면에서 무조건 낫다고 할 수 있을까? 🤔

# 어떤 서비스에 그래프큐엘을 적용하면 좋을까?
- GraphQL은 요청 데이터는 복잡하나 응답받는 데이터는 효율적이다.
- ResetAPI는 요청은 단순하나, 응답받는 데이터는 복잡하다.

GraphQL 과 RestAPI의 차이를 간단하게 이 정도로 정리 할 수 있겠다. 위 두가지 측면에서 GraphQL을 적용할 서비스를 정하면 좋을듯하다.

내가 생각한 GraphQL을 적용하면 좋을 서비스로는

### 1. 기획안이 자주 변경될 가능성이 높은 서비스
- 기획안이 자주 변경될 수록, 서버 개발자는 응답해야할 데이터가 변경될 가능성이 높기에, GraphQL을 적용하면 효율적으로 대응할 수 있다.
### 2. CUD보단 R의 서비스
- CUD는 조회하는 서비스에 비해 비교적, 응답하는 데이터가 많지도 않고, 중요성이 떨어지는 경우가 더 많다. 그렇기에 조회하는 서비스에 적용하면 GraphQL의 장점을 더 이용할 수 있다고 생각한다.
### 3. 너무 많지 않은 데이터를 응답하는 서비스
- 너무 많은 데이터를 응답해야하는 서비스는 그만큼 클라이언트에서 해당 데이터를 모두 적어서 Graph query를 요청해야한다. 이 경우는 그냥 Rest API를 이용하는 것이 더 효율적이라고 생각한다.
### 4. 이미 그래프큐엘을 이용하여 스키마를 정의한 서비스와 관련이 싶은 서비스 
- 이미 그래프큐엘을 적용하는 서비스와 관련이 깊은 서비스는 도메인을 그래프로 모델링 했을 때 관계가 깊을 가능성이 높다. 이 땐, 그래프 큐엘을 이용하면 그래프 자료구조내에 도메인을 추가하여 관계를 쉽게 추가할 수 있기 때문에 적용할 만하다고 생각한다.

# NestJs + GraphQL

이제 준비는 끝났다.. NestJS 프레임워크에 GraphQL을 살짝 얹어보자. 

NestJS 공식문서에 들어가서 GraphQL 탭을 누르면 어떻게 적용할지에 대한 설명이 상세히 나온다.

그러나 크게 두가지 방법이 있다고 소개한다. 

1. code first
2. schema first

> GraphQL을 이용하여 어떤 데이터를 요청할지, 어떤 데이터를 응답힐지 스키마로 정해야한다. 두 방법 모두 '스키마를 작성한다'는 목표는 같으나, 개발자 입장에서 어떤 접근법을 이용하여 스키마를 작성할지의 차이가 존재한다.

## 1. schema first
> schema first 접근법은 SDL(Schema Definition Language)을 이용하여 GraphQL 스키마들을 먼저 정의한다. 네스트 프레임워크는 작성한 SDL파일을 보고, 타입스크립트 코드를 발생시킨다. 네스트가 자동적으로 스키마에 매핑되는 타입스크립트 코드를 작성하므로, 개발자는 스키마 관련 코드를 작성할 필요가 없다. by nestjs document

SDL이란?
```graphql
# movie.graphql
type Movie {
  id: Int!
  title: String!
  rating: Int!
  description: String!
  actors: [Actor!]!
  category: Category!
}

```

이렇게 SDL을 작성하면 NestJS에선

```typescript
//interface로 generate 시킬수도, class로 generate 시킬수도있다.
export interface Movie {
    id: number;
    title: string;
    rating: number;
    description: string;
    actors: Actor[];
    category: Category;
}
```
이렇게 타입스크립트의 interface를 생성한다.


> 클론받은 프로젝트의 'nest-graphql-schema-first' 디렉토리에 schema first접근법으로 GraphQL을 적용한 예제를 작성하였다.

## 2. code first
> code first 접근법은 데코레이터와 타입스크립트의 클래스를 이용하여 schema를 정의한다. 그러면, 네스트 프레임워크는 작성한 타입스크립트 클래스를 보고, GraphQL schema를 발생시킨다. 언어 구문간의 컨텍스트 스위칭 비용이 없기에, 타입스크립트와 데코레이터형태로 코드를 작성하는 것에만 익숙하더라도, 스키마를 쉽게 작성할 수 있다. by nestjs document

- TypeScript(코드)를 이용하여 스키마를 자동 생성하는 방법
- TypeScript를 이용해 GraphQL의 스키마를 만들면 네스트 서버가 실행 될때(런타임에), 파일을 쫙 살피며 자동으로 GraphQL의 스키마를 만들어준다.

```typescript
//movie.type.ts 
@ObjectType()
export class Movie {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => Int)
  rating: number;

  @Field()
  description: string;

  @Field(() => [Actor])
  actors: Actor[];

  //카테고리 하나만 설정가능하다고 가정
  @Field(() => Category)
  category: Category;
}
```
이런 타입스크립트의 클래스를 보고 자동으로

```graphql
# ------------------------------------------------------
# THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
# ------------------------------------------------------

# schema.gql
type Movie {
  id: Int!
  title: String!
  rating: Int!
  description: String!
  actors: [Actor!]!
  category: Category!
}
```
GraphQL 타입(스키마)를 만들어준다.

(어떤 파일을 스키마로 인식할지 경로를 정할 수도 있고, 어디 경로에 자동으로 생성할 스키마 파일을 둘지도 정할 수 있다.)

> 클론받은 프로젝트의 'nest-graphql-code-first' 디렉토리에 code first접근법으로 GraphQL을 적용한 예제를 작성하였다.

## 뭘 선택해야하나?
바로 뭘 선택해야하는지 고민하기 전에, 둘의 차이에 따른 장 단점을 살펴보고, 우리 팀이 사용하기 더 좋은 접근법을 채택해야 한다고 생각한다.

그럼 각각의 장, 단점 부터 살펴보자아

### schema first 장점
- 어떠한 플랫폼에도 종속이 되지 않은 SDL을 먼저 작성하는 것이 장점이다.
  - 클라이언트 개발자와, 서버 개발자가 함께 SDL을 정의하고 그대로 코드에 붙여 사용하면 되기에 이러한 면에서 편할듯 하다.
  - 클라이언트 개발자와 서버 개발자가 공통의 SDL을 통해 소통하는 것이 용이할 것이다.
  - 다른 플랫폼이나 언어로 마이그레이션 할 때, SDL이 있으면 마이그레이션한 코드에서도 쉽게 적용할 수 있다.
- 한눈에 알아보기 쉽다.
  - SDL은 비교적 간단해서, 한눈에 알아보기 쉽다. code first의 스키마를 의미하는 데코레이터를 이용한 클래스로 어떤 스키마를 의미하는지 추론하는 것보다 당연히 쉽다고 생각한다.

### schema first 단점
- SDL을 알아야한다.
  - SDL을 먼저 작성해야하기에 당연히 공부를 해야한다. 그만큼 개발자에겐 비용이 들 것이다.(사실 크게 어렵진 않아서 큰 문젠 아닌거같다.)
- 타입스크립트로 리졸버를 작성할 때, GraphQL의 루트 타입에 맞춰서 작성해야하는데, 이때 개발자가 실수하기 쉽다.
  - code first접근법은 타입스크립트의 리졸버를 통해 루트 타입도 자동으로 generate 해주기에 code first에 비해선 확실히 귀찮고, 실수할 여지도 많다.

### code first 장점
- 타입스크립트로 GraphQL 스키마를 정의하기에, 익숙하고 쉽다.
  - TypeORM을 사용하여, DB 테이블에 매핑되는 타입스크립트의 클래스를 작성해온 나는 익숙하다고 느낌
  - 물론 SDL을 어느정도 알아야하긴하다.
- 타입스크립트로 만든 리졸버를 통해 루트 type(Query, Mutation)등이 만들어지기에, schema first에 비해선 개발자가 실수한 여지가 줄어든다.
- 코드 중복을 최소화할 수 있다.
  - schema first는 무조건 SDL과 매핑되는 코드가 generate되지만, code first는 코드부터 작성하기에, 코드 중복을 최소화할 수 있다. 이를테면, 엔티티 클래스에 GraphQL데코레이터를 붙여 object type으로 만들면, schema first를 이용할때와는 다르게 코드 중복이 일어나지 않을 것이다.

### code first 단점
- 특정 언어와 플랫폼에만 종속되기에, 다른 언어나 플랫폼에선 다른 방법으로 스키마를 정의해야한다.
  - 클라이언트 개발자가 먼저 SDL을 정의 했더라도, 플랫폼이 다르기에 스키마에 매핑되는 코드를 하나하나 작성해야 하는 단점이 있다.
  - 다른 플랫폼이나 언어로 마이그레이션 할때, 재사용 할수 없다.
- 한눈에 알아보기 어렵다.
  - 타입스크립트로된 코드를 보고, SDL을 생각해야하기에 귀찮다. (물론 SDL도 자동으로 generate되긴하지만 네스트가 실행할 때 생성이 되기에, 그 전에는 알수 없다.)

> code first는 특정 플랫폼에서 코드 개발할때 schema first보다 낫다고 생각하고, schema first는 코드 개발 외적인 소통의 수단으로써 code first보다 더 낫다고 생각한다.

> code first, schema first의 접근법의 차이를 보고 난 ORM을 사용할 때와, 사용하지 않고 직접 쿼리 하나하나 짜가며 개발하던 차이와 유사하다는 생각이 가장 먼저 들었다. 타입스크립트 코드로 만든 엔티티 클래스를 보고 DB 테이블을 자동으로 생성해주는 것과, DDL이 적힌 .sql파일을 통해 직접 테이블을 만들어주는 차이와 유사하달까? 🤣

<details>

<summary> <strong>schema first vs code first에 대한 나의 생각</strong> </summary>
- code first를 이용하되, code first 접근법으로 개발하기전에 SDL을 먼저 정의하는 것이다. 

- 개발전 사전에 클라이언트 개발자들과 함께 정의한 SDL을 통해 개발자들 끼리 소통을하고, 서버 개발을 할때 해당 SDL을 토대로 code first를 적용하면 schema first, code first의 둘 모두의 장점을 가져갈수 있다고 생각한다.
</details>


# 실제 카닥 서비스에 적용
- coming soon...
