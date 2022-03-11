# GraphQL
- Graph Query Language로 그래프 자료구조에 담긴 데이터에 질의하는 형식, 명세이다.
    - 어떠한 솔루션, 구현체가 아닌 명세, 형식 또는 스펙으로 특정 언어나 프레임워크의 런타임에 종속되지 않고, 어디서든 사용할 수 있다.
        - https://graphql-kr.github.io/code/ 가보면 특정언어에서 GraphQL을 어떻게 사용하는지 알 수 있다.
- REST API와 같은 형식일 뿐이기에, GraphQL 형식대로 요청하고, 응답하기 위해선 솔루션(라이브러리)가 필요하다. GraphQL만으로 할수 있는건 없다.
    - Apollo, GraphQL.js, Relay.... 다양한 라이브러리들이 존재하고, 다양한 언어와 프레임워크에서 지원한다.

> SQL은 Structured Query Language로 구조화된 (표) 자료구조의 데이터에 질의하는 언어. 
> GraphQL은 Graph Query Language로 그래프 자료구조의 데이터에 질의하는 명세!

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

# 왜 GraphQL? REST API만으론 안되나?

Employee 에는 id, name, age, gender, totalWorkTime, role 데이터가 존재한다.

모든 직원의 id, name, age, gender, totalWorkTime, role데이터를 조회해 응답하는 기능을 만들었다.

#### REST API
`GET /rest/employees`

```json
[
    {
        "id": 1,
        "name": "염재선",
        "age": 20,
        "gender": "MALE",
        "totalWorkTime": 1023,
        "role": "CREW"
    },
    {
        "id": 2,
        "name": "김떙떙",
        "age": 21,
        "gender": "FEMALE",
        "totalWorkTime": 1023,
        "role": "LEAD"
    },
    {
        "id": 3,
        "name": "박안녕",
        "age": 22,
        "gender": "MALE",
        "totalWorkTime": 11023,
        "role": "CREW"
    }
]
```

그런데, 기획이 변경되어, name, role만

#### GraphQL

GraphQL은 하나의 api end point에서 원하는 데이터만 요청하여 응답받을 수 있다.

```graphql
query{
    employees{
        id
        name
        role
    }
}
```

```json
{
    "data": {
        "employees": [
            {
                "id": 1,
                "name": "염재선",
                "role": "crew"
            },
            {
                "id": 2,
                "name": "백인구",
                "role": "lead"
            },
            ...
        ]
    }
}
```





# 우리 카닥에서는 어떤 상황에서 GraphQL을 도입하면 유용하게 사용할 수 있을까?

### 오버 패칭 문제

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
