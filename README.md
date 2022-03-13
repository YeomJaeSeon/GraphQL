# GraphQL
- Graph Query Language로 그래프 자료구조에 담긴 데이터에 질의하는 형식, 명세이다.
    - 어떠한 솔루션, 구현체가 아닌 명세, 형식 또는 스펙으로 특정 언어나 프레임워크의 런타임에 종속되지 않고, 어디서든 사용할 수 있다.
        - https://graphql-kr.github.io/code/ 가보면 특정언어에서 GraphQL을 어떻게 사용하는지 알 수 있다.
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
2. `cd graphql/nest-graphql`
3. `yarn`
4. mysql 서버 로컬에서 실행 후 `app.module.ts`의 typeorm 설정 본인에 맞게 수정
5. `yarn start:dev`
6. api 요청해보기
  - REST API를 이용한 요청: 포스트맨 Team workspace의 GraphQL example/REST API/영화 에서 요청
  - GraphQL을 이용한 요청: 포스트맨 Team workspace의 GraphQL example/GraphQL/영화 에서 요청 or localhost:3000/graphql 요청 후, graphql에서 제공하는 playground 에서 요청(docs, schema등을 제공해줌)

# 왜 GraphQL? REST API만으론 안되나?

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

#### 1. 팀원간 단순한 요청이 필요가 없다.

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

#### 2. api end point에 대한 고민을 줄여준다.
- REST API는 URI를 통해 리소스를 명시하고, HTTP Method로 리소스에 CRUD operation을 적용한다.

하나의 예로, 공업사의 전체 리뷰를 조회하는 api의 end point는 `GET /v1/repair/shop/:shopId/review` 이다. (갑자기 든생각인데, api end point가 ~/reviews이면 더 좋을 거 같다는 생각이 든다.)

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

#### 3. api 명세를 만드는데 걸리는 시간을 줄여준다.
- GraphQL을 이용하면 graphql-playground라는 developer tool을 제공해준다. (예제를 실행했을 때, localhost:3000/graphql 을 요청하면 응답하는 페이지가 그것이다.) 이 developer tool은 오른쪽에 docs, schema를 누르면 어떤 스키마들이 존재하는지, query root 타입에는 어떤 스키마들이 있고 어떻게 요청 할수 있는지, 파라미터엔 뭘 넣어 요청 해야하는지 알려준다.
<img width="1785" alt="스크린샷 2022-03-13 오후 5 57 12" src="https://user-images.githubusercontent.com/67785334/158052399-176969c4-983d-44af-99a5-fa14932d982d.png">

- 기존의 REST API를 이용하면, 서버개발자가 api를 다 만들었으면 이 api는 어떤 데이터를 응답하는지, 이 필드는 뭘 의미하는 지를 문서화 해야하는데, 이 과정의 수고로움을 줄여준다.(문서화할 필요가 없다는 건아니다. 어떤 에러가 발생하면 뭘 응답하는지 등은 graphql을 이용하더라도 문서화 해야한다 생각한다.)
- GraphQL을 이용하여 api를 만들어 배포하기만 해도, graphql은 자동으로 문서화가 되기에, 기존에 개발자가 직접 문서에 '이 필드는 뭘의미한다, 저 필드는 뭘의미한다...'같은 내용을 쓰는 것 보다 오류도 당연히 적을 것이다.

> GraphQL이 api 명세를 자동으로 만들어주는 것도 개발 생산성을 높여줄 것이라 생각한다.!


# Apollo (특히 Apollo Server)

# 예제
- GraphQL을 한 번도 사용해보지 않고 바로 NestJs + TypeORM 환경에서 GraphQL을 사용하면 어떤게 뭘 의미하는지 몰라서 난 어려웠다.
- 간단하게 Node환경에서 Apollo Server 라이브러리를 이용해서 GraphQL 사용해보자
- 그 다음, NestJS + TypeORM 환경에서 GraphQL을 적용해보자

## Node 환경에서 GraphQL With Apollo Server


## NestJs + TypeORM + GraphQL

# 우리 카닥에선? 어떻게 적용하면 좋을까?

# 실제 카닥 서비스에 적용
- coming soon...
