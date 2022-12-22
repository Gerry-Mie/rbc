## DOCUMENTATIONS :muscle:

## `Endpoints`

## MEMBER

### GET ALL MEMBERS
    GET api/member/list
### CREATE NEW MEMBER
    POST api/member/create

<details>
<summary>Response</summary>
<p>

```json
{
    "data": [
        {
            "id": 1,
            "firstname": "gerry mie",
            "lastname": "lumawag"
        }
    ]
}
```
</p>
</details>

<details>
<summary>Errors</summary>

- prisma errors

| status       | message      |
|--------------|--------------|
| 500          | server error |


</details>


  


